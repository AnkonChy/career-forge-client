const METRICS = [
  {
    value: "3.8x",
    label: "More Interview Calls",
    description: "Candidates get significantly more recruiter responses",
  },
  {
    value: "94.6%",
    label: "ATS Pass Rate",
    description: "Successfully bypasses major ATS screening software",
  },
  {
    value: "< 45s",
    label: "Full Scan Time",
    description: "Comprehensive line-by-line diagnostic in seconds",
  },
  {
    value: "150K+",
    label: "Resumes Forged",
    description: "Empowering developers & professionals worldwide",
  },
];

export function ImpactMetrics() {
  return (
    <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
      {METRICS.map((metric) => (
        <div
          key={metric.label}
          className="rounded-2xl border border-neutral-200/80 bg-white p-6 text-center shadow-sm dark:border-neutral-800 dark:bg-neutral-900/60"
        >
          <div className="text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
            {metric.value}
          </div>
          <div className="mt-1.5 text-xs font-semibold text-orange-600 dark:text-orange-400">
            {metric.label}
          </div>
          <div className="mt-1 text-[11px] text-neutral-500 dark:text-neutral-400">
            {metric.description}
          </div>
        </div>
      ))}
    </div>
  );
}
