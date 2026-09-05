import {
  Sparkles,
  CheckCircle2,
  TrendingUp,
  FileCheck2,
  Zap,
  ShieldCheck,
  Target,
  BarChart3,
  Bot,
  Award,
} from "lucide-react";

const AUDIT_FACTORS = [
  { label: "Impact & Quantified Metrics", score: 98, status: "Exceptional" },
  { label: "Role Keyword Alignment", score: 92, status: "Strong Match" },
  { label: "ATS Layout & Parsing Hygiene", score: 96, status: "Clean" },
  { label: "Action Verbs & Executive Tone", score: 90, status: "Optimized" },
];

export function FeaturesBento() {
  return (
    <div>
      {/* Section Header */}
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-600 dark:text-orange-400">
          <Sparkles className="h-3.5 w-3.5" />
          AI Resume Intelligence Engine
        </div>

        <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl dark:text-white">
          Engineered to bypass ATS filters and win interviews.
        </h2>

        <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-neutral-400">
          Most resumes get rejected by automated applicant tracking systems before a human ever reads them.
          Career Forge simulates modern recruiter algorithms to optimize every single bullet point.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Card 1: Live ATS Simulation & Scoring Diagnostic */}
        <div className="group relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-md sm:p-8 lg:col-span-7 dark:border-neutral-800 dark:bg-neutral-900/90">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400">
                <BarChart3 className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  ATS Readiness Diagnostic
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Live multi-tier candidate scoring
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" /> High Pass Rate
            </span>
          </div>

          {/* Score metric visual */}
          <div className="mt-6 flex flex-col items-center justify-between gap-6 rounded-2xl border border-neutral-100 bg-neutral-50/80 p-5 sm:flex-row dark:border-neutral-800/80 dark:bg-neutral-950/60">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-2xl font-black text-white shadow-lg shadow-orange-500/20">
                94
              </div>
              <div>
                <div className="text-sm font-semibold text-neutral-900 dark:text-white">
                  Overall Resume Health
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  Top 4% of applicant cohort
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-600 dark:text-neutral-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Ready for submission to top tier jobs
            </div>
          </div>

          {/* Breakdown Progress Bars */}
          <div className="mt-6 space-y-3.5">
            {AUDIT_FACTORS.map((factor) => (
              <div key={factor.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-neutral-700 dark:text-neutral-300">
                    {factor.label}
                  </span>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    {factor.score}% ({factor.status})
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-500"
                    style={{ width: `${factor.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: AI Bullet Point Forger */}
        <div className="group relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-md sm:p-8 lg:col-span-5 dark:border-neutral-800 dark:bg-neutral-900/90">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400">
              <Bot className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                Smart Bullet Re-Writer
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Transform passive phrases to high-impact achievements
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="rounded-2xl border border-rose-200/60 bg-rose-50/50 p-3.5 dark:border-rose-950/40 dark:bg-rose-950/20">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                <span>❌ Before (Weak & Passive)</span>
              </div>
              <p className="mt-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                &ldquo;Responsible for managing website backend code and fixing bugs across client projects.&rdquo;
              </p>
            </div>

            <div className="relative rounded-2xl border border-emerald-300/80 bg-emerald-50/60 p-4 shadow-sm dark:border-emerald-800/60 dark:bg-emerald-950/25">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  <Sparkles className="h-3 w-3" /> Career Forge Optimized
                </span>
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                  +65% Impact
                </span>
              </div>
              <p className="mt-2 text-xs font-medium leading-relaxed text-neutral-900 dark:text-neutral-100">
                &ldquo;Architected resilient microservices in Go & PostgreSQL, reducing p99 API latency by 42% and scaling to 1.2M daily queries.&rdquo;
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between rounded-xl bg-neutral-100/80 p-3 text-xs text-neutral-600 dark:bg-neutral-800/60 dark:text-neutral-400">
            <span className="font-medium">Action verb strength:</span>
            <span className="font-bold text-orange-600 dark:text-orange-400">Quantified & Verified</span>
          </div>
        </div>

        {/* Card 3: Targeted Keyword Radar */}
        <div className="group rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-md sm:p-7 lg:col-span-4 dark:border-neutral-800 dark:bg-neutral-900/90">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400">
              <Target className="h-4.5 w-4.5" />
            </span>
            <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
              Skill Gap & Keyword Radar
            </h3>
          </div>
          <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
            Detects missing must-have keywords required by specific job descriptions.
          </p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
              <CheckCircle2 className="h-3 w-3" /> TypeScript
            </span>
            <span className="inline-flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
              <CheckCircle2 className="h-3 w-3" /> Next.js 15
            </span>
            <span className="inline-flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
              <CheckCircle2 className="h-3 w-3" /> REST APIs
            </span>
            <span className="inline-flex items-center gap-1 rounded-lg border border-orange-200 bg-orange-50 px-2.5 py-1 text-xs font-medium text-orange-700 dark:border-orange-900 dark:bg-orange-950/40 dark:text-orange-300">
              <Zap className="h-3 w-3" /> Kubernetes (Add)
            </span>
            <span className="inline-flex items-center gap-1 rounded-lg border border-neutral-200 bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
              CI/CD Pipelines
            </span>
          </div>
        </div>

        {/* Card 4: 1-Click Formatting Guard */}
        <div className="group rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-md sm:p-7 lg:col-span-4 dark:border-neutral-800 dark:bg-neutral-900/90">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400">
              <FileCheck2 className="h-4.5 w-4.5" />
            </span>
            <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
              Format & Parser Guard
            </h3>
          </div>
          <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
            Guarantees font hierarchy, margins, and section orders parse cleanly in ATS tools.
          </p>

          <div className="mt-5 space-y-2 text-xs font-medium">
            <div className="flex items-center justify-between rounded-lg bg-neutral-50 px-3 py-2 text-neutral-700 dark:bg-neutral-800/50 dark:text-neutral-300">
              <span>Greenhouse Compatible</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">100% Valid</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-neutral-50 px-3 py-2 text-neutral-700 dark:bg-neutral-800/50 dark:text-neutral-300">
              <span>Workday ATS Compliant</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">100% Valid</span>
            </div>
          </div>
        </div>

        {/* Card 5: Real-time Job Fit Matcher */}
        <div className="group rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-md sm:p-7 lg:col-span-4 dark:border-neutral-800 dark:bg-neutral-900/90">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400">
              <TrendingUp className="h-4.5 w-4.5" />
            </span>
            <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
              Job Fit Match Score
            </h3>
          </div>
          <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
            Compare your resume directly against any target job posting link or description.
          </p>

          <div className="mt-5 rounded-xl border border-neutral-200/80 bg-neutral-50 p-3 dark:border-neutral-800 dark:bg-neutral-950/60">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-neutral-900 dark:text-white">
                Senior Software Engineer
              </span>
              <span className="font-bold text-orange-600 dark:text-orange-400">92% Match</span>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400">
              <Award className="h-3.5 w-3.5 text-amber-500" /> Competitive Candidate Profile
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
