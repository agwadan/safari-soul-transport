import Image from "next/image";
import BookingWidget from "./BookingWidget";

const features = [
  { icon: "price_check", text: "Zero Surge Pricing" },
  { icon: "radar", text: "Flight Delay Tracking" },
  { icon: "timer", text: "60-Min Terminal Grace" },
  { icon: "badge", text: "Curbside Meet & Greet" },
];

export default function Hero() {
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
              {features.map((feature) => (
                <div
                  key={feature.text}
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

          {/* Right Column */}
          <div className="lg:col-span-7">
            <BookingWidget />
          </div>
        </div>
      </div>
    </section>
  );
}
