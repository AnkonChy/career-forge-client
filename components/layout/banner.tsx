"use client";

import * as React from "react";
import { CheckCircle2, FileText, UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ACCEPTED_TYPES = [".pdf", ".doc", ".docx"];

export function Banner() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [fileName, setFileName] = React.useState<string | null>(null);

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (file) setFileName(file.name);
  };

  return (
    <section className="relative overflow-hidden bg-white dark:bg-neutral-950">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-orange-500/10 blur-3xl dark:bg-orange-500/[0.08]"
      />

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8">
        {/* Left: drag-and-drop upload card */}
        <div className="relative z-10">
          <h1 className="mb-8 max-w-md text-3xl font-semibold leading-[1.15] tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
            Forge a resume that gets you hired.
          </h1>

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
              "flex flex-col items-center rounded-3xl border-2 border-dashed bg-neutral-50/60 px-8 py-12 text-center transition-colors dark:bg-neutral-900/50",
              isDragging
                ? "border-orange-500 bg-orange-50/60 dark:bg-orange-500/[0.06]"
                : "border-neutral-300 dark:border-neutral-700"
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
              className="mt-7 h-12 rounded-full bg-orange-500 px-8 text-white hover:bg-orange-600"
            >
              <UploadCloud className="h-4 w-4" />
              Analyze your resume
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
            <a href="/terms" className="text-orange-600 hover:underline dark:text-orange-400">
              Terms of use
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-orange-600 hover:underline dark:text-orange-400">
              Privacy policy
            </a>
            .
          </p>
        </div>

        {/* Right: flat vector illustration */}
        <div className="relative z-10 mx-auto flex w-full max-w-md items-center justify-center md:mx-0 md:ml-auto">
          <svg
            viewBox="0 0 460 460"
            className="h-auto w-full max-w-md"
            role="img"
            aria-label="Illustration of a resume rising out of an upload tray, surrounded by sparks and a check badge"
          >
            {/* soft floor shadow */}
            <ellipse cx="230" cy="410" rx="140" ry="14" className="fill-neutral-100 dark:fill-neutral-900" />

            {/* upload tray */}
            <path
              d="M110 340 L350 340 L330 380 L130 380 Z"
              className="fill-neutral-900 dark:fill-white"
            />
            <path
              d="M110 340 L350 340 L340 360 L120 360 Z"
              className="fill-neutral-700 dark:fill-neutral-300"
            />

            {/* motion lines */}
            <rect x="222" y="200" width="4" height="26" rx="2" className="fill-neutral-200 dark:fill-neutral-700" />
            <rect x="196" y="212" width="4" height="20" rx="2" className="fill-neutral-200 dark:fill-neutral-700" />
            <rect x="250" y="212" width="4" height="20" rx="2" className="fill-neutral-200 dark:fill-neutral-700" />

            {/* resume card rising */}
            <g>
              <rect
                x="150"
                y="90"
                width="160"
                height="210"
                rx="14"
                className="fill-white stroke-neutral-200 dark:fill-neutral-900 dark:stroke-neutral-700"
                strokeWidth="1.5"
              />
              {/* avatar circle */}
              <circle cx="185" cy="122" r="14" className="fill-neutral-200 dark:fill-neutral-700" />
              <rect x="208" y="114" width="60" height="7" rx="3.5" className="fill-neutral-900 dark:fill-white" />
              <rect x="208" y="126" width="42" height="5" rx="2.5" className="fill-neutral-300 dark:fill-neutral-600" />

              <rect x="170" y="155" width="130" height="5" rx="2.5" className="fill-neutral-200 dark:fill-neutral-700" />
              <rect x="170" y="167" width="110" height="5" rx="2.5" className="fill-neutral-200 dark:fill-neutral-700" />
              <rect x="170" y="179" width="70" height="5" rx="2.5" className="fill-orange-500" />

              <rect x="170" y="205" width="90" height="6" rx="3" className="fill-neutral-900 dark:fill-white" />
              <rect x="170" y="221" width="130" height="5" rx="2.5" className="fill-neutral-200 dark:fill-neutral-700" />
              <rect x="170" y="233" width="120" height="5" rx="2.5" className="fill-neutral-200 dark:fill-neutral-700" />
              <rect x="170" y="245" width="60" height="5" rx="2.5" className="fill-orange-500" />
              <rect x="170" y="257" width="100" height="5" rx="2.5" className="fill-neutral-200 dark:fill-neutral-700" />
            </g>

            {/* check badge */}
            <circle cx="308" cy="98" r="24" className="fill-orange-500" />
            <path
              d="M297 98 L305 106 L320 88"
              fill="none"
              className="stroke-white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* sparks */}
            <circle cx="120" cy="130" r="6" className="fill-orange-400" />
            <circle cx="105" cy="160" r="4" className="fill-orange-300" />
            <path
              d="M355 190 L359 202 L371 206 L359 210 L355 222 L351 210 L339 206 L351 202 Z"
              className="fill-orange-500"
            />
            <circle cx="368" cy="250" r="5" className="fill-orange-300" />
          </svg>
        </div>
      </div>
    </section>
  );
}