export function HowItWorks() {
  return (
    <div className="mt-24 rounded-3xl border border-neutral-200/80 bg-white p-8 sm:p-12 dark:border-neutral-800 dark:bg-neutral-900/60">
      <div className="text-center">
        <h3 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-white">
          How Career Forge Works In 3 Steps
        </h3>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          From raw resume to interview-ready in less than one minute.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="relative flex flex-col items-start rounded-2xl bg-neutral-50 p-6 dark:bg-neutral-950/60">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-sm font-bold text-white shadow-md shadow-orange-500/30">
            01
          </span>
          <h4 className="mt-4 text-base font-semibold text-neutral-900 dark:text-white">
            Upload or Paste Resume
          </h4>
          <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
            Support for PDF, DOCX, and text formats. Our parser extracts all your experience sections instantly.
          </p>
        </div>

        <div className="relative flex flex-col items-start rounded-2xl bg-neutral-50 p-6 dark:bg-neutral-950/60">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-900 text-sm font-bold text-white shadow-md dark:bg-white dark:text-neutral-900">
            02
          </span>
          <h4 className="mt-4 text-base font-semibold text-neutral-900 dark:text-white">
            Get Deep Line Diagnostics
          </h4>
          <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
            Receive actionable suggestions, metric improvements, and keyword adjustments tailored to your industry.
          </p>
        </div>

        <div className="relative flex flex-col items-start rounded-2xl bg-neutral-50 p-6 dark:bg-neutral-950/60">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-sm font-bold text-white shadow-md shadow-orange-500/30">
            03
          </span>
          <h4 className="mt-4 text-base font-semibold text-neutral-900 dark:text-white">
            Apply With Confidence
          </h4>
          <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
            Download your optimized ATS-friendly resume and apply to your dream companies with maximum callback rates.
          </p>
        </div>
      </div>
    </div>
  );
}
