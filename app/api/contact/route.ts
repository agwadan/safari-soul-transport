import { Resend } from "resend";

const MAX_BODY_BYTES = 24_000;
const EMAIL_PATTERN = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return Response.json({ error: "Please send your enquiry from our website." }, { status: 403 });
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ error: "Expected a JSON enquiry." }, { status: 415 });
  }

  let body: Record<string, unknown>;
  try {
    // Bound the actual stream as well as declared size before parsing user input.
    const reader = request.body?.getReader();
    if (!reader) throw new Error("Missing body");
    const decoder = new TextDecoder();
    let text = "";
    let size = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        return Response.json({ error: "Your message is too long." }, { status: 413 });
      }
      text += decoder.decode(value, { stream: true });
    }
    const parsed: unknown = JSON.parse(text + decoder.decode());
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid body");
    body = parsed as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Please check your enquiry and try again." }, { status: 400 });
  }

  // Honeypot: automated form fills do not generate email.
  if (body.website) return Response.json({ success: true });
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const bookingReference = typeof body.bookingReference === "string" ? body.bookingReference.trim() : "";
  if (!name || name.length > 100 || /[\r\n]/.test(name) || email.length > 254 || !EMAIL_PATTERN.test(email) || message.length < 10 || message.length > 5000 || bookingReference.length > 100 || /[\r\n]/.test(bookingReference)) {
    return Response.json({ error: "Enter your name, a valid email, and a message between 10 and 5,000 characters." }, { status: 400 });
  }
  if (!process.env.RESEND_API_KEY) {
    return Response.json({ error: "The contact form is temporarily unavailable. Please email info@safarisoul.africa or call us." }, { status: 503 });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "SafariSoul Enquiries <info@safarisoul.africa>",
      to: ["agwa.dan@gmail.com", "safarisoul91@gmail.com"],
      replyTo: email,
      subject: bookingReference ? "SafariSoul: existing booking enquiry" : "SafariSoul: new contact enquiry",
      text: `Name: ${name}\nEmail: ${email}\nBooking reference: ${bookingReference || "Not provided"}\n\n${message}`,
    });
    if (error) {
      // Keep provider diagnostics in server logs, not the public response.
      console.error("[contact] Resend rejected enquiry", {
        name: error.name,
        statusCode: error.statusCode,
        message: error.message,
      });
      return Response.json({ error: "We couldn’t send your message. Please try again or email info@safarisoul.africa." }, { status: 502 });
    }
    return Response.json({ success: true });
  } catch (error) {
    console.error("[contact] Email request failed", {
      name: error instanceof Error ? error.name : "UnknownError",
      message: error instanceof Error ? error.message : "Unexpected email failure",
    });
    return Response.json({ error: "We couldn’t confirm delivery. Please call or email info@safarisoul.africa." }, { status: 502 });
  }
}
