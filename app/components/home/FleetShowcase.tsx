import Image from "next/image";
import { fleet, formatKes } from "../data/fleet";
import Icon, { type IconName } from "../ui/Icons";

export default function FleetShowcase() {
  return (
    <section
      className="py-16 bg-background border-b border-border-hairline"
      id="fleet"
    >
      <div className="max-w-7xl mx-auto px-margin">
        {/* Section Header */}
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
              Complimentary high-speed Wi-Fi 
            </span>
          </div>
        </div>

        {/* Fleet Cards */}
        <div className="flex flex-wrap justify-center gap-6">
          {fleet.map((car) => {
            const bags = car.specs.find((spec) =>
              /bag|luggage/i.test(spec.text),
            );

            return (
              <div
                key={car.id}
                className={`relative w-full max-w-sm bg-white rounded-xl p-5 flex flex-col justify-between items-center transition-all hover:-translate-y-1 ${
                  car.isPopular
                    ? "border-2 border-[#e5a910] shadow-lg shadow-[#e5a910]/10"
                    : "border border-border-hairline custom-shadow-lvl1 hover:border-black hover:shadow-md"
                }`}
              >
                {car.isPopular && (
                  <div className="absolute -top-3 right-5 z-10 bg-[#e5a910] text-[#0a0a0a] font-label-sm text-label-sm font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      local_fire_department
                    </span>
                    MOST POPULAR
                  </div>
                )}
                {/* Vehicle Image */}
                <div className="h-48 w-full relative bg-surface-container-low">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>

                <div className="p-5 flex flex-col flex-1">
                  {/* Passenger and Luggage Capacity */}
                  <div className="flex items-center gap-5 mb-5 text-on-surface-variant font-label-md text-label-md">
                    {car.maxPassengers && (
                      <span className="flex items-center gap-2">
                        <Icon name="person" size={20} />
                        {car.maxPassengers} People
                      </span>
                    )}

                    {bags && (
                      <span className="flex items-center gap-2">
                        <Icon name="luggage" size={20} />
                        {bags.text}
                      </span>
                    )}
                  </div>

                  {/* Starting Price and Selection */}
                  <div className="mt-auto pt-4 border-t border-border-hairline flex items-center justify-between gap-3">
                    <div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant block">
                        Starting from
                      </span>
                      <span className="font-headline-md text-headline-md font-bold text-[#0a0a0a]">
                        {formatKes(car.priceKes)}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="px-4 py-2.5 bg-[#0a0a0a] hover:bg-[#222222] text-white font-label-md text-label-md font-semibold rounded-lg transition-colors"
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
