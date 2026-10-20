import Image from "next/image";
import { fleet, formatKes } from "../data/fleet";

export default function FleetShowcase() {
  return (
    <section
      className="py-16 bg-background border-b border-border-hairline"
      id="fleet"
    >
      <div className="max-w-7xl mx-auto px-margin">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="font-label-sm text-label-sm font-bold tracking-wider text-[#b27c00] uppercase mb-2 block">
              Pristine Executive Vehicles
            </span>
            <h2 className="font-headline-lg text-headline-lg font-bold text-[#0a0a0a]">
              Curated Chauffeur Fleet
            </h2>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0 font-label-md text-label-md">
            <span className="px-3 py-1 rounded-full bg-white border border-border-hairline text-on-surface-variant font-medium">
              All vehicles under 3 years old
            </span>
            <span className="px-3 py-1 rounded-full bg-white border border-border-hairline text-on-surface-variant font-medium">
              Complimentary high-speed Wi-Fi &amp; Evian
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {fleet.map((car) => (
            <div
              key={car.id}
              className={`bg-white rounded-xl ${
                car.isRecommended
                  ? "border-2 border-[#0a0a0a] custom-shadow-lvl2 relative transform hover:-translate-y-1"
                  : "border border-border-hairline custom-shadow-lvl1 hover:border-black hover:shadow-md"
              } p-5 flex flex-col justify-between transition-all`}
            >
              {car.isRecommended && (
                <div className="absolute -top-3.5 right-6 bg-[#e5a910] text-[#0a0a0a] font-label-sm text-label-sm font-bold px-3 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    thumb_up
                  </span>
                  RECOMMENDED
                </div>
              )}

              <div>
                <div className="h-44 w-full rounded-lg bg-surface-container-low mb-4 relative overflow-hidden flex items-center justify-center">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover"
                  />
                  <span
                    className={`absolute top-3 left-3 ${
                      car.isRecommended
                        ? "bg-[#0a0a0a] text-white"
                        : "bg-white/90 backdrop-blur-sm text-[#0a0a0a] border border-border-hairline"
                    } font-label-sm text-label-sm font-semibold px-2.5 py-1 rounded-md`}
                  >
                    {car.tier}
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-[#0a0a0a]">
                  {car.name}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 mb-4">
                  {car.model}
                </p>
                <div className="flex items-center gap-3 text-on-surface-variant font-label-md text-label-md mb-6">
                  {car.specs.map((spec) => (
                    <span
                      key={spec.text}
                      className="flex items-center gap-1 bg-surface-container-low px-2 py-1 rounded"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {spec.icon}
                      </span>
                      {spec.text}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border-hairline flex items-center justify-between">
                <div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant block">
                    From
                  </span>
                  <span className="font-headline-md text-headline-md font-bold text-[#0a0a0a]">
                    {formatKes(car.priceKes)}
                  </span>
                  <span className="font-label-sm text-label-sm text-neutral-400 block">
                    (${car.priceUsd})
                  </span>
                </div>
                <button
                  className={`px-4 py-2 ${
                    car.isRecommended
                      ? "bg-[#0a0a0a] hover:bg-[#222222] text-white shadow-sm px-5 py-2.5"
                      : "bg-surface-container-low hover:bg-[#0a0a0a] hover:text-white text-[#0a0a0a] border border-border-hairline"
                  } font-label-md text-label-md font-semibold rounded-lg transition-colors`}
                >
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}