export default function QuoteLoading({ compact = false }: { compact?: boolean }) {
  return (
    <div role="status" aria-live="polite" className={compact ? "flex items-center gap-3 py-2" : "flex flex-col items-center justify-center gap-4 rounded-2xl bg-neutral-50 px-6 py-10 text-center"}>
      <span aria-hidden="true" className={"shrink-0 rounded-full border-[3px] border-neutral-200 border-t-[#d49b0e] motion-safe:animate-spin " + (compact ? "h-5 w-5" : "h-10 w-10")} />
      <div>
        <p className="font-body-sm text-body-sm font-semibold text-[#0a0a0a]">Calculating your distance…</p>
        {!compact && <p className="mt-1 font-label-sm text-label-sm text-neutral-500">Finding the driving distance and prices for your trip.</p>}
      </div>
    </div>
  );
}
