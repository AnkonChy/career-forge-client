"use client";

import { useRef } from "react";
import { RichTextToolbar } from "./RichTextToolbar";
import { SummaryData } from "./types";
import { ListOrdered } from "lucide-react";

interface SummaryFormProps {
  data: SummaryData;
  onChange: (value: string) => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export function SummaryForm({ data, onChange, onNext, onPrev }: SummaryFormProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInsertSymbol = (before: string, after: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selection = data.summary.substring(start, end);
    const replacement = `${before}${selection}${after}`;

    const newValue =
      data.summary.substring(0, start) + replacement + data.summary.substring(end);

    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        end + before.length
      );
    }, 0);
  };

  return (
    <div className="flex-1 flex flex-col justify-between overflow-y-auto px-5 py-5 text-[#1C1B19]">
      <div className="space-y-4">
        {/* Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#1C1B19]">Summary</h2>
          </div>
          <button className="text-neutral-500 hover:text-black p-1">
            <ListOrdered size={18} />
          </button>
        </div>

        {/* Text area with Rich toolbar */}
        <div className="flex flex-col">
          <RichTextToolbar onInsertSymbol={handleInsertSymbol} />
          <textarea
            ref={textareaRef}
            rows={10}
            value={data.summary}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write a brief professional summary highlighting your key background, strengths, and career objectives..."
            className="w-full rounded-b-md border border-[#D8D5CC] bg-white p-3 text-sm text-[#1C1B19] outline-none focus:border-[#B08968] transition-colors resize-none leading-relaxed"
          />
        </div>
      </div>

      {/* Prev / Next buttons matching screenshot */}
      <div className="pt-6 flex items-center gap-3">
        {onPrev && (
          <button
            type="button"
            onClick={onPrev}
            className="flex-1 py-3 bg-[#111827] hover:bg-black text-white text-xs font-bold tracking-wider uppercase rounded transition-colors shadow-sm"
          >
            Previous
          </button>
        )}
        {onNext && (
          <button
            type="button"
            onClick={onNext}
            className="flex-1 py-3 bg-[#111827] hover:bg-black text-white text-xs font-bold tracking-wider uppercase rounded transition-colors shadow-sm"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
