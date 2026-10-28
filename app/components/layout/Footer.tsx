import Link from "next/link";
import  Icon from "../ui/Icons";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white">
      <div className="mx-auto w-full max-w-7xl border-t border-neutral-900 px-4 py-12 sm:px-6 sm:py-14 lg:px-margin lg:py-16">
        {/* Footer Main Content */}
        <div className="mb-10 grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 sm:gap-y-12 lg:mb-12 lg:grid-cols-12 lg:gap-8">

          {/* Brand Information */}
          <div className="col-span-2 lg:col-span-4">
            <Link href="/" className="mb-4 inline-flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#0a0a0a]">
                <Icon name="flight_takeoff" size={20} />
              </div>

              <span className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                SafariSoul
              </span>
            </Link>

            <p className="mb-5 max-w-sm text-sm leading-6 text-neutral-400">
              Premium executive chauffeur and high-reliability airport
              transit service operating throughout major airports,
              financial hubs, and private aviation terminals.
            </p>

            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <Icon name="map-pin" size={15} />
              <span>Kenya &amp; Uganda</span>
            </div>
          </div>

          {/* Airports Served */}
          <div className="min-w-0 lg:col-span-2">
            <h4 className="mb-4 text-sm font-bold text-white">
              Airports Served
            </h4>

            <ul className="space-y-3 text-sm leading-5 text-neutral-400">
              <li>
                <Link href="#" className="transition-colors hover:text-[#e5a910]">
                  Jomo Kenyatta International
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-[#e5a910]">
                  Wilson Airport
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-[#e5a910]">
                  Entebbe International
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="min-w-0 lg:col-span-2">
            <h4 className="mb-4 text-sm font-bold text-white">
              Services
            </h4>

            <ul className="space-y-3 text-sm leading-5 text-neutral-400">
              <li>
                <Link href="#booking" className="transition-colors hover:text-[#e5a910]">
                  Airport Transfers
                </Link>
              </li>
              <li>
                <Link href="#services" className="transition-colors hover:text-[#e5a910]">
                  City Transfers
                </Link>
              </li>
              <li>
                <Link href="#services" className="transition-colors hover:text-[#e5a910]">
                  Intercity Travel
                </Link>
              </li>
              <li>
                <Link href="#services" className="transition-colors hover:text-[#e5a910]">
                  Event Logistics
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div className="col-span-2 min-w-0 sm:col-span-1 lg:col-span-4">
            <h4 className="mb-4 text-sm font-bold text-white">
              Company &amp; Support
            </h4>

            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm leading-5 text-neutral-400 sm:grid-cols-1">
              <li>
                <Link href="/support" className="transition-colors hover:text-[#e5a910]">
                  Support &amp; FAQ
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="transition-colors hover:text-[#e5a910]">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="transition-colors hover:text-[#e5a910]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/safety-standards" className="transition-colors hover:text-[#e5a910]">
                  Safety Standards
                </Link>
              </li>
              <li>
                <Link href="/careers" className="transition-colors hover:text-[#e5a910]">
                  Careers &amp; Chauffeurs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="flex flex-col gap-5 border-t border-neutral-800 pt-6 text-center sm:pt-8 md:flex-row md:items-center md:justify-between md:text-left">
          <p className="text-xs leading-5 text-neutral-500 sm:text-sm">
            © 2026 Agara Ventures Ltd. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-xs text-neutral-400 sm:gap-x-6 sm:text-sm md:justify-end">
            <Link
              href="/terms-of-service"
              className="transition-colors hover:text-white"
            >
              Terms of Service
            </Link>

            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
