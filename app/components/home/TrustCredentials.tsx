const credentials = [
  { icon: "lock", text: "256-bit SSL Encrypted Checkout" },
  { icon: "support_agent", text: "24/7 Dedicated Flight Dispatch" },
  { icon: "security", text: "TfL & Local Authority Licensed" },
];

export default function TrustCredentials() {
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
            {credentials.map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md"
              >
                <span className="material-symbols-outlined text-[#0a0a0a] text-[20px]">
                  {item.icon}
                </span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
