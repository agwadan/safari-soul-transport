import Link from "next/link";

const services = [
  {
    icon: "location_city",
    title: "City Transfers",
    desc: "Nairobi CBD, Westlands, Upper Hill, & Entebbe-Kampala Expressway routes with upfront billing.",
    price: "From KES 3,000 / $25",
    cta: "Book City →",
  },
  {
    icon: "hourglass_top",
    title: "Hourly Chauffeur",
    desc: "Dedicated executive driver on standby for multi-stop diplomatic & corporate itineraries in Nairobi & Kampala.",
    price: "From KES 6,000/hr",
    cta: "Reserve →",
  },
  {
    icon: "alt_route",
    title: "Intercity & Regional",
    desc: "Nairobi to Naivasha/Mombasa, Kampala to Jinja, & safari transit in heavy-duty executive 4x4s.",
    price: "From KES 14,000",
    cta: "Explore →",
  },
  {
    icon: "business_center",
    title: "Corporate Accounts",
    desc: "Multi-country billing across Kenya & Uganda, automated M-Pesa & corporate card invoicing with SLA guarantee.",
    price: "Regional SLA",
    cta: "Open Account →",
  },
];

export default function MobilityServices() {
  return (
    <section
      className="py-16 bg-white border-b border-border-hairline"
      id="services"
    >
      <div className="max-w-7xl mx-auto px-margin">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="font-label-sm text-label-sm font-bold tracking-wider text-[#b27c00] uppercase mb-2 block">
            Comprehensive Executive Mobility
          </span>
          <h2 className="font-headline-lg text-headline-lg font-bold text-[#0a0a0a] mb-3">
            Tailored Mobility Services
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Beyond airport connections: dedicated chauffeur solutions designed
            for executive schedules and discerning corporate itineraries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc) => (
            <div
              key={svc.title}
              className="p-6 rounded-xl bg-surface border border-border-hairline hover:border-black transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-[#0a0a0a] mb-4">
                  <span className="material-symbols-outlined text-[22px]">
                    {svc.icon}
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm font-semibold text-[#0a0a0a] mb-1">
                  {svc.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
                  {svc.desc}
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border-hairline">
                <span className="font-label-md text-label-md font-bold text-[#0a0a0a]">
                  {svc.price}
                </span>
                <Link
                  className="text-[#b27c00] hover:text-[#d49b0e] font-label-sm text-label-sm font-semibold hover:underline"
                  href="#"
                >
                  {svc.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
