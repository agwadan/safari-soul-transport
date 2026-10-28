import Image from "next/image";
import { convertKesToUsd, fleet, formatKes, formatUsd } from "../data/fleet";
import Icon from "../ui/Icons";


export default function FleetShowcase({
  kesToUsd,
}: {
  kesToUsd: number | null;
}) {
  return (
    <section
      className="border-b border-border-hairline bg-background py-12 sm:py-16 lg:py-20"
      id="fleet"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-margin">
        {/* Section Header */}
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 md:flex-row md:items-end md:justify-between lg:mb-12">
          <div>
            <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#b27c00] sm:text-sm">
              Pristine Executive Vehicles
            </span>

            <h2 className="text-2xl font-bold leading-tight text-[#0a0a0a] sm:text-3xl lg:text-headline-lg">
              Curated Chauffeur Fleet
            </h2>
          </div>

          <div>
            <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-border-hairline bg-white px-3 py-2 text-xs font-medium text-on-surface-variant sm:text-sm">
              <Icon name="wifi" size={16} />
              Complimentary high-speed Wi-Fi
            </span>
          </div>
        </div>

        {/* Fleet Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {fleet.map((car) => {
            const bags = car.specs.find((spec) =>
              /bag|luggage/i.test(spec.text),
            );

            return (
              <div
                key={car.id}
                className={`relative flex min-w-0 flex-col overflow-visible rounded-xl bg-white transition-all duration-200 hover:-translate-y-1 ${
                  car.isPopular
                    ? "border-2 border-[#e5a910] shadow-md shadow-[#e5a910]/10"
                    : "border border-border-hairline custom-shadow-lvl1 hover:border-black hover:shadow-md"
                }`}
              >
                {/* Popular Badge */}
                {car.isPopular && (
                  <div className="absolute -top-3 right-3 z-10 inline-flex max-w-[calc(100%-1.5rem)] items-center gap-1 rounded-full bg-[#e5a910] px-3 py-1 text-[10px] font-bold tracking-wide text-[#0a0a0a] shadow-sm sm:right-4 sm:text-xs">
                    <Icon name="flame" size={14} />
                    MOST POPULAR
                  </div>
                )}

                {/* Vehicle Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-[10px] bg-surface-container-low">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    sizes="(max-width: 639px) calc(100vw - 34px), (max-width: 1023px) calc(50vw - 30px), (max-width: 1279px) calc(33.333vw - 24px), 400px"
                    className="object-cover transition-transform duration-300 hover:scale-[1.02]"
                  />
                </div>

                {/* Vehicle Details */}
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  {/* Vehicle Name */}
                  <h3 className="mb-3 text-lg font-semibold leading-snug text-[#0a0a0a] sm:text-xl">
                    {car.name}
                  </h3>

                  {/* Passenger and Luggage Capacity */}
                  <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-on-surface-variant sm:gap-x-5 sm:text-sm">
                    {car.maxPassengers && (
                      <span className="inline-flex items-center gap-1.5">
                        <Icon name="person" size={18} />
                        {car.maxPassengers} People
                      </span>
                    )}

                    {bags && (
                      <span className="inline-flex items-center gap-1.5">
                        <Icon name="luggage" size={18} />
                        {bags.text}
                      </span>
                    )}
                  </div>

                  {/* Price and Selection */}
                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-border-hairline pt-4">
                    <div className="min-w-0 flex-1">
                      <span className="mb-1 block text-xs text-on-surface-variant sm:text-sm">
                        Starting from
                      </span>

                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                        <span className="text-lg font-bold leading-tight text-[#0a0a0a] sm:text-xl">
                          {formatKes(car.priceKes)}
                        </span>

                        <span className="text-xs text-on-surface-variant sm:text-sm">
                          / {formatUsd(convertKesToUsd(car.priceKes, kesToUsd, car.priceUsd))}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="shrink-0 rounded-lg bg-[#0a0a0a] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#222222] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b27c00] sm:px-5"
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Currency Disclaimer */}
        <p className="mt-5 text-center text-xs leading-5 text-on-surface-variant sm:mt-6 sm:text-sm">
          USD amounts are approximate, converted from KES using{" "}
          <a
            href="https://www.exchangerate-api.com"
            className="underline underline-offset-2 hover:text-[#0a0a0a]"
            target="_blank"
            rel="noreferrer"
          >
            Exchange Rate API
          </a>
          .
        </p>
      </div>
    </section>
  );
}
