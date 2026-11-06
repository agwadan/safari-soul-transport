import {
  createQuote,
  parseTrip,
  QuoteError,
  signQuote,
} from "../../lib/quote-server";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return Response.json(
      { error: "Please request a quote from our website." },
      { status: 403 },
    );
  try {
    if (!request.headers.get("content-type")?.includes("application/json"))
      throw new QuoteError("Expected JSON.", 415);
    const reader = request.body?.getReader();
    if (!reader) throw new QuoteError("Missing trip details.");
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > 12000) {
        await reader.cancel();
        throw new QuoteError("Trip details are too large.", 413);
      }
      chunks.push(value);
    }
    let body;
    try {
      body = JSON.parse(Buffer.concat(chunks).toString());
    } catch {
      throw new QuoteError("Invalid trip details.");
    }
    const quote = await createQuote(parseTrip(body?.trip));
    return Response.json(
      { ...quote, token: signQuote(quote) },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    if (error instanceof QuoteError)
      return Response.json(
        { error: error.message, code: error.code },
        { status: error.status },
      );
    console.error("[quotes] Unexpected quote failure");
    return Response.json(
      { error: "We couldn’t prepare a quote. Please contact our team." },
      { status: 500 },
    );
  }
}
