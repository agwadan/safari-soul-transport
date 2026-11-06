const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
const root = path.resolve(__dirname, "..");

// Load the actual TypeScript handlers with Google and Resend mocked at their
// network boundaries. No API keys or real email sends are used by these tests.
function fixture({
  country = "KE",
  distance = 40001,
  reverseDistance = 45001,
  failGoogle = false,
  noRoute = false,
  emailError = false,
} = {}) {
  const calls = [],
    emails = [],
    cache = new Map();
  const env = {
    QUOTE_SIGNING_SECRET: "test-secret-".repeat(6),
    GOOGLE_ROUTES_API_KEY: "fake-google-key",
    RESEND_API_KEY: "fake-email-key",
  };
  async function fetch(url, options) {
    calls.push({ url, options });
    if (failGoogle)
      return Response.json({ error: "provider error" }, { status: 403 });
    if (url.includes("places.googleapis.com"))
      return Response.json({
        formattedAddress: url.endsWith("pickup123")
          ? "Pickup & Hotel"
          : "Destination",
        addressComponents: [{ types: ["country"], shortText: country }],
      });
    if (noRoute) return Response.json({ routes: [] });
    const body = JSON.parse(options.body);
    return Response.json({
      routes: [
        {
          distanceMeters:
            body.origin.placeId === "pickup123" ? distance : reverseDistance,
          duration: "3600s",
        },
      ],
    });
  }
  function load(file) {
    const filename = path.resolve(root, file);
    if (cache.has(filename)) return cache.get(filename);
    const exports = {};
    cache.set(filename, exports);
    const code = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
      },
    }).outputText;
    vm.runInNewContext(
      code,
      {
        exports,
        Buffer,
        Request,
        Response,
        URL,
        TextDecoder,
        AbortSignal,
        Date,
        Error,
        SyntaxError,
        fetch,
        process: { env },
        console: { log() {}, error() {} },
        require(name) {
          if (name.startsWith("."))
            return load(path.resolve(path.dirname(filename), name) + ".ts");
          if (name === "next/server") return { NextResponse: Response };
          if (name === "resend")
            return {
              Resend: class {
                emails = {
                  send: async (payload) => {
                    emails.push(payload);
                    return {
                      data: emailError ? null : { id: "test-id" },
                      error: emailError
                        ? {
                            name: "validation_error",
                            message: "mock rejection",
                          }
                        : null,
                    };
                  },
                };
              },
            };
          return require(name);
        },
      },
      { filename },
    );
    return exports;
  }
  return { load, env, calls, emails };
}
const trip = {
  tripType: "one-way",
  pickup: "Client address",
  destination: "Client destination",
  pickupPlaceId: "pickup123",
  destinationPlaceId: "destination123",
  date: "2099-11-03",
  time: "12:00",
  returnDate: "2099-11-04",
  returnTime: "12:00",
  flight: "",
};
const request = (body) =>
  new Request("https://example.com/api/quotes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

test("fare boundaries and all four vehicle rates use metres, not rounded display km", () => {
  const { calculateFares, extraBlocks } = fixture().load("app/lib/pricing.ts");
  for (const [meters, blocks] of [
    [1, 0],
    [39999, 0],
    [40000, 0],
    [40001, 1],
    [45000, 1],
    [45001, 2],
    [50000, 2],
    [55000, 3],
  ])
    assert.equal(extraBlocks(meters), blocks);
  for (const invalid of [0, -1, NaN, Infinity, 40.5])
    assert.throws(() => extraBlocks(invalid));
  assert.deepEqual(
    Array.from(
      calculateFares([{ distanceMeters: 45001, durationSeconds: 100 }]),
      (f) => f.totalKes,
    ),
    [4800, 12600, 9600, 21900],
  );
});
test("return fare has two independent base fares and two measured routes", async () => {
  const f = fixture();
  const server = f.load("app/lib/quote-server.ts");
  const quote = await server.createQuote(
    server.parseTrip({ ...trip, tripType: "return" }),
  );
  assert.equal(quote.legs.length, 2);
  assert.deepEqual(Array.from(quote.fares[0].extraBlocks), [1, 2]);
  assert.equal(quote.fares[0].totalKes, 8950);
  assert.equal(f.calls.length, 4);
  assert.equal(
    JSON.parse(f.calls[3].options.body).origin.placeId,
    "destination123",
  );
  assert.equal(quote.trip.pickup, "Pickup & Hotel");
});
test("quotes reject tampering, missing token, expiry and pricing-version changes", async () => {
  const f = fixture();
  const s = f.load("app/lib/quote-server.ts");
  const q = await s.createQuote(s.parseTrip(trip));
  const token = s.signQuote(q);
  assert.equal(s.verifyQuote(token).fares[0].totalKes, 4150);
  assert.throws(() => s.verifyQuote(undefined));
  assert.throws(() => s.verifyQuote(token.slice(0, -8) + "aaaaaaaa"));
  assert.throws(
    () => s.verifyQuote(s.signQuote({ ...q, expiresAt: Date.now() - 1 })),
    /expired/,
  );
  assert.throws(
    () => s.verifyQuote(s.signQuote({ ...q, version: 999 })),
    /expired/,
  );
  q.fares[0].totalKes = 1;
  assert.throws(() => s.verifyQuote(s.signQuote(q)), /changed/);
});
test("non-Kenya locations need a custom quote and never reach Routes API", async () => {
  const f = fixture({ country: "UG" });
  const response = await f
    .load("app/api/quotes/route.ts")
    .POST(request({ trip }));
  assert.equal(response.status, 422);
  assert.equal((await response.json()).code, "CUSTOM_QUOTE_REQUIRED");
  assert.ok(f.calls.every((c) => c.url.includes("places.googleapis.com")));
});
test("invalid trip, same location, invalid dates and missing configuration fail safely", async () => {
  const f = fixture();
  const s = f.load("app/lib/quote-server.ts");
  for (const data of [
    null,
    {},
    { ...trip, pickupPlaceId: "" },
    { ...trip, destinationPlaceId: trip.pickupPlaceId },
    { ...trip, date: "2099-02-30" },
    { ...trip, date: "2020-01-01" },
    { ...trip, tripType: "return", returnDate: "2099-11-02" },
  ])
    assert.throws(() => s.parseTrip(data));
  delete f.env.GOOGLE_ROUTES_API_KEY;
  const response = await f
    .load("app/api/quotes/route.ts")
    .POST(request({ trip }));
  assert.equal(response.status, 503);
  assert.equal(f.calls.length, 0);
});
test("Google errors and missing routes never fall back to a flat fare", async () => {
  for (const [options, status] of [
    [{ failGoogle: true }, 503],
    [{ noRoute: true }, 422],
  ]) {
    const response = await fixture(options)
      .load("app/api/quotes/route.ts")
      .POST(request({ trip }));
    assert.equal(response.status, status);
  }
});
test("quote endpoint returns a valid signed token, no secret and no cache", async () => {
  const f = fixture();
  const response = await f
    .load("app/api/quotes/route.ts")
    .POST(request({ trip }));
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store");
  const body = await response.json();
  assert.equal(
    f.load("app/lib/quote-server.ts").verifyQuote(body.token).fares[0].totalKes,
    4150,
  );
  assert.ok(!JSON.stringify(body).includes(f.env.GOOGLE_ROUTES_API_KEY));
});
test("booking ignores forged browser prices and addresses, emails the signed fare", async () => {
  const f = fixture();
  const s = f.load("app/lib/quote-server.ts");
  const q = await s.createQuote(s.parseTrip(trip));
  const token = s.signQuote(q);
  const payload = {
    quoteToken: token,
    vehicleId: "mazda-3",
    vehicle: { priceKes: 1 },
    trip: { pickup: "Forged route" },
    counts: { passengers: 2, suitcases: 1, handbags: 1 },
    name: "<Test>",
    phone: "+254792485814",
    email: "test@example.com",
    paymentMethod: "cash",
  };
  const post = f.load("app/api/bookings/route.ts").POST;
  assert.equal((await post(request(payload))).status, 200);
  assert.equal(f.emails.length, 2);
  for (const email of f.emails) {
    assert.match(email.html, /4,150/);
    assert.ok(!email.html.includes("Forged route"));
    assert.ok(!email.html.includes("<Test>"));
    assert.match(email.html, /40\.001 km/);
  }
  assert.equal(
    (await post(request({ ...payload, quoteToken: token + "x" }))).status,
    409,
  );
  assert.equal(
    (await post(request({ ...payload, vehicleId: "invented-car" }))).status,
    400,
  );
  assert.equal(
    (
      await post(
        request({
          ...payload,
          counts: { passengers: 99, suitcases: 1, handbags: 1 },
        }),
      )
    ).status,
    400,
  );
  assert.equal(f.emails.length, 2);
});
test("booking provider rejection still reports failure", async () => {
  const f = fixture({ emailError: true }),
    s = f.load("app/lib/quote-server.ts");
  const quote = await s.createQuote(s.parseTrip(trip));
  const response = await f
    .load("app/api/bookings/route.ts")
    .POST(
      request({
        quoteToken: s.signQuote(quote),
        vehicleId: "mazda-3",
        counts: { passengers: 1, suitcases: 0, handbags: 0 },
        name: "Test",
        phone: "+254792485814",
        email: "test@example.com",
        paymentMethod: "cash",
      }),
    );
  assert.equal(response.status, 502);
});

test("missing private server key never falls back to the public browser key", async () => {
  const f = fixture();
  delete f.env.GOOGLE_ROUTES_API_KEY;
  f.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY = "existing-browser-key";
  const response = await f
    .load("app/api/quotes/route.ts")
    .POST(request({ trip }));
  assert.equal(response.status, 503);
  assert.equal((await response.json()).code, "NOT_CONFIGURED");
  assert.equal(f.calls.length, 0);
});

test("server lookups use only the private key", async () => {
  const f = fixture();
  f.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY = "browser-key";
  await f.load("app/api/quotes/route.ts").POST(request({ trip }));
  assert.ok(f.calls.length > 0);
  assert.ok(
    f.calls.every(
      (call) => call.options.headers["X-Goog-Api-Key"] === "fake-google-key",
    ),
  );
});
