"use client";

import * as React from "react";
import Link from "next/link";
import { CheckCircle2, FileText, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  FiUploadCloud,
  FiCheckCircle,
  FiArrowRight,
  FiUsers,
} from "react-icons/fi";

import { Button } from "@/components/ui/button";
import Image from "next/image";
const ACCEPTED_TYPES = [".pdf", ".doc", ".docx"];
export function Hero() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [fileName, setFileName] = React.useState<string | null>(null);

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (file) setFileName(file.name);
  };
  return (
    <section className="relative overflow-hidden bg-white dark:bg-neutral-950">
      {/* faint forge-spark backdrop, top right */}
      {/* <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-orange-500/10 blur-3xl dark:bg-orange-500/[0.08]"
      /> */}

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-16 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-28 lg:px-8">
        {/* Left: copy */}
        <div className="relative z-10 max-w-xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 py-1 pl-1 pr-3 text-xs font-medium text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white">
              <FiUsers className="h-3 w-3" strokeWidth={2.5} />
            </span>
            12,400 resumes analyzed this month
          </div>

          <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-neutral-900 sm:text-5xl dark:text-white">
            Forge a resume that gets you hired.
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
            Upload your resume and get a line-by-line breakdown of what's
            working, what's missing, and how you match against real job postings
            — in under a minute.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              asChild
              className="h-12 bg-neutral-900 px-6 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              <Link href="/analyze">
                <FiUploadCloud className="h-4 w-4" />
                Analyze your resume
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="h-12 px-6">
              <Link href="/jobs">
                Browse open roles
                <FiArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Right: resume analysis mockup */}
        <div className="relative z-10 mx-auto w-full max-w-lg md:mx-0 md:ml-auto">
          {/* <div className="relative z-10 mt-10">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleFiles(e.dataTransfer.files);
              }}
              className={cn(
                "flex flex-col items-center rounded-3xl border-2 border-dashed bg-neutral-50/60 px-8 py-8 text-center transition-colors dark:bg-neutral-900/50",
                isDragging
                  ? "border-orange-500 bg-orange-50/60 dark:bg-orange-500/[0.06]"
                  : "border-neutral-300 dark:border-neutral-700",
              )}
            >
              <p className="text-xl font-semibold text-neutral-900 dark:text-white">
                Drag and drop your resume
              </p>
              <p className="mt-1 text-xl font-semibold text-neutral-900 dark:text-white">
                or{" "}
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="text-orange-600 underline decoration-2 underline-offset-2 hover:text-orange-700 dark:text-orange-400"
                >
                  browse to upload
                </button>
                .
              </p>

              <input
                ref={inputRef}
                type="file"
                accept={ACCEPTED_TYPES.join(",")}
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />

              <Button
                size="lg"
                onClick={() => inputRef.current?.click()}
                className="mt-7 h-10 rounded-full bg-neutral-900 px-5 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
              >
                <UploadCloud className="h-4 w-4" />
                Drop your cv or resume
              </Button>

              <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-500">
                File must be PDF, DOC or DOCX and up to 10MB
              </p>

              {fileName && (
                <div className="mt-4 flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 text-xs font-medium text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
                  <FileText className="h-3.5 w-3.5 text-orange-500" />
                  {fileName}
                </div>
              )}

              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
                <span className="flex items-center gap-1.5 text-sm text-neutral-600 dark:text-neutral-400">
                  <CheckCircle2 className="h-4 w-4 text-orange-500" />
                  Free to use
                </span>
                <span className="flex items-center gap-1.5 text-sm text-neutral-600 dark:text-neutral-400">
                  <CheckCircle2 className="h-4 w-4 text-orange-500" />
                  No credit card required
                </span>
              </div>
            </div>

            <p className="mt-4 text-center text-xs text-neutral-400 dark:text-neutral-600 md:text-left">
              By uploading your resume, you agree to Career Forge's{" "}
              <a
                href="/terms"
                className="text-orange-600 hover:underline dark:text-orange-400"
              >
                Terms of use
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="text-orange-600 hover:underline dark:text-orange-400"
              >
                Privacy policy
              </a>
              .
            </p>
          </div> */}
          <div className="mx-auto w-full md:mx-0 md:ml-auto md:-mt-10">
            <Image
              src="/banner2.jpg"
              alt="Job seeker reviewing their resume with confidence"
              width={600}
              height={740}
              className="w-full rounded-3xl object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
