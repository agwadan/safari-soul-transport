"use client";

import { useCallback, useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import {
  Counts,
  DEFAULT_COUNTS,
  DEFAULT_TRIP,
  TripDetails,
} from "../data/booking";

const counters: {
  key: keyof Counts;
  label: string;
  hint: string;
  icon: string;
  min: number;
  max: number;
}[] = [
  { key: "passengers", label: "Passengers", hint: "Adults & children", icon: "group", min: 1, max: 20 },
  { key: "suitcases", label: "Checked suitcases", hint: "Large / standard", icon: "luggage", min: 0, max: 20 },
  { key: "handbags", label: "Cabin bags", hint: "Small bags & carry-ons", icon: "work", min: 0, max: 20 },
];

const field =
  "w-full h-14 bg-neutral-100 border border-transparent rounded-xl font-body-md text-body-md text-[#0a0a0a] placeholder:text-neutral-400 focus:bg-white focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#e5a910]/30 outline-none transition-all";
const label = "block font-label-sm text-label-sm font-semibold text-[#0a0a0a] mb-2";
const icon = "absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[20px]";

const todayLocal = () => {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

export default function BookingWidget() {
  const [step, setStep] = useState<1 | 2>(1);
  const [trip, setTrip] = useState<TripDetails>(DEFAULT_TRIP);
  const [counts, setCounts] = useState<Counts>(DEFAULT_COUNTS);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = useCallback(() => setModalOpen(false), []);

  const set = (k: keyof TripDetails) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setTrip((t) => ({ ...t, [k]: e.target.value }));

  const adjust = (key: keyof Counts, delta: number, min: number, max: number) =>
    setCounts((c) => ({ ...c, [key]: Math.min(max, Math.max(min, c[key] + delta)) }));

  function next(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found: Record<string, string> = {};
    (["pickup", "destination", "date", "time"] as const).forEach((k) => {
      if (!trip[k].trim()) found[k] = "Required";
    });
    if (trip.date && trip.date < todayLocal()) found.date = "Date is in the past";
    setErrors(found);
    if (Object.keys(found).length === 0) setStep(2);
  }

  const err = (k: string) =>
    errors[k] ? <p className="mt-1 text-xs text-[#ba1a1a]">{errors[k]}</p> : null;

  return (
    <div className="bg-white rounded-3xl custom-shadow-lvl3 p-6 sm:p-10">
      {/* Title */}
      <div className="flex items-center gap-3.5 pb-6 mb-6 border-b border-neutral-200">
        <div className="w-12 h-12 rounded-xl bg-[#0a0a0a] text-[#e5a910] flex items-center justify-center">
          <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            flight_land
          </span>
        </div>
        <h2 className="font-headline-sm text-headline-sm font-bold text-[#0a0a0a]">
          Airport Pickup Transfer
        </h2>
      </div>

      {/* Progress */}
      <div className="mb-8" aria-label={`Step ${step} of 2`}>
        <div className="flex items-center justify-between font-label-sm text-label-sm tracking-wide">
          <span className={`flex items-center gap-2 font-semibold ${step === 1 ? "text-[#0a0a0a]" : "text-neutral-400"}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 1 ? "bg-[#0a0a0a] text-white" : "bg-neutral-200 text-neutral-500"}`}>
              {step === 2 ? "✓" : "1"}
            </span>
            <span className="hidden sm:inline">Trip &amp; Flight Details</span>
            <span className="sm:hidden">Trip</span>
          </span>
          <span className="text-neutral-400">Step {step} of 2</span>
          <span className={`flex items-center gap-2 font-semibold ${step === 2 ? "text-[#0a0a0a]" : "text-neutral-400"}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 2 ? "bg-[#0a0a0a] text-white" : "bg-neutral-200 text-neutral-500"}`}>
              2
            </span>
            <span className="hidden sm:inline">Passengers &amp; Luggage</span>
            <span className="sm:hidden">Luggage</span>
          </span>
        </div>
        <div className="mt-3 h-1.5 rounded-full bg-neutral-200 overflow-hidden">
          <div
            className="h-full rounded-full bg-[#e5a910] transition-all duration-300"
            style={{ width: step === 1 ? "50%" : "100%" }}
          />
        </div>
      </div>

      {step === 1 ? (
        <form onSubmit={next} noValidate className="space-y-5">
          <div>
            <label htmlFor="pickup" className={label}>Pickup Airport / Terminal</label>
            <div className="relative">
              <span className={`${icon} text-neutral-500`}>local_airport</span>
              <input id="pickup" className={`${field} pl-12 pr-4`} value={trip.pickup} onChange={set("pickup")} />
            </div>
            {err("pickup")}
          </div>

          <div>
            <label htmlFor="destination" className={label}>Destination Address or Hotel</label>
            <div className="relative">
              <span className={`${icon} text-[#ba1a1a]`}>location_on</span>
              <input id="destination" className={`${field} pl-12 pr-4`} placeholder="Hotel or address" value={trip.destination} onChange={set("destination")} />
            </div>
            {err("destination")}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="date" className={label}>Pickup Date</label>
              <div className="relative">
                <span className={`${icon} text-neutral-500`}>calendar_today</span>
                <input id="date" type="date" className={`${field} pl-12 pr-4`} value={trip.date} onChange={set("date")} />
              </div>
              {err("date")}
            </div>
            <div>
              <label htmlFor="time" className={label}>Estimated Landing Time</label>
              <div className="relative">
                <span className={`${icon} text-neutral-500`}>schedule</span>
                <input id="time" type="time" className={`${field} pl-12 pr-4`} value={trip.time} onChange={set("time")} />
              </div>
              {err("time")}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="flight" className="font-label-sm text-label-sm font-semibold text-[#0a0a0a]">
                Flight Number <span className="font-normal text-neutral-400">(Optional)</span>
              </label>
              <span className="bg-[#FDF6E2] text-[#9a6f05] text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-[#f5de99]">
                Radar Tracked
              </span>
            </div>
            <div className="relative">
              <span className={`${icon} text-[#d49b0e]`}>flight</span>
              <input id="flight" className={`${field} pl-12 pr-4`} placeholder="e.g. KQ 101" value={trip.flight} onChange={set("flight")} />
            </div>
          </div>

          <button
            type="submit"
            className="group w-full h-14 bg-[#0a0a0a] hover:bg-[#1f1f1f] text-white rounded-xl font-headline-sm text-headline-sm flex items-center justify-center gap-3 transition-all active:scale-[0.99]"
          >
            Continue to Passengers &amp; Luggage
            <span className="material-symbols-outlined text-[20px] text-[#e5a910] transition-transform group-hover:translate-x-1">
              arrow_forward
            </span>
          </button>
        </form>
      ) : (
        <div className="space-y-2">
          {counters.map((c) => (
            <div key={c.key} className="flex items-center justify-between py-4 border-b border-neutral-200">
              <div className="flex items-center gap-3.5">
                <span className="material-symbols-outlined text-[22px] text-neutral-500">{c.icon}</span>
                <div>
                  <div className="font-body-md text-body-md font-semibold text-[#0a0a0a]">{c.label}</div>
                  <div className="font-label-sm text-label-sm text-neutral-500">{c.hint}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  aria-label={`Fewer ${c.label}`}
                  disabled={counts[c.key] <= c.min}
                  onClick={() => adjust(c.key, -1, c.min, c.max)}
                  className="w-11 h-11 rounded-full border border-neutral-300 text-xl hover:border-[#0a0a0a] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  −
                </button>
                <span className="w-6 text-center text-lg font-semibold tabular-nums">{counts[c.key]}</span>
                <button
                  type="button"
                  aria-label={`More ${c.label}`}
                  disabled={counts[c.key] >= c.max}
                  onClick={() => adjust(c.key, 1, c.min, c.max)}
                  className="w-11 h-11 rounded-full border border-neutral-300 text-xl hover:border-[#0a0a0a] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <div className="flex items-center gap-4 pt-6">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="h-14 px-2 text-neutral-500 hover:text-[#0a0a0a] underline underline-offset-4 transition-colors"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="group flex-1 h-14 bg-[#0a0a0a] hover:bg-[#1f1f1f] text-white rounded-xl font-headline-sm text-headline-sm flex items-center justify-center gap-3 transition-all active:scale-[0.99]"
            >
              Find Available Vehicles
              <span className="material-symbols-outlined text-[20px] text-[#e5a910] transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      )}

      {modalOpen && (
        <ConfirmationModal trip={trip} counts={counts} onClose={closeModal} />
      )}
    </div>
  );
}