"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Counts,
  TripDetails,
  formatDate,
  formatTime,
  plural,
} from "../data/booking";
import { convertKesToUsd, fleet, formatKes, formatUsd } from "../data/fleet";

type Props = {
  trip: TripDetails;
  counts: Counts;
  kesToUsd: number | null;
  onClose: () => void;
};

const input =
  "w-full h-12 bg-neutral-100 border border-transparent rounded-xl px-4 font-body-md text-body-md text-[#0a0a0a] placeholder:text-neutral-400 focus:bg-white focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#e5a910]/30 outline-none transition-all";

export default function ConfirmationModal({
  trip,
  counts,
  kesToUsd,
  onClose,
}: Props) {
  const [vehicleId, setVehicleId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const available = fleet.filter(
    (v) =>
      counts.passengers <= v.maxPassengers &&
      counts.suitcases <= v.maxSuitcases,
  );
  const selected = fleet.find((v) => v.id === vehicleId) ?? null;

  // Escape to close, lock page scroll, focus the dialog
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  function confirm() {
    const found: Record<string, string> = {};
    if (!selected) found.vehicle = "Please select a vehicle";
    if (!name.trim()) found.name = "Required";
    if (!email.trim()) found.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      found.email = "Enter a valid email address";
    if (!/^\+?[\d\s()-]{9,}$/.test(phone.trim()))
      found.phone = "Enter a valid phone number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      found.email = "Enter a valid email address";
    setErrors(found);
    if (Object.keys(found).length) return;
    // TODO: send { trip, counts, vehicle: selected.id, name, phone, email } to your backend
    setDone(true);
  }

  const rows: { icon: string; label: string; value: string }[] = [
    { icon: "local_airport", label: "Pickup", value: trip.pickup },
    { icon: "location_on", label: "Destination", value: trip.destination },
    {
      icon: "calendar_today",
      label: "Date & time",
      value: `${formatDate(trip.date)} · ${formatTime(trip.time)}`,
    },
    ...(trip.flight.trim()
      ? [{ icon: "flight", label: "Flight", value: trip.flight }]
      : []),
    {
      icon: "group",
      label: "Party",
      value: [
        plural(counts.passengers, "passenger"),
        plural(counts.suitcases, "suitcase"),
        `${counts.handbags} cabin ${counts.handbags === 1 ? "bag" : "bags"}`,
      ].join(" · "),
    },
  ];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-6"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        className="w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white rounded-t-3xl sm:rounded-3xl outline-none custom-shadow-lvl3"
      >
        {done ? (
          <div className="p-8 sm:p-12 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-[#FDF6E2] text-[#d49b0e] flex items-center justify-center mb-5">
              <span
                className="material-symbols-outlined text-[36px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            </div>
            <h2
              id="confirm-title"
              className="font-headline-md text-headline-md font-bold text-[#0a0a0a] mb-2"
            >
              Booking request received
            </h2>
            <p className="font-body-md text-body-md text-neutral-600 mb-6">
              {selected?.name} · {formatDate(trip.date)} at{" "}
              {formatTime(trip.time)}.
              <br />
              We&apos;ll confirm with you on {phone}.
            </p>
            <button
              onClick={onClose}
              className="h-12 px-8 bg-[#0a0a0a] text-white rounded-xl font-label-lg text-label-lg font-semibold hover:bg-[#1f1f1f] transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between bg-white px-6 sm:px-8 py-5 border-b border-neutral-200">
              <h2
                id="confirm-title"
                className="font-headline-sm text-headline-sm font-bold text-[#0a0a0a]"
              >
                Confirm your booking
              </h2>
              <button
                onClick={onClose}
                aria-label="Close"
                className="w-10 h-10 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="px-6 sm:px-8 py-6 space-y-8">
              {/* Trip summary */}
              <section aria-label="Trip details">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-label-lg text-label-lg font-bold text-[#0a0a0a]">
                    Your trip
                  </h3>
                  <button
                    onClick={onClose}
                    className="font-label-sm text-label-sm text-neutral-500 hover:text-[#0a0a0a] underline underline-offset-4"
                  >
                    Edit
                  </button>
                </div>
                <dl className="rounded-2xl bg-neutral-100 divide-y divide-neutral-200">
                  {rows.map((r) => (
                    <div
                      key={r.label}
                      className="flex items-start gap-3 px-4 py-3"
                    >
                      <span className="material-symbols-outlined text-[20px] text-neutral-500 mt-0.5">
                        {r.icon}
                      </span>
                      <div className="min-w-0">
                        <dt className="font-label-sm text-label-sm text-neutral-500">
                          {r.label}
                        </dt>
                        <dd className="font-body-md text-body-md font-medium text-[#0a0a0a] break-words">
                          {r.value}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </section>

              {/* Vehicle selection */}
              <section aria-label="Choose a vehicle">
                <h3 className="font-label-lg text-label-lg font-bold text-[#0a0a0a] mb-3">
                  Choose your vehicle
                </h3>
                {available.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-neutral-300 p-6 text-center">
                    <p className="font-body-md text-body-md text-[#0a0a0a] font-semibold mb-1">
                      Larger group or extra luggage?
                    </p>
                    <p className="font-body-sm text-body-sm text-neutral-600 mb-3">
                      Our standard vehicles don&apos;t fit this party. Contact
                      us for a custom minibus or multi-vehicle transfer.
                    </p>
                    <a
                      href="tel:+254792485814"
                      className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-[#0a0a0a] text-white font-label-md text-label-md font-semibold"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        call
                      </span>
                      +254 (0) 792 485 814
                    </a>
                  </div>
                ) : (
                  <div
                    role="radiogroup"
                    aria-label="Vehicles"
                    className="space-y-3"
                  >
                    {available.map((v) => {
                      const on = v.id === vehicleId;
                      return (
                        <button
                          key={v.id}
                          type="button"
                          role="radio"
                          aria-checked={on}
                          onClick={() => setVehicleId(v.id)}
                          className={`w-full text-left flex items-center gap-4 p-3 rounded-2xl border-2 transition-all ${on
                              ? "border-[#0a0a0a] bg-neutral-50"
                              : "border-neutral-200 hover:border-neutral-400"
                            }`}
                        >
                          <div className="relative w-24 h-20 sm:w-32 sm:h-24 shrink-0 rounded-xl overflow-hidden bg-neutral-100">
                            <Image
                              src={v.image}
                              alt={v.name}
                              fill
                              sizes="128px"
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-body-md text-body-md font-bold text-[#0a0a0a]">
                                {v.name}
                              </span>
                              {v.isPopular && (
                                <span className="bg-[#e5a910] text-[#0a0a0a] text-[10px] font-bold px-2 py-0.5 rounded-full">
                                  Most Popular
                                </span>
                              )}
                            </div>
                            <p className="font-body-sm text-body-sm text-neutral-500 truncate">
                              {v.model}
                            </p>
                            <p className="font-label-sm text-label-sm text-neutral-500 mt-1">
                              Up to {v.maxPassengers} passengers ·{" "}
                              {v.maxSuitcases} suitcases
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="font-body-md text-body-md font-bold text-[#0a0a0a]">
                              {formatKes(v.priceKes)}
                            </div>
                            <div className="font-label-sm text-label-sm text-neutral-400">
                              {formatUsd(
                                convertKesToUsd(v.priceKes, kesToUsd, v.priceUsd),
                              )}
                            </div>
                          </div>
                          <span
                            aria-hidden
                            className={`w-6 h-6 shrink-0 rounded-full border-2 flex items-center justify-center ${on
                                ? "border-[#0a0a0a] bg-[#0a0a0a]"
                                : "border-neutral-300"
                              }`}
                          >
                            {on && (
                              <span className="w-2 h-2 rounded-full bg-[#e5a910]" />
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
                {errors.vehicle && (
                  <p className="mt-2 text-xs text-[#ba1a1a]">
                    {errors.vehicle}
                  </p>
                )}
              </section>

              {/* Contact */}
              <section aria-label="Contact details">
                <h3 className="font-label-lg text-label-lg font-bold text-[#0a0a0a] mb-3">
                  Your contact details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="c-name"
                      className="block font-label-sm text-label-sm font-semibold mb-1.5"
                    >
                      Full name
                    </label>
                    <input
                      id="c-name"
                      className={input}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-[#ba1a1a]">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="c-phone"
                      className="block font-label-sm text-label-sm font-semibold mb-1.5"
                    >
                      Phone / WhatsApp
                    </label>
                    <input
                      id="c-phone"
                      type="tel"
                      className={input}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+254 7…"
                      autoComplete="tel"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-[#ba1a1a]">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="c-email"
                      className="block font-label-sm text-label-sm font-semibold mb-1.5"
                    >
                      Email address
                    </label>

                    <input
                      id="c-email"
                      type="email"
                      className={input}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                      aria-invalid={!!errors.email}
                      required
                    />

                    {errors.email && (
                      <p className="mt-1 text-xs text-[#ba1a1a]">
                        {errors.email}
                      </p>
                    )}
                  </div>

                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-neutral-200 px-6 sm:px-8 py-4 flex items-center gap-4">
              <div className="min-w-0">
                <div className="font-label-sm text-label-sm text-neutral-500">
                  Total (fixed, all-inclusive)
                </div>
                <div className="font-headline-sm text-headline-sm font-bold text-[#0a0a0a]">
                  {selected ? formatKes(selected.priceKes) : "—"}
                </div>
              </div>
              <button
                onClick={confirm}
                className="group ml-auto h-14 px-6 sm:px-10 bg-[#0a0a0a] hover:bg-[#1f1f1f] text-white rounded-xl font-headline-sm text-headline-sm flex items-center gap-3 transition-all active:scale-[0.99]"
              >
                Confirm booking
                <span className="material-symbols-outlined text-[20px] text-[#e5a910] transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
