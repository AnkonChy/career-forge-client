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
  return (
    <section className="relative overflow-hidden bg-white dark:bg-neutral-950">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-16 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-28 lg:px-8">
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

        <div className="relative z-10 mx-auto w-full max-w-lg md:mx-0 md:ml-auto">
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
