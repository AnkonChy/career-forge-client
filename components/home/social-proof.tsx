const COMPANIES = [
  { name: "Google" },
  { name: "Microsoft" },
  { name: "Amazon" },
  { name: "Meta" },
  { name: "Stripe" },
  { name: "Airbnb" },
];

export function SocialProof() {
  return (
    <div className="mb-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
        Trusted by candidates hired at leading tech companies
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 opacity-70 grayscale transition-all hover:grayscale-0">
        {COMPANIES.map((company) => (
          <span
            key={company.name}
            className="text-base font-bold tracking-tight text-neutral-800 transition-colors hover:text-neutral-900 sm:text-lg dark:text-neutral-300 dark:hover:text-white"
          >
            {company.name}
          </span>
        ))}
      </div>
    </div>
  );
}
