import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <div className="mt-16 overflow-hidden rounded-3xl bg-neutral-900 px-6 py-12 text-center text-white sm:px-12 sm:py-14 dark:bg-neutral-900 dark:border dark:border-neutral-800">
      <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Ready to build a resume that actually gets callbacks?
      </h3>
      <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-400">
        Join thousands of professionals who forged their career breakthroughs using our AI resume analyzer.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button
          size="lg"
          asChild
          className="h-12 rounded-full bg-orange-500 px-8 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/25"
        >
          <Link href="/analyze">
            <Sparkles className="h-4 w-4" />
            Analyze Your Resume Free
          </Link>
        </Button>
        <Button
          size="lg"
          variant="outline"
          asChild
          className="h-12 rounded-full border-neutral-700 bg-transparent text-white hover:bg-neutral-800 hover:text-white"
        >
          <Link href="/jobs">
            Explore Matching Jobs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
