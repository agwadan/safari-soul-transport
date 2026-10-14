import Image from "next/image";
import Link from "next/link";

function TopBar() {
  return (
    <div className="bg-[#0a0a0a] border-b border-[#222222] py-2 px-margin text-gray-300 font-body-sm text-body-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <span className="flex items-center gap-1.5 font-label-sm text-label-sm text-white">
            <span className="w-2 h-2 rounded-full bg-[#e5a910] animate-pulse"></span>
            24/7 Regional Dispatch Active
          </span>
          <span className="inline-flex items-center gap-1 hover:text-[#e5a910] transition-colors cursor-pointer text-gray-300">
            <span className="material-symbols-outlined text-[16px]">call</span>
            +254 (0) 792 485 814 / +256 (0) 705 530 039
          </span>
        </div>
        <div className="flex items-center">
          <Link
            className="hover:text-white transition-colors font-label-sm text-label-sm text-gray-400"
            href="#support"
          >
            Support & FAQ
          </Link>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="w-full sticky top-0 z-50 bg-white border-b border-border-hairline shadow-sm">
      <div className="w-full flex items-center justify-between px-margin max-w-7xl mx-auto h-20">
        <Link className="flex items-center gap-3 group" href="#">
          <div className="w-10 h-10 rounded-lg bg-[#0a0a0a] flex items-center justify-center text-white group-hover:bg-[#1a1a1a] transition-colors shadow-sm">
            <span
              className="material-symbols-outlined text-[#e5a910] text-2xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              flight_takeoff
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-display-hero text-headline-md font-bold tracking-tight text-[#0a0a0a]">
              SafariSoul
            </span>
            <span className="font-label-sm text-[10px] tracking-widest text-[#77767b] font-bold">
              EXECUTIVE MOBILITY
            </span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            className="text-[#0a0a0a] font-label-lg text-label-lg border-b-2 border-[#0a0a0a] pb-1 transition-all duration-150 ease-in-out cursor-pointer relative"
            href="#airport-transfers"
          >
            Airport Transfers
            <span className="absolute -bottom-[2px] left-0 right-0 h-[2px] bg-[#e5a910]"></span>
          </Link>
          <Link
            className="text-[#555558] font-label-lg text-label-lg transition-colors hover:text-[#0a0a0a] hover:border-b-2 hover:border-[#0a0a0a] pb-1 transition-all duration-150 ease-in-out cursor-pointer"
            href="#city-rides"
          >
            City Rides
          </Link>
          <Link
            className="text-[#555558] font-label-lg text-label-lg transition-colors hover:text-[#0a0a0a] hover:border-b-2 hover:border-[#0a0a0a] pb-1 transition-all duration-150 ease-in-out cursor-pointer"
            href="#fleet"
          >
            Fleet
          </Link>
          <Link
            className="text-[#555558] font-label-lg text-label-lg transition-colors hover:text-[#0a0a0a] hover:border-b-2 hover:border-[#0a0a0a] pb-1 transition-all duration-150 ease-in-out cursor-pointer"
            href="#how-it-works"
          >
            How It Works
          </Link>
          <Link
            className="text-[#555558] font-label-lg text-label-lg transition-colors hover:text-[#0a0a0a] hover:border-b-2 hover:border-[#0a0a0a] pb-1 transition-all duration-150 ease-in-out cursor-pointer"
            href="#corporate"
          >
            Corporate
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <button
            className="hidden lg:flex items-center justify-center w-10 h-10 rounded-lg border border-border-hairline text-[#555558] hover:text-[#0a0a0a] hover:bg-surface-cool-subtle transition-colors"
            title="24/7 Concierge Support"
          >
            <span className="material-symbols-outlined text-[20px]">
              support_agent
            </span>
          </button>
          <button className="hidden sm:inline-flex items-center text-[#0a0a0a] font-label-lg text-label-lg px-4 py-2 hover:bg-surface-cool-subtle rounded-lg transition-colors font-medium">
            My Bookings
          </button>
          <button className="bg-[#0a0a0a] text-white hover:bg-[#1f1f1f] font-label-lg text-label-lg px-5 py-2.5 rounded-lg font-semibold transition-all shadow-sm hover:shadow active:scale-[0.98]">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative bg-background py-12 lg:py-16 border-b border-border-hairline overflow-hidden">
      <div className="absolute inset-0 -z-0 overflow-hidden">
        <Image
          alt="Executive Chauffeur at Airport Terminal at Dusk"
          fill
          priority
          className="object-cover object-center transform scale-105 transition-transform duration-1000"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGV98hzi_P9sZm5JlOWpbVVC7FS36HkO6lQ2sqm0bjZDtXM2uE2x1pe6uADoNu-h2CiPFO13QWX8wpLyydxLgdY7sL-w0Zi6MdXAUBL5VrlgppnzqXyltGmqML2PQEAuC8eHKXY0X2zANymlyAxRvnuJqwFul02pPm_60sEu4mjE8tdWLINyIfS_tjWA6Q1GNg0V-tYUGoDvfMXKe9MZfg72GqFnBIl4YMJ66T5L0x-TA-321NKyXH"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07080a] via-[#0b0c10]/90 to-[#0b0c10]/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-[#07080a]/60"></div>
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#e5a910]/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-72 bg-[#d49b0e]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </div>
      <div className="max-w-7xl mx-auto px-margin relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col justify-center pt-2 lg:pt-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 w-fit mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#e5a910] animate-pulse"></span>
              <span className="font-label-sm text-label-sm text-white font-bold tracking-wide">
                EAST AFRICA EXECUTIVE AIRPORT TRANSFERS
              </span>
            </div>
            <h1 className="font-display-hero text-display-hero font-bold text-white tracking-tight mb-4 drop-shadow-sm">
              Your ride.
              <br />
              <span className="text-[#e5a910]">Right on time.</span>
            </h1>
            <p className="font-body-lg text-body-lg text-gray-300 mb-8 max-w-xl leading-relaxed">
              Premium executive airport transfers across JKIA Nairobi &amp;
              Entebbe International, VIP hotel connections, and seamless
              intercity travel with automated flight telemetry and zero surge
              pricing.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { icon: "price_check", text: "Zero Surge Pricing" },
                { icon: "radar", text: "Flight Delay Tracking" },
                { icon: "timer", text: "60-Min Terminal Grace" },
                { icon: "badge", text: "Curbside Meet & Greet" },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#111317]/80 backdrop-blur-md border border-white/10 custom-shadow-lvl1 hover:border-[#e5a910]/40 transition-colors"
                >
                  <span
                    className="material-symbols-outlined text-[#e5a910] text-[20px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {feature.icon}
                  </span>
                  <span className="font-label-md text-label-md font-semibold text-white">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 pt-4 border-t border-white/15">
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-[#e5a910]">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                  <span className="font-label-md text-label-md font-bold text-white ml-1">
                    4.9/5
                  </span>
                </div>
                <span className="font-body-sm text-body-sm text-gray-300">
                  Over 18,400+ executive &amp; flight travelers served
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Booking Widget */}
          <div className="lg:col-span-7">
            <div className="bg-white/95 backdrop-blur-md rounded-xl border border-white/40 custom-shadow-lvl3 p-6 sm:p-8 relative ring-1 ring-black/5">
              <div className="flex items-center justify-between pb-5 mb-6 border-b border-border-hairline">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#0a0a0a] text-[#e5a910] flex items-center justify-center shadow-sm">
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      flight_land
                    </span>
                  </div>
                  <div>
                    <h2 className="font-headline-sm text-headline-sm font-bold text-[#0a0a0a]">
                      Airport Pickup Transfer
                    </h2>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                      Private chauffeur meet &amp; greet at arrivals
                    </p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-low border border-border-hairline text-on-surface-variant font-label-sm text-label-sm shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#d49b0e] animate-pulse"></span>
                  <span className="hidden sm:inline font-medium text-[#0a0a0a]">
                    JKIA &amp; EBB Radar Active
                  </span>
                  <span className="sm:hidden font-medium text-[#0a0a0a]">
                    Radar Active
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {/* Row 1: Pickup Airport & Flight Number */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
                  <div className="md:col-span-7">
                    <label className="block font-label-sm text-label-sm font-semibold text-[#0a0a0a] mb-1.5">
                      Pickup Airport / Terminal
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 material-symbols-outlined text-[#77767b] text-[20px]">
                        local_airport
                      </span>
                      <input
                        className="w-full h-12 pl-11 pr-4 bg-surface-container-low border border-border-hairline rounded-lg font-body-md text-body-md text-[#0a0a0a] focus:bg-white focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#e5a910]/30 transition-all font-medium"
                        type="text"
                        defaultValue="Jomo Kenyatta Int'l Airport (JKIA) - Terminal 1A/1E"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-5">
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="font-label-sm text-label-sm font-semibold text-[#0a0a0a]">
                        Flight Number
                      </label>
                      <span className="bg-[#FDF6E2] text-[#9a6f05] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#f5de99]">
                        Radar Tracked
                      </span>
                    </div>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 material-symbols-outlined text-[#d49b0e] text-[20px]">
                        flight
                      </span>
                      <input
                        className="w-full h-12 pl-11 pr-4 bg-surface-container-low border border-border-hairline rounded-lg font-body-md text-body-md text-[#0a0a0a] focus:bg-white focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#e5a910]/30 transition-all font-medium"
                        type="text"
                        defaultValue="KQ 101 (London LHR → NBO)"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Destination Drop-off Address */}
                <div>
                  <label className="block font-label-sm text-label-sm font-semibold text-[#0a0a0a] mb-1.5">
                    Destination Address or Hotel
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 material-symbols-outlined text-[#ba1a1a] text-[20px]">
                      location_on
                    </span>
                    <input
                      className="w-full h-12 pl-11 pr-10 bg-surface-container-low border border-border-hairline rounded-lg font-body-md text-body-md text-[#0a0a0a] focus:bg-white focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#e5a910]/30 transition-all font-medium"
                      type="text"
                      defaultValue="Villa Rosa Kempinski, Chiromo Rd, Westlands, Nairobi"
                    />
                    <button
                      className="absolute right-3 text-[#77767b] hover:text-[#0a0a0a] transition-colors"
                      title="Recent destination presets"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        history
                      </span>
                    </button>
                  </div>
                </div>

                {/* Row 3: Pickup Date, Estimated Landing Time, Party/Luggage */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div>
                    <label className="block font-label-sm text-label-sm font-semibold text-[#0a0a0a] mb-1.5">
                      Pickup Date
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 material-symbols-outlined text-[#77767b] text-[20px]">
                        calendar_today
                      </span>
                      <input
                        className="w-full h-12 pl-11 pr-3 bg-surface-container-low border border-border-hairline rounded-lg font-body-md text-body-md text-[#0a0a0a] focus:bg-white focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#e5a910]/30 transition-all font-medium text-sm"
                        type="text"
                        defaultValue="Tomorrow, Fri Oct 24"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-label-sm text-label-sm font-semibold text-[#0a0a0a] mb-1.5">
                      Estimated Landing Time
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 material-symbols-outlined text-[#77767b] text-[20px]">
                        schedule
                      </span>
                      <input
                        className="w-full h-12 pl-11 pr-3 bg-surface-container-low border border-border-hairline rounded-lg font-body-md text-body-md text-[#0a0a0a] focus:bg-white focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#e5a910]/30 transition-all font-medium text-sm"
                        type="text"
                        defaultValue="14:30 EAT (Local)"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-label-sm text-label-sm font-semibold text-[#0a0a0a] mb-1.5">
                      Party &amp; Luggage
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 material-symbols-outlined text-[#77767b] text-[20px]">
                        group
                      </span>
                      <button
                        className="w-full h-12 pl-11 pr-3 bg-surface-container-low border border-border-hairline rounded-lg font-body-md text-body-md text-[#0a0a0a] text-left flex items-center justify-between font-medium hover:border-[#0a0a0a] transition-colors"
                        type="button"
                      >
                        <span className="truncate text-sm">2 Pax • 2 Bags</span>
                        <span className="material-symbols-outlined text-[18px] text-[#77767b]">
                          expand_more
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-2.5">
                  <button
                    className="w-full h-[52px] bg-[#0a0a0a] hover:bg-[#1f1f1f] text-white rounded-lg font-headline-sm text-headline-sm flex items-center justify-center gap-3 transition-all duration-150 shadow-md hover:shadow-lg active:scale-[0.99] group border border-[#0a0a0a]"
                    type="button"
                  >
                    <span>Find a Chauffeur — From KES 4,500 ($35)</span>
                    <span className="material-symbols-outlined text-[20px] text-[#e5a910] transition-transform group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </button>
                </div>

                {/* Trust and Reassurance Line */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-3.5 border-t border-border-hairline text-on-surface-variant font-label-sm text-label-sm">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#d49b0e] text-[16px]">
                      check_circle
                    </span>
                    Fixed all-inclusive fare
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#d49b0e] text-[16px]">
                      check_circle
                    </span>
                    60-min terminal wait included
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#d49b0e] text-[16px]">
                      check_circle
                    </span>
                    Automated flight radar tracking
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SafariSoulStandard() {
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
          {standards.map((item, i) => (
            <div
              key={i}
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

function FleetShowcase() {
  const fleet = [
    {
      tier: "Standard",
      name: "Executive Sedan",
      model: "Toyota Crown, Camry or equivalent",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC-hiYpUHQn35NllPMXtDGbEsVaLS7H5S05jdxloGT2_ggbgqZqlj7BbTownovJmLPevvu1Hb_o4dL96Vz7_gpCPd1JG00vyXUOiyfeK3zC8QAwfAbO--0WWAdmDhd9dydyS8Zo6hmxxiW6nrnAfq23QQJ1p9XAj3eDKJupuVIDQu-DkwKaVM6f03L0zyZleIRX_bzKi0LQSj-xYG6Etsa-stLmULpEP2Bk2DYLFPUShbDKHQjiYtU3",
      specs: [
        { icon: "person", text: "3 Pax" },
        { icon: "luggage", text: "2 Bags" },
        { icon: "wifi", text: "Free" },
      ],
      priceKes: "4,500",
      priceUsd: "35",
      isRecommended: false,
    },
    {
      tier: "Executive",
      name: "Executive Comfort",
      model: "Mercedes E-Class, Land Cruiser Prado",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAa8KsGXY7da23e2gL-1-VRfFwPnnygq-8LJ4GTaxkcxf1T78x5XMGYpHVfEUn1Pdohr5BR7D1-v-tKU0FU3MKK8X1AO0VJDwiK3ayiRaVQw0nE15TFwAyq8flw31kl7ORYWpPcs6dndsRJtEm1lyFhDfE4pT9EAXoNkkTrR9z1l6sJABr5HKDoQwmwLzFmRomznqY_BgzwFoscEx7wNuD_VjqVnkTYthDWz0K_2N88QdGoHtfFNyPB",
      specs: [
        { icon: "person", text: "3 Pax" },
        { icon: "luggage", text: "3 Bags" },
        { icon: "water_drop", text: "Bottled" },
      ],
      priceKes: "8,500",
      priceUsd: "65",
      isRecommended: true,
    },
    {
      tier: "First Class",
      name: "First Class Chauffeur",
      model: "Mercedes S-Class, Land Cruiser V8 / LC300",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCUgmOEnhfIqIGDoMNapjpWFnq_tQtfpdbWsbeQke0JK4ANk-UkZIcx5sqjZPTRVnmgIAJelUynFxGsvDgmeZuHB1lJGF362_bUI-IRO2xeUxj4lzzm4Efzxm17uozWiCttXpSBGjsaF_0SauI0eAoR5704_PZIKYCUxlb9bS6-a8-mISJRwx1HqP9IDdjkYJADPg4cb6jEJh8R2IKcG2v4ADCYbQiX-AyakHP40P8SNYb5E5U6Q-Ef",
      specs: [
        { icon: "person", text: "3 Pax" },
        { icon: "luggage", text: "3 Bags" },
        { icon: "airline_seat_recline_extra", text: "Nappa" },
      ],
      priceKes: "15,000",
      priceUsd: "115",
      isRecommended: false,
    },
    {
      tier: "VIP MPV & Van",
      name: "Executive MPV",
      model: "Toyota Alphard Lounge, Mercedes V-Class",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDZpFvcmbEQN3uxahP3j6Zn4FQrHVhPt9ClgGRtFowzZFthrR_5MXFZo0nJ02ecRrQYRhjdVw69SzOeSvCJIPxtVUV_7hkVmtajNpO8aGhxJOhrlhLqKSNlRpuhHVKcfBr3AdSGwtIkvtflz2uFuyk0W_JC4kTL3nT9yNYp7xyiwcWPblOukQes1ULawpVQv9I0jRQN60y-tAYDFbPgwgF6Olj_a51guSsjGDHwTaUZz4x9-z6GStf4",
      specs: [
        { icon: "group", text: "6-7 Pax" },
        { icon: "luggage", text: "6 Bags" },
        { icon: "meeting_room", text: "Tables" },
      ],
      priceKes: "12,000",
      priceUsd: "90",
      isRecommended: false,
    },
  ];

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
          {fleet.map((car, idx) => (
            <div
              key={idx}
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
                  {car.specs.map((spec, sIdx) => (
                    <span
                      key={sIdx}
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
                    KES {car.priceKes}
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

function MobilityServices() {
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
          {services.map((svc, i) => (
            <div
              key={i}
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

function HowItWorks() {
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

          {steps.map((st, idx) => (
            <div
              key={idx}
              className="relative z-10 flex flex-col items-center text-center p-6 bg-white rounded-xl border border-border-hairline custom-shadow-lvl1"
            >
              <div className="w-14 h-14 rounded-full bg-[#e5a910] text-[#0a0a0a] flex items-center justify-center font-display-hero text-headline-sm font-bold mb-5 shadow">
                {st.num}
              </div>
              <h3 className="font-title-md text-title-md font-bold text-[#0a0a0a] mb-2">
                {st.title}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {st.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustCredentials() {
  return (
    <section className="py-12 bg-white border-b border-border-hairline">
      <div className="max-w-7xl mx-auto px-margin">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-surface-container-low border border-border-hairline shadow-sm text-[#0a0a0a]">
              <span className="material-symbols-outlined text-[32px] text-[#d49b0e]">
                verified_user
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-headline-sm text-headline-sm font-bold text-[#0a0a0a]">
                  TrustScore 4.9 / 5
                </span>
                <div className="flex text-[#d49b0e]">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Verified by 18,400+ executive business passengers and airline
                crew members worldwide.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-8">
            <div className="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md">
              <span className="material-symbols-outlined text-[#0a0a0a] text-[20px]">
                lock
              </span>
              <span>256-bit SSL Encrypted Checkout</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md">
              <span className="material-symbols-outlined text-[#0a0a0a] text-[20px]">
                support_agent
              </span>
              <span>24/7 Dedicated Flight Dispatch</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md">
              <span className="material-symbols-outlined text-[#0a0a0a] text-[20px]">
                security
              </span>
              <span>TfL &amp; Local Authority Licensed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white">
      <div className="w-full py-space-xl px-margin border-t border-neutral-900 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          {/* Brand Information Column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-[#0a0a0a]">
                <span
                  className="material-symbols-outlined text-[#e5a910] text-2xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  flight_takeoff
                </span>
              </div>
              <span className="font-display-hero text-headline-md font-bold text-white">
                SafariSoul
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-neutral-400 max-w-sm mb-6 leading-relaxed">
              Premium executive chauffeur and high-reliability airport transit
              service operating throughout major airports, financial hubs, and
              private aviation terminals.
            </p>
          </div>

          {/* Links Column 1: Airports Served */}
          <div className="lg:col-span-2">
            <h4 className="font-label-lg text-label-lg font-bold text-white mb-4">
              Airports Served
            </h4>
            <ul className="space-y-2.5 font-body-sm text-body-sm text-neutral-400">
              <li>
                <Link
                  className="hover:text-[#e5a910] transition-colors"
                  href="#"
                >
                  Jomo Kenyatta Int&apos;l (JKIA - Nairobi)
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-[#e5a910] transition-colors"
                  href="#"
                >
                  Wilson Airport (WIL - Nairobi)
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-[#e5a910] transition-colors"
                  href="#"
                >
                  Entebbe International (EBB - Uganda)
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Services */}
          <div className="lg:col-span-2">
            <h4 className="font-label-lg text-label-lg font-bold text-white mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 font-body-sm text-body-sm text-neutral-400">
              <li>
                <Link
                  className="hover:text-[#e5a910] transition-colors"
                  href="#"
                >
                  Airport Transfers
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-[#e5a910] transition-colors"
                  href="#"
                >
                  City Transfers
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-[#e5a910] transition-colors"
                  href="#"
                >
                  Intercity Travel
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-[#e5a910] transition-colors"
                  href="#"
                >
                  Event Logistics
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 3: Spacer */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Links Column 4: Support & Legal */}
          <div className="lg:col-span-3">
            <h4 className="font-label-lg text-label-lg font-bold text-white mb-4">
              Company &amp; Support
            </h4>
            <ul className="space-y-2.5 font-body-sm text-body-sm text-neutral-400">
              <li>
                <Link
                  className="hover:text-[#e5a910] transition-colors"
                  href="#"
                >
                  Support &amp; FAQ
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-[#e5a910] transition-colors"
                  href="#"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-[#e5a910] transition-colors"
                  href="#"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-[#e5a910] transition-colors"
                  href="#"
                >
                  Safety Standards
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-[#e5a910] transition-colors"
                  href="#"
                >
                  Careers &amp; Chauffeurs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar & Copyright */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-4 font-body-sm text-body-sm text-neutral-400">
          <div>© 2026 Agara Ventures Ltd. All rights reserved.</div>
          <div className="flex items-center space-x-6 font-label-sm text-label-sm">
            <Link className="hover:text-white transition-colors" href="#">
              Terms of Service
            </Link>
            <span>•</span>
            <Link className="hover:text-white transition-colors" href="#">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link className="hover:text-white transition-colors" href="#">
              Cookie Preferences
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Page() {
  return (
    <>
      <TopBar />
      <Header />
      <main>
        <Hero />
        <SafariSoulStandard />
        <FleetShowcase />
        <MobilityServices />
        <HowItWorks />
        <TrustCredentials />
      </main>
      <Footer />
    </>
  );
}
