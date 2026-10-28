import Link from "next/link";
import  Icon from "../ui/Icons";
export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white">
      <div className="w-full py-space-xl px-margin border-t border-neutral-900 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          {/* Brand Information Column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-[#0a0a0a]">
               <Icon name="flight_takeoff" size={20} />
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
          <div className="lg:col-span-2 text-body-sm">
            <h4 className="font-label-lg text-label-lg font-bold text-white mb-4">
              Airports Served
            </h4>
            <ul className="space-y-2.5 font-body-sm text-body-sm text-neutral-400">
              <li>
                <Link className="hover:text-[#e5a910] transition-colors" href="#">
                  <p>Jomo Kenyatta Int&apos;l (JKIA - Nairobi)</p>
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#e5a910] transition-colors" href="#">
                  <p>Wilson Airport (WIL - Nairobi)</p>
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#e5a910] transition-colors" href="#">
                  <p>Entebbe International (EBB - Uganda)</p>
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
                  <p>Airport Transfers</p>
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#e5a910] transition-colors" href="#">
                  <p>City Transfers</p>
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#e5a910] transition-colors" href="#">
                  <p>Intercity Travel</p>
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#e5a910] transition-colors" href="#">
                  <p>Event Logistics</p>
                </Link>
              </li>
            </ul>
          </div>

          {/* Spacer */}
          {/* <div className="hidden lg:block lg:col-span-1"></div> */}

          {/* Links Column 4: Support & Legal */}
          <div className="lg:col-span-3">
            <h4 className="font-label-lg text-label-lg font-bold text-white mb-4">
              Company &amp; Support
            </h4>
            <ul className="space-y-2.5 font-body-sm text-body-sm text-neutral-400">
              <li>
                <Link className="hover:text-[#e5a910] transition-colors" href="#">
                  <p>Support &amp; FAQ</p>
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#e5a910] transition-colors" href="terms-of-service">
                  <p>Terms of Service</p>
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#e5a910] transition-colors" href="privacy-policy">
                  <p>Privacy Policy</p>
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#e5a910] transition-colors" href="">
                  <p>Safety Standards</p>
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#e5a910] transition-colors" href="#">
                  <p>Careers &amp; Chauffeurs</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar & Copyright */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-4 font-body-sm text-body-sm text-neutral-400">
          <div>© 2026 Agara Ventures Ltd. All rights reserved.</div>
          <div className="flex items-center space-x-6 font-label-sm text-label-sm">
            <Link className="hover:text-white transition-colors" href="/terms-of-service">
              Terms of Service
            </Link>
            <span>•</span>
            <Link className="hover:text-white transition-colors" href="/privacy-policy">
              Privacy Policy
            </Link>
           {/*  <span>•</span>
            <Link className="hover:text-white transition-colors" href="#">
              Cookie Preferences
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
