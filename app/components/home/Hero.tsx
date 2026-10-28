import BookingWidget from "./BookingWidget";
import Icon from "../ui/Icons";

const points = [
  "Zero surge pricing",
  "Flight radar telemetry",
  "60-min grace period",
];

export default function Hero({ kesToUsd }: { kesToUsd: number | null }) {
  return (
    // Spacing steps down on short laptop screens (under 900px tall) and opens up on tall monitors
    <section
      className="relative bg-[#0a0a0a] py-8 sm:py-10 lg:py-12 lg:[@media(min-height:900px)]:py-20 overflow-hidden"
      id="hero"
    >
      {/* Soft amber glow, no photo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full bg-[#e5a910]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[520px] h-72 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 lg:items-center">
          {/* Booking widget: first on mobile, right column on desktop */}
          <div className="order-2 lg:col-span-7">
            <BookingWidget kesToUsd={kesToUsd} />
          </div>

          {/* Copy: below the widget on mobile, left column on desktop */}
          <div className="order-1 lg:col-span-5">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 mb-5 lg:mb-6">
              <span className="w-2 h-2 rounded-full bg-[#e5a910] animate-pulse" />
              <span className="font-label-sm text-label-sm text-white font-bold tracking-wide">
                AIRPORT TRANSFERS
              </span>
            </span>

            <h1 className="font-display-hero text-4xl sm:text-5xl xl:text-display-hero font-bold text-white tracking-tight mb-4 lg:mb-5">
              Your ride.
              <br />
              <span className="text-[#e5a910]">Right on time.</span>
            </h1>

            <p className="font-body-lg text-body-lg text-gray-300 mb-5 lg:mb-6 max-w-md leading-relaxed">
              Executive airport transfers across JKIA Nairobi and Entebbe. Zero
              surge pricing, real-time flight tracking, and verified private
              chauffeurs.
            </p>

            <ul className="flex flex-wrap gap-x-6 gap-y-2.5 lg:pb-6 lg:border-b lg:border-white/15">
              {points.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-2 font-label-md text-label-md text-white"
                >
                  <Icon name="check_circle" size={20} className="text-[#e5a910]" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
