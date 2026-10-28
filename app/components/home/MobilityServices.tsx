import Link from "next/link";
import Icon from "../ui/Icons";

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
      id="services"
      className="border-b border-border-hairline bg-white py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-margin">
        {/* Section heading */}
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10 lg:mb-12">
          <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#b27c00] sm:text-sm">
            Comprehensive Executive Mobility
          </span>

          <h2 className="mb-3 text-2xl font-bold leading-tight text-[#0a0a0a] sm:text-3xl lg:text-headline-lg">
            Tailored Mobility Services
          </h2>

          <p className="text-sm leading-6 text-on-surface-variant sm:text-base sm:leading-7">
            Beyond airport connections: dedicated chauffeur solutions
            designed for executive schedules and discerning corporate
            itineraries.
          </p>
        </div>

        {/* Responsive service cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {services.map((svc) => (
            <div
              key={svc.title}
              className="group flex min-w-0 flex-col justify-between rounded-xl border border-border-hairline bg-white p-4 transition-colors duration-200 hover:border-[#b27c00] sm:p-5 lg:p-6"
            >
              <div>
                {/* Icon */}
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#f8f8fa] text-[#0a0a0a] sm:mb-4">
                  <Icon name={svc.icon} />
                </div>

                {/* Content */}
                <h3 className="mb-2 text-base font-semibold leading-snug text-[#0a0a0a] sm:text-lg">
                  {svc.title}
                </h3>

                <p className="mb-5 text-sm leading-6 text-on-surface-variant">
                  {svc.desc}
                </p>
              </div>

              {/* Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border-hairline pt-4">
                <span className="text-sm font-bold text-[#0a0a0a]">
                  {svc.price}
                </span>

                <Link
                  href="#"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[#b27c00] transition-colors hover:text-[#d49b0e] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b27c00]"
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
