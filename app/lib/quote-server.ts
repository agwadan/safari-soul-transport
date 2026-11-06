import { createHmac, timingSafeEqual } from "node:crypto";
import type { TripDetails } from "../components/data/booking";
import {
  calculateFares,
  PRICING_VERSION,
  type Quote,
  type RouteLeg,
} from "./pricing";

export class QuoteError extends Error {
  constructor(
    message: string,
    public status = 400,
    public code = "INVALID_TRIP",
  ) {
    super(message);
  }
}

function signingSecret() {
  const secret = process.env.QUOTE_SIGNING_SECRET;
  if (!secret || secret.length < 32)
    throw new QuoteError(
      "Online quotes are temporarily unavailable. Please contact us.",
      503,
      "NOT_CONFIGURED",
    );
  return secret;
}

export function parseTrip(value: unknown): TripDetails {
  if (!value || typeof value !== "object")
    throw new QuoteError("Please complete your trip details.");
  const input = value as Record<string, unknown>;
  const fields = [
    "pickup",
    "destination",
    "pickupPlaceId",
    "destinationPlaceId",
    "date",
    "time",
    "returnDate",
    "returnTime",
    "flight",
  ] as const;
  const trip = {} as TripDetails;
  for (const field of fields) {
    if (typeof input[field] !== "string" || input[field].length > 500)
      throw new QuoteError("Please complete your trip details.");
    trip[field] = input[field].trim();
  }
  if (input.tripType !== "one-way" && input.tripType !== "return")
    throw new QuoteError("Choose a trip type.");
  trip.tripType = input.tripType;
  for (const id of [trip.pickupPlaceId, trip.destinationPlaceId]) {
    if (!/^[A-Za-z0-9_-]{5,255}$/.test(id))
      throw new QuoteError("Select both locations from the suggestions.");
  }
  if (trip.pickupPlaceId === trip.destinationPlaceId)
    throw new QuoteError("Pickup and destination must be different.");
  const parseDateTime = (date: string, time: string) => {
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)
    )
      throw new QuoteError("Enter a valid pickup date and time.");
    const midnight = new Date(`${date}T00:00:00Z`);
    if (
      !Number.isFinite(midnight.getTime()) ||
      midnight.toISOString().slice(0, 10) !== date
    )
      throw new QuoteError("Enter a valid pickup date.");
    // Both service countries use East Africa Time (UTC+3).
    return Date.parse(`${date}T${time}:00+03:00`);
  };
  const departure = parseDateTime(trip.date, trip.time);
  if (departure <= Date.now())
    throw new QuoteError(
      "Choose a pickup time in the future (East Africa Time).",
    );
  if (
    trip.tripType === "return" &&
    parseDateTime(trip.returnDate, trip.returnTime) <= departure
  )
    throw new QuoteError("Return pickup must be after your outbound pickup.");
  return trip;
}

async function googleRequest(url: string, fieldMask: string, body?: object) {
  const key = process.env.GOOGLE_ROUTES_API_KEY;
  if (!key)
    throw new QuoteError(
      "Online route quotes are not configured yet. Please contact us for a quote.",
      503,
      "NOT_CONFIGURED",
    );
  try {
    const response = await fetch(url, {
      method: body ? "POST" : "GET",
      cache: "no-store",
      signal: AbortSignal.timeout(12000),
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": fieldMask,
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
    if (!response.ok) {
      const failure = await response.json().catch(() => null);
      const reason = failure?.error?.details?.find(
        (detail: { reason?: string }) => typeof detail.reason === "string",
      )?.reason;
      const message =
        typeof failure?.error?.message === "string"
          ? failure.error.message.split(key).join("[REDACTED]").slice(0, 1000)
          : "Google returned an unsuccessful response";
      // Stringify so Next's development log retains the diagnostic fields.
      console.error(
        "[quotes] Google lookup failed " +
          JSON.stringify({
            service: body ? "Routes" : "Places",
            status: response.status,
            googleStatus: failure?.error?.status,
            reason,
            message,
          }),
      );
      if (response.status === 401 || response.status === 403) {
        throw new QuoteError(
          "Online route quotes are temporarily unavailable. Please contact our team for a quote.",
          503,
          "GOOGLE_ACCESS_DENIED",
        );
      }
      throw new QuoteError(
        "We couldn’t calculate this route. Please try again or request a quote.",
        502,
        "ROUTE_UNAVAILABLE",
      );
    }
    return await response.json();
  } catch (error) {
    if (error instanceof QuoteError) throw error;
    throw new QuoteError(
      "Route lookup timed out or is unavailable. Please try again.",
      502,
      "ROUTE_UNAVAILABLE",
    );
  }
}

async function resolvePlace(placeId: string): Promise<string> {
  const place = await googleRequest(
    `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
    "formattedAddress,addressComponents",
  );
  const country = place.addressComponents?.find((part: { types?: string[] }) =>
    part.types?.includes("country"),
  )?.shortText;
  if (country !== "KE")
    throw new QuoteError(
      "Uganda and cross-border journeys need a tailored quote. Please contact our team.",
      422,
      "CUSTOM_QUOTE_REQUIRED",
    );
  if (typeof place.formattedAddress !== "string" || !place.formattedAddress)
    throw new QuoteError("Please choose a more specific location.");
  return place.formattedAddress;
}

async function routeLeg(
  origin: string,
  destination: string,
): Promise<RouteLeg> {
  const result = await googleRequest(
    "https://routes.googleapis.com/directions/v2:computeRoutes",
    "routes.distanceMeters,routes.duration",
    {
      origin: { placeId: origin },
      destination: { placeId: destination },
      travelMode: "DRIVE",
      routingPreference: "TRAFFIC_UNAWARE",
      computeAlternativeRoutes: false,
      units: "METRIC",
    },
  );
  const route = result.routes?.[0];
  if (
    !route ||
    !Number.isSafeInteger(route.distanceMeters) ||
    route.distanceMeters <= 0 ||
    !/^\d+(\.\d+)?s$/.test(route.duration)
  )
    throw new QuoteError(
      "No driving route was found. Please contact us for help.",
      422,
      "NO_ROUTE",
    );
  const durationSeconds = Number(route.duration.slice(0, -1));
  if (!Number.isFinite(durationSeconds) || durationSeconds <= 0)
    throw new QuoteError(
      "Route duration is unavailable.",
      502,
      "ROUTE_UNAVAILABLE",
    );
  return { distanceMeters: route.distanceMeters, durationSeconds };
}

export async function createQuote(trip: TripDetails): Promise<Quote> {
  signingSecret();
  const [pickup, destination] = await Promise.all([
    resolvePlace(trip.pickupPlaceId),
    resolvePlace(trip.destinationPlaceId),
  ]);
  const legs = await Promise.all([
    routeLeg(trip.pickupPlaceId, trip.destinationPlaceId),
    ...(trip.tripType === "return"
      ? [routeLeg(trip.destinationPlaceId, trip.pickupPlaceId)]
      : []),
  ]);
  return {
    version: PRICING_VERSION,
    expiresAt: Date.now() + 15 * 60_000,
    trip: { ...trip, pickup, destination },
    legs,
    fares: calculateFares(legs),
  };
}

export function signQuote(quote: Quote) {
  const payload = Buffer.from(JSON.stringify(quote)).toString("base64url");
  return `${payload}.${createHmac("sha256", signingSecret()).update(payload).digest("base64url")}`;
}

export function verifyQuote(token: unknown): Quote {
  if (typeof token !== "string" || token.length > 20000)
    throw new QuoteError("Please calculate a new quote.", 409, "INVALID_QUOTE");
  const parts = token.split(".");
  if (
    parts.length !== 2 ||
    !/^[A-Za-z0-9_-]+$/.test(parts[0]) ||
    !/^[A-Za-z0-9_-]+$/.test(parts[1])
  )
    throw new QuoteError("Please calculate a new quote.", 409, "INVALID_QUOTE");
  const expected = createHmac("sha256", signingSecret())
    .update(parts[0])
    .digest();
  const actual = Buffer.from(parts[1], "base64url");
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected))
    throw new QuoteError(
      "Your quote is invalid. Please calculate a new quote.",
      409,
      "INVALID_QUOTE",
    );
  let quote: Quote;
  try {
    quote = JSON.parse(Buffer.from(parts[0], "base64url").toString());
  } catch {
    throw new QuoteError("Please calculate a new quote.", 409, "INVALID_QUOTE");
  }
  if (
    quote.version !== PRICING_VERSION ||
    !Number.isFinite(quote.expiresAt) ||
    quote.expiresAt <= Date.now()
  )
    throw new QuoteError(
      "Your quote expired. Please refresh prices before booking.",
      409,
      "QUOTE_EXPIRED",
    );
  parseTrip(quote.trip);
  // Recompute from signed distances, never client-provided prices.
  const fares = calculateFares(quote.legs);
  if (JSON.stringify(fares) !== JSON.stringify(quote.fares))
    throw new QuoteError(
      "Prices have changed. Please refresh your quote.",
      409,
      "QUOTE_EXPIRED",
    );
  return quote;
}
