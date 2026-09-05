import { SocialProof } from "./social-proof";
import { FeaturesBento } from "./features-bento";
import { HowItWorks } from "./how-it-works";
import { ImpactMetrics } from "./impact-metrics";
import { CtaBanner } from "./cta-banner";

export function FeaturesSection() {
  return (
    <section className="relative w-full border-t border-neutral-200/80 bg-neutral-50/50 py-20 dark:border-neutral-800/80 dark:bg-neutral-950">
      {/* Decorative ambient gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-96 w-[700px] rounded-full bg-gradient-to-tr from-orange-500/10 via-amber-500/5 to-transparent blur-3xl dark:from-orange-500/[0.08]"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SocialProof />
        <FeaturesBento />
        <HowItWorks />
        <ImpactMetrics />
        <CtaBanner />
      </div>
    </section>
  );
}

export { SocialProof, FeaturesBento, HowItWorks, ImpactMetrics, CtaBanner };
