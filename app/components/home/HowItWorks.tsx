const steps = [
  {
    num: "01",
    title: "Enter trip details & flight info",
    desc: "Input code or address. Timing is calculated automatically based on airline landing radar and baggage customs clearance.",
  },
  {
    num: "02",
    title: "Choose vehicle & confirmed fixed fare",
    desc: "Select your preferred executive tier with transparent pricing. Tolls, taxes, and airport wait times are completely included.",
  },
  {
    num: "03",
    title: "Meet chauffeur curbside or arrivals",
    desc: "Your suited chauffeur welcomes you with an illuminated digital nameboard at arrival gates and assists with all luggage.",
  },
];

export default function HowItWorks() {
  return (
    <section
      className="py-16 bg-background border-b border-border-hairline"
      id="how-it-works"
    >
      <div className="max-w-7xl mx-auto px-margin">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="font-label-sm text-label-sm font-bold tracking-wider text-[#b27c00] uppercase mb-2 block">
            Streamlined Experience
          </span>
          <h2 className="font-headline-lg text-headline-lg font-bold text-[#0a0a0a] mb-3">
            Booked in Under 60 Seconds
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            We handle the logistics, flight adjustments, and terminal parking
            while you concentrate on your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 border-t-2 border-dashed border-border-hairline -z-0"></div>

          {steps.map((step) => (
            <div
              key={step.num}
              className="relative z-10 flex flex-col items-center text-center p-6 bg-white rounded-xl border border-border-hairline custom-shadow-lvl1"
            >
              <div className="w-14 h-14 rounded-full bg-[#e5a910] text-[#0a0a0a] flex items-center justify-center font-display-hero text-headline-sm font-bold mb-5 shadow">
                {step.num}
              </div>
              <h3 className="font-title-md text-title-md font-bold text-[#0a0a0a] mb-2">
                {step.title}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
