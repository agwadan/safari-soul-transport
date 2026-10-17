const standards = [
  {
    icon: "radar",
    title: "Guaranteed Punctuality",
    desc: "Live flight radar telemetry tracks arrival runway time. Drivers adjust automatically with zero surcharge.",
    badge: "Precision dispatch",
  },
  {
    icon: "receipt_long",
    title: "All-Inclusive Fixed Fares",
    desc: "Covers toll roads, congestion fees, airport parking, and 60 minutes of terminal wait time with no hidden surcharges.",
    badge: "Transparent billing",
  },
  {
    icon: "person_check",
    title: "Vetted Executive Chauffeurs",
    desc: "Fully licensed, suited chauffeurs with pristine executive sedans and MPVs. Full curbside nameboard meet & greet.",
    badge: "White-glove service",
  },
  {
    icon: "event_repeat",
    title: "Flexible 24h Cancellation",
    desc: "Plans change effortlessly. Cancel free of charge up to 24 hours prior to scheduled pickup directly in app.",
    badge: "Instant refunds",
  },
];

export default function SafariSoulStandard() {
  return (
    <section className="py-16 bg-white border-b border-border-hairline">
      <div className="max-w-7xl mx-auto px-margin">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="font-label-sm text-label-sm font-bold tracking-wider text-[#b27c00] uppercase mb-2 block">
              Executive Transport Benchmark
            </span>
            <h2 className="font-headline-lg text-headline-lg font-bold text-[#0a0a0a]">
              The SafariSoul Standard
            </h2>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md mt-3 md:mt-0">
            Engineered for frictionless corporate journeys and international
            arrivals where timing is absolute.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {standards.map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-xl bg-surface border border-border-hairline custom-shadow-lvl1 flex flex-col justify-between hover:border-black transition-all group"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-white border border-border-hairline flex items-center justify-center text-[#0a0a0a] group-hover:bg-[#111111] group-hover:text-white transition-colors mb-5 shadow-sm">
                  <span className="material-symbols-outlined text-[24px]">
                    {item.icon}
                  </span>
                </div>
                <h3 className="font-title-md text-title-md font-semibold text-[#0a0a0a] mb-2">
                  {item.title}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {item.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border-hairline flex items-center gap-1 text-[#0a0a0a] font-label-md text-label-md font-semibold group-hover:text-[#d49b0e] transition-colors cursor-pointer">
                <span>{item.badge}</span>
                <span className="material-symbols-outlined text-[16px]">
                  north_east
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
