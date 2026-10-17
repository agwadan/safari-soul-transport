import Link from "next/link";

export default function Footer() {
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
                <Link className="hover:text-[#e5a910] transition-colors" href="#">
                  Jomo Kenyatta Int&apos;l (JKIA - Nairobi)
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#e5a910] transition-colors" href="#">
                  Wilson Airport (WIL - Nairobi)
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#e5a910] transition-colors" href="#">
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
                <Link className="hover:text-[#e5a910] transition-colors" href="#">
                  Airport Transfers
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#e5a910] transition-colors" href="#">
                  City Transfers
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#e5a910] transition-colors" href="#">
                  Intercity Travel
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#e5a910] transition-colors" href="#">
                  Event Logistics
                </Link>
              </li>
            </ul>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Links Column 4: Support & Legal */}
          <div className="lg:col-span-3">
            <h4 className="font-label-lg text-label-lg font-bold text-white mb-4">
              Company &amp; Support
            </h4>
            <ul className="space-y-2.5 font-body-sm text-body-sm text-neutral-400">
              <li>
                <Link className="hover:text-[#e5a910] transition-colors" href="#">
                  Support &amp; FAQ
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#e5a910] transition-colors" href="#">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#e5a910] transition-colors" href="#">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#e5a910] transition-colors" href="#">
                  Safety Standards
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#e5a910] transition-colors" href="#">
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
