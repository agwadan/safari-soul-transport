export default function BookingWidget() {
  const inputBase =
    "w-full h-12 bg-surface-container-low border border-border-hairline rounded-lg font-body-md text-body-md text-[#0a0a0a] focus:bg-white focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#e5a910]/30 transition-all font-medium";

  return (
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
                className={`${inputBase} pl-11 pr-4`}
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
                className={`${inputBase} pl-11 pr-4`}
                type="text"
                defaultValue="KQ 101 (London LHR → NBO)"
              />
            </div>
          </div>
        </div>

        {/* Row 2: Destination */}
        <div>
          <label className="block font-label-sm text-label-sm font-semibold text-[#0a0a0a] mb-1.5">
            Destination Address or Hotel
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3.5 material-symbols-outlined text-[#ba1a1a] text-[20px]">
              location_on
            </span>
            <input
              className={`${inputBase} pl-11 pr-10`}
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

        {/* Row 3: Date, Time, Party/Luggage */}
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
                className={`${inputBase} pl-11 pr-3 text-sm`}
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
                className={`${inputBase} pl-11 pr-3 text-sm`}
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

        {/* Submit */}
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

        {/* Trust line */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-3.5 border-t border-border-hairline text-on-surface-variant font-label-sm text-label-sm">
          {[
            "Fixed all-inclusive fare",
            "60-min terminal wait included",
            "Automated flight radar tracking",
          ].map((text) => (
            <span key={text} className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#d49b0e] text-[16px]">
                check_circle
              </span>
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
