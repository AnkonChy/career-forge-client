"use client";

import * as React from "react";
import Link from "next/link";
import { Flame, ArrowRight } from "lucide-react";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import { Button } from "@/components/ui/button";

const FOOTER_NAV = {
  product: [
    { label: "Resume Analyzer", href: "/analyze" },
    { label: "ATS Checker", href: "/ats-checker" },
    { label: "Cover Letter Generator", href: "/cover-letter" },
    { label: "Job Matcher", href: "/jobs" },
    { label: "Pricing", href: "/pricing" },
  ],
  resources: [
    { label: "Career Blog", href: "/blog" },
    { label: "Resume Templates", href: "/templates" },
    { label: "Interview Guide", href: "/interview-guide" },
    { label: "Salary Calculator", href: "/salary-calculator" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="w-full border-t border-neutral-200/80 bg-neutral-50/50 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-neutral-900 dark:bg-white">
                <Flame className="h-4.5 w-4.5 text-orange-500" strokeWidth={2.25} />
              </span>
              <span className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white">
                Career Forge
              </span>
            </Link>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-sm">
              Forge a resume that gets you hired. AI-powered line-by-line breakdown of what's working, what's missing, and how you match against real job postings.
            </p>

            <div className="pt-2">
              <p className="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wider mb-2">
                Subscribe to job tips
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center gap-2 max-w-sm"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-orange-500 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-500 dark:focus:border-orange-500"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 shrink-0"
                >
                  Join
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </form>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8 lg:pl-8">
            <div>
              <h3 className="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wider">
                Product
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {FOOTER_NAV.product.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wider">
                Resources
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {FOOTER_NAV.resources.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wider">
                Company
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {FOOTER_NAV.company.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-200/80 pt-8 sm:flex-row dark:border-neutral-800">
          <p className="text-xs text-neutral-500 dark:text-neutral-500">
            &copy; {new Date().getFullYear()} Career Forge Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-neutral-500 dark:text-neutral-400">
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <FiTwitter className="h-4 w-4" />
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <FiGithub className="h-4 w-4" />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <FiLinkedin className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
