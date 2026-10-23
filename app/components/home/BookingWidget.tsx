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
  {
    key: "passengers",
    label: "Passengers",
    hint: "Adults & children",
    icon: "group",
    min: 1,
    max: 20,
  },
  {
    key: "suitcases",
    label: "Checked suitcases",
    hint: "Large / standard",
    icon: "luggage",
    min: 0,
    max: 20,
  },
  {
    key: "handbags",
    label: "Cabin bags",
    hint: "Carry-ons & small bags",
    icon: "work",
    min: 0,
    max: 20,
  },
];

const steps = ["Trip Details", "Passengers & Luggage"];

const field =
  "w-full h-12 bg-neutral-100 border border-transparent rounded-xl font-body-md text-body-md text-[#0a0a0a] placeholder:text-neutral-400 focus:bg-white focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#e5a910]/30 outline-none transition-all";
const label =
  "block font-label-sm text-label-sm font-semibold text-[#0a0a0a] mb-1.5";
const icon =
  "absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-[20px]";

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

  const set =
    (k: keyof TripDetails) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setTrip((t) => ({ ...t, [k]: e.target.value }));

  const adjust = (key: keyof Counts, delta: number, min: number, max: number) =>
    setCounts((c) => ({
      ...c,
      [key]: Math.min(max, Math.max(min, c[key] + delta)),
    }));

  function next(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found: Record<string, string> = {};
    (["pickup", "destination", "date", "time"] as const).forEach((k) => {
      if (!trip[k].trim()) found[k] = "Required";
    });
    if (trip.date && trip.date < todayLocal())
      found.date = "Date is in the past";
    setErrors(found);
    if (Object.keys(found).length === 0) setStep(2);
  }

  const err = (k: string) =>
    errors[k] ? (
      <p className="mt-1 text-xs text-[#ba1a1a]">{errors[k]}</p>
    ) : null;

  return (
    <div className="bg-white rounded-3xl custom-shadow-lvl3 p-5 sm:p-6 lg:p-8">
      {/* Title + step indicator in one compact header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 shrink-0 rounded-xl bg-[#0a0a0a] text-[#e5a910] flex items-center justify-center">
            <span
              className="material-symbols-outlined text-[22px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              directions_car
            </span>
          </div>
          <h2 className="font-headline-sm text-headline-sm font-bold text-[#0a0a0a] truncate">
            Book Your Transfer
          </h2>
        </div>
        <span className="shrink-0 font-label-sm text-label-sm text-neutral-500">
          Step {step} of 2
        </span>
      </div>

      <ol
        className="grid grid-cols-2 gap-2 mb-5"
        aria-label={`Step ${step} of 2`}
      >
        {steps.map((name, i) => {
          const n = i + 1;
          const reached = step >= n;
          return (
            <li key={name}>
              <div
                className={`h-1.5 rounded-full transition-colors duration-300 ${reached ? "bg-[#e5a910]" : "bg-neutral-200"}`}
              />
              <span
                className={`mt-1.5 block font-label-sm text-label-sm ${step === n ? "font-semibold text-[#0a0a0a]" : "text-neutral-400"}`}
              >
                {n}. {name}
              </span>
            </li>
          );
        })}
      </ol>

      {step === 1 ? (
        <form onSubmit={next} noValidate className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="pickup" className={label}>
                Pickup Location
              </label>
              <div className="relative">
                <span className={`${icon} text-neutral-500`}>
                  my_location
                </span>
                <input
                  id="pickup"
                  className={`${field} pl-11 pr-3`}
                  placeholder="Airport, hotel, or address"
                  value={trip.pickup}
                  onChange={set("pickup")}
                />
              </div>
              {err("pickup")}
            </div>
            <div>
              <label htmlFor="destination" className={label}>
                Drop-off Location
              </label>
              <div className="relative">
                <span className={`${icon} text-[#ba1a1a]`}>location_on</span>
                <input
                  id="destination"
                  className={`${field} pl-11 pr-3`}
                  placeholder="Airport, hotel, or address"
                  value={trip.destination}
                  onChange={set("destination")}
                />
              </div>
              {err("destination")}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className={label}>
                Pickup Date
              </label>
              <div className="relative">
                <span className={`${icon} text-neutral-500`}>
                  calendar_today
                </span>
                <input
                  id="date"
                  type="date"
                  className={`${field} pl-11 pr-3`}
                  value={trip.date}
                  onChange={set("date")}
                />
              </div>
              {err("date")}
            </div>
            <div>
              <label htmlFor="time" className={label}>
                Pickup Time
              </label>
              <div className="relative">
                <span className={`${icon} text-neutral-500`}>schedule</span>
                <input
                  id="time"
                  type="time"
                  className={`${field} pl-11 pr-3`}
                  value={trip.time}
                  onChange={set("time")}
                />
              </div>
              {err("time")}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="flight"
                className="font-label-sm text-label-sm font-semibold text-[#0a0a0a]"
              >
                Flight Number{" "}
                <span className="font-normal text-neutral-400">(If applicable)</span>
              </label>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-[#9a6f05]">
                <span className="material-symbols-outlined text-[14px]">
                  radar
                </span>
                Delay-tracked
              </span>
            </div>
            <div className="relative">
              <span className={`${icon} text-[#d49b0e]`}>flight</span>
              <input
                id="flight"
                className={`${field} pl-11 pr-3`}
                placeholder="e.g. KQ 101"
                value={trip.flight}
                onChange={set("flight")}
              />
            </div>
          </div>

          <button
            type="submit"
            className="group w-full h-12 bg-[#0a0a0a] hover:bg-[#1f1f1f] text-white rounded-xl font-headline-sm text-headline-sm flex items-center justify-center gap-3 transition-all active:scale-[0.99]"
          >
            Continue to Passengers &amp; Luggage
            <span className="material-symbols-outlined text-[20px] text-[#e5a910] transition-transform group-hover:translate-x-1">
              arrow_forward
            </span>
          </button>
        </form>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {counters.map((c) => (
              <div
                key={c.key}
                className="flex md:flex-col items-center justify-between md:justify-center gap-3 md:gap-4 rounded-2xl border border-neutral-200 p-4 md:py-5"
              >
                <div className="flex md:flex-col items-center gap-3 md:gap-1 md:text-center">
                  <span className="material-symbols-outlined text-[22px] text-neutral-500">
                    {c.icon}
                  </span>
                  <div>
                    <div className="font-body-md text-body-md font-semibold text-[#0a0a0a]">
                      {c.label}
                    </div>
                    <div className="font-label-sm text-label-sm text-neutral-500">
                      {c.hint}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label={`Fewer ${c.label}`}
                    disabled={counts[c.key] <= c.min}
                    onClick={() => adjust(c.key, -1, c.min, c.max)}
                    className="w-10 h-10 rounded-full border border-neutral-300 text-xl hover:border-[#0a0a0a] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    −
                  </button>
                  <span
                    className="w-6 text-center text-lg font-semibold tabular-nums"
                    aria-live="polite"
                  >
                    {counts[c.key]}
                  </span>
                  <button
                    type="button"
                    aria-label={`More ${c.label}`}
                    disabled={counts[c.key] >= c.max}
                    onClick={() => adjust(c.key, 1, c.min, c.max)}
                    className="w-10 h-10 rounded-full border border-neutral-300 text-xl hover:border-[#0a0a0a] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 pt-5">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="h-12 px-2 text-neutral-500 hover:text-[#0a0a0a] underline underline-offset-4 transition-colors"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="group flex-1 h-12 bg-[#0a0a0a] hover:bg-[#1f1f1f] text-white rounded-xl font-headline-sm text-headline-sm flex items-center justify-center gap-3 transition-all active:scale-[0.99]"
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