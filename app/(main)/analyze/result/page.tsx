"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  AlertTriangle,
  User,
  Award,
  Sparkles,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  MessageSquareText,
  Lightbulb,
  FileSearch,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuestionItem {
  question: string;
  type: string;
  idealAnswer: string;
}

interface AnalysisData {
  isValidResume: boolean;
  name: string;
  skills: string[];
  experienceSummary: string;
  suggestions: string[];
  questions: QuestionItem[];
}

export default function AnalysisResultPage() {
  const router = useRouter();
  const [data, setData] = React.useState<AnalysisData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [openQuestionIndex, setOpenQuestionIndex] = React.useState<number | null>(0);

  React.useEffect(() => {
    const stored = sessionStorage.getItem("resumeAnalysisResult");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setData(parsed);
      } catch (err) {
        console.error("Failed to parse analysis result:", err);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center space-y-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent mx-auto" />
          <p className="text-sm text-neutral-500">Loading analysis results...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
          <FileSearch className="h-8 w-8" />
        </div>
        <h2 className="mt-6 text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
          No Resume Data Found
        </h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Please upload a resume first to view the detailed AI analysis and interview preparation details.
        </p>
        <Button asChild className="mt-6 bg-orange-600 hover:bg-orange-700 text-white rounded-full">
          <Link href="/analyze">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Upload Resume
          </Link>
        </Button>
      </div>
    );
  }

  const toggleQuestion = (index: number) => {
    setOpenQuestionIndex(openQuestionIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-neutral-50/50 dark:bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Navigation & Header Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/analyze")}
            className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Upload Another Resume
          </Button>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700 dark:border-orange-900/50 dark:bg-orange-950/40 dark:text-orange-300">
            <Sparkles className="h-3.5 w-3.5" />
            AI Analysis Complete
          </span>
        </div>

        {/* Hero Card: Candidate Header & Validity */}
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 relative overflow-hidden">
          <div className="absolute top-0 right-0 h-40 w-40 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold text-xl shadow">
                <User className="h-7 w-7" />
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
                  {data.name || "Candidate Resume Analysis"}
                </h1>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  Comprehensive AI Evaluation & Interview Preparation Report
                </p>
              </div>
            </div>

            <div className="shrink-0">
              {data.isValidResume ? (
                <div className="inline-flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50/80 px-4 py-2.5 text-sm font-semibold text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  Valid Resume Verified
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50/80 px-4 py-2.5 text-sm font-semibold text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  Review Recommended
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400">
              <BookOpen className="h-5 w-5" />
            </span>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
              Executive Summary
            </h2>
          </div>
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-base">
            {data.experienceSummary}
          </p>
        </div>

        {/* Section 2: Extracted Skills */}
        {data.skills && data.skills.length > 0 && (
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex items-center gap-3 mb-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400">
                <Award className="h-5 w-5" />
              </span>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                Key Skills & Competencies ({data.skills.length})
              </h2>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {data.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-1.5 text-sm font-medium text-neutral-800 transition-colors hover:border-orange-300 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:border-orange-800"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Section 3: AI Recommendations / Suggestions */}
        {data.suggestions && data.suggestions.length > 0 && (
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex items-center gap-3 mb-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400">
                <Lightbulb className="h-5 w-5" />
              </span>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                Actionable Recommendations for Improvement
              </h2>
            </div>

            <div className="space-y-3.5">
              {data.suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3.5 rounded-2xl border border-neutral-100 bg-neutral-50/60 p-4 transition-colors dark:border-neutral-800/60 dark:bg-neutral-900/40"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400 text-xs font-bold mt-0.5">
                    {index + 1}
                  </span>
                  <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 leading-normal">
                    {suggestion}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 4: Tailored Interview Questions */}
        {data.questions && data.questions.length > 0 && (
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400">
                  <MessageSquareText className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                    Tailored Interview Questions ({data.questions.length})
                  </h2>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Click any question to view the ideal sample response.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {data.questions.map((q, idx) => {
                const isOpen = openQuestionIndex === idx;
                const isTechnical = q.type?.toLowerCase() === "technical";

                return (
                  <div
                    key={idx}
                    className="overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all dark:border-neutral-800 dark:bg-neutral-900"
                  >
                    <button
                      type="button"
                      onClick={() => toggleQuestion(idx)}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold uppercase tracking-wider ${
                            isTechnical
                              ? "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                              : "bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300"
                          }`}
                        >
                          {q.type}
                        </span>
                        <span className="text-base font-semibold text-neutral-900 dark:text-white">
                          {q.question}
                        </span>
                      </div>

                      <div className="shrink-0 text-neutral-400">
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 text-orange-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="border-t border-neutral-100 bg-neutral-50/80 p-5 dark:border-neutral-800 dark:bg-neutral-900/60">
                        <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                          <Sparkles className="h-3.5 w-3.5" />
                          Ideal Sample Response
                        </div>
                        <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
                          {q.idealAnswer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
