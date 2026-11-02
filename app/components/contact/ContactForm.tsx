"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const fieldClass = "mt-2 w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-base outline-none focus:border-[#b27c00] focus:ring-2 focus:ring-[#e5a910]/25";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const submitting = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(20000),
      });
      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error || "We couldn’t send your message. Please try again or email info@safarisoul.africa.");
      }
      form.reset();
      setStatus("success");
    } catch (cause) {
      setError(cause instanceof Error && cause.name !== "TimeoutError" && cause.name !== "TypeError" ? cause.message : "We couldn’t confirm delivery. Please call or email info@safarisoul.africa if your enquiry is urgent.");
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5" aria-busy={status === "sending"}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold">Your name <span className="text-neutral-500">(required)</span><input className={fieldClass} name="name" autoComplete="name" required maxLength={100} /></label>
        <label className="text-sm font-semibold">Email address <span className="text-neutral-500">(required)</span><input className={fieldClass} name="email" type="email" autoComplete="email" required maxLength={254} /></label>
      </div>
      <label className="block text-sm font-semibold">Booking reference <span className="font-normal text-neutral-500">(optional)</span><input className={fieldClass} name="bookingReference" maxLength={100} placeholder="If you already have a booking" /></label>
      <label className="block text-sm font-semibold">How can we help? <span className="text-neutral-500">(required)</span><textarea className={`${fieldClass} min-h-36 resize-y`} name="message" required minLength={10} maxLength={5000} rows={5} placeholder="Tell us about your enquiry or the change you need." /></label>
      <div className="hidden" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <p className="text-sm leading-6 text-neutral-600">We’ll use these details to respond to your enquiry. Read our <Link href="/privacy-policy" className="underline underline-offset-4 hover:text-black">privacy policy</Link>.</p>
      {status === "error" && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</p>}
      <div role="status" aria-live="polite">{status === "success" && <p className="flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-900"><CheckCircle2 className="shrink-0" size={20} aria-hidden="true" />Your message has been sent to our team. We’ll reply to the email address you provided.</p>}</div>
      <button type="submit" disabled={status === "sending"} className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#e5a910] px-6 py-3.5 font-bold text-[#0a0a0a] transition hover:bg-[#fabc37] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b27c00] disabled:cursor-wait disabled:opacity-60 sm:w-auto">{status === "sending" ? "Sending…" : "Send message"}<ArrowRight size={18} aria-hidden="true" /></button>
    </form>
  );
}
