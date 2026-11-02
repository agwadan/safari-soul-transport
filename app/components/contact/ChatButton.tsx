"use client";

import { useState } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";

export default function ChatButton() {
  const [unavailable, setUnavailable] = useState(false);

  function openChat() {
    const api = (window as Window & { Tawk_API?: { maximize?: () => void } }).Tawk_API;
    if (typeof api?.maximize === "function") {
      api.maximize();
      setUnavailable(false);
    } else {
      setUnavailable(true);
    }
  }

  return (
    <div>
      <button type="button" onClick={openChat} className="flex w-full items-center justify-between gap-4 rounded-xl border border-neutral-200 bg-white p-5 text-left transition hover:border-[#b27c00] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b27c00]">
        <span className="flex items-center gap-3"><MessageCircle size={22} aria-hidden="true" /><span><span className="block font-semibold">Chat with our team</span><span className="mt-1 block text-sm text-neutral-600">Open live chat for a quick question</span></span></span>
        <ArrowUpRight size={20} aria-hidden="true" />
      </button>
      <p role="status" className="mt-2 text-sm text-neutral-600">{unavailable ? "Chat hasn’t loaded yet. Try again in a moment, or call or email us using the details on this page." : ""}</p>
    </div>
  );
}
