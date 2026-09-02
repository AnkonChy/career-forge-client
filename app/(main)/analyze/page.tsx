"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  CheckCircle2,
  FileText,
  UploadCloud,
  Loader2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import useAxiosPublic from "@/app/hooks/useAxiosPublic";

const ACCEPTED_TYPES = [".pdf", ".doc", ".docx"];

export default function AnalyzePage() {
  const axiosPublic = useAxiosPublic();
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (file) {
      setSelectedFile(file);
      setErrorMsg(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const formData = new FormData();
      formData.append("resume", selectedFile);

      const response = await axiosPublic.post("/api/resume/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data && response.data.success) {
        sessionStorage.setItem(
          "resumeAnalysisResult",
          JSON.stringify(response.data.data),
        );
        router.push("/analyze/result");
      } else {
        setErrorMsg(
          response.data?.message ||
            "Failed to analyze resume. Please try again.",
        );
      }
    } catch (err: any) {
      console.error("Resume analysis error:", err);
      setErrorMsg(
        err.response?.data?.message ||
          "An error occurred while uploading. Make sure backend is running at http://localhost:7000",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white">
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600 dark:border-orange-900/50 dark:bg-orange-950/40 dark:text-orange-400 mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Resume Scanner
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Analyze Your Resume
          </h1>
          <p className="mt-4 text-base text-neutral-600 dark:text-neutral-400">
            Get instant feedback on your resume. Discover strength scores,
            missing keywords, and targeted improvements in seconds.
          </p>
        </div>

        <div className="relative z-10 mt-10">
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
                disabled={isLoading}
                className="text-orange-600 underline decoration-2 underline-offset-2 hover:text-orange-700 dark:text-orange-400 disabled:opacity-50"
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

            {!selectedFile ? (
              <Button
                size="lg"
                onClick={() => inputRef.current?.click()}
                disabled={isLoading}
                className="mt-7 h-10 rounded-full bg-neutral-900 px-5 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
              >
                <UploadCloud className="h-4 w-4 mr-2" />
                Drop your cv or resume
              </Button>
            ) : (
              <div className="mt-6 flex flex-col items-center gap-3">
                <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
                  <FileText className="h-4 w-4 text-orange-500" />
                  <span>{selectedFile.name}</span>
                  <span className="text-xs text-neutral-400 ml-1">
                    ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                  </span>
                </div>

                <Button
                  size="lg"
                  onClick={handleAnalyze}
                  disabled={isLoading}
                  className="h-11 rounded-full bg-orange-600 px-8 text-white hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 font-semibold shadow-md transition-all"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Analyzing with AI...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Analyze Resume Now
                    </>
                  )}
                </Button>
              </div>
            )}

            <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-500">
              File must be PDF, DOC or DOCX and up to 10MB
            </p>

            {errorMsg && (
              <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-medium text-red-700 dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-300">
                <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
                <span>{errorMsg}</span>
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
            <Link
              href="/terms"
              className="text-orange-600 hover:underline dark:text-orange-400"
            >
              Terms of use
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-orange-600 hover:underline dark:text-orange-400"
            >
              Privacy policy
            </Link>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
