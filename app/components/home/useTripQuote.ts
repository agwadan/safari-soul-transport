"use client";

import { useEffect, useState } from "react";
import type { TripDetails } from "../data/booking";
import type { QuoteResponse } from "../../lib/pricing";

export default function useTripQuote(trip: TripDetails, enabled: boolean) {
  const [quoteAttempt, setQuoteAttempt] = useState(0);
  const requestKey = JSON.stringify({ trip, enabled, quoteAttempt });
  const [previousKey, setPreviousKey] = useState(requestKey);
  const [result, setResult] = useState<{ quote: QuoteResponse | null; error: string } | null>(null);
  const [expired, setExpired] = useState(false);

  // Invalidate synchronously so a changed trip never renders an old fare.
  if (previousKey !== requestKey) {
    setPreviousKey(requestKey);
    setResult(null);
    setExpired(false);
  }

  useEffect(() => {
    if (!enabled) return;
    const controller = new AbortController();
    let active = true;
    async function loadQuote() {
      try {
        const response = await fetch("/api/quotes", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ trip }), signal: controller.signal,
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Could not calculate prices.");
        if (active) setResult({ quote: data, error: "" });
      } catch (error) {
        if (active) setResult({ quote: null, error: error instanceof Error ? error.message : "Could not calculate prices." });
      }
    }
    void loadQuote();
    return () => { active = false; controller.abort(); };
  }, [trip, quoteAttempt, enabled]);

  const quote = result?.quote ?? null;
  useEffect(() => {
    if (!quote) return;
    const timer = window.setTimeout(() => setExpired(true), Math.max(0, quote.expiresAt - Date.now()));
    return () => window.clearTimeout(timer);
  }, [quote]);

  return {
    quote, quoteLoading: enabled && result === null, quoteError: result?.error ?? "",
    expired, setExpired,
    refreshQuote: () => setQuoteAttempt((attempt) => attempt + 1),
  };
}
