"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TabSliderProps {
  sections: { label: string }[];
  active: number;
  onSelect: (index: number) => void;
}

export function TabSlider({ sections, active, onSelect }: TabSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "right" ? 150 : -150,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex items-center gap-2 border-b border-[#D8D5CC] bg-white px-3 py-2">
      {/* Left arrow */}
      <button
        onClick={() => scroll("left")}
        className="h-8 w-8 rounded-full border border-[#D8D5CC] flex items-center justify-center shrink-0 text-[#4A4640] hover:bg-black/5 transition-colors"
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
      </button>

      {/* Scrollable tab strip */}
      <div
        ref={scrollRef}
        className="flex gap-1 overflow-x-auto scroll-smooth no-scrollbar"
      >
        {sections.map((section, i) => (
          <button
            key={section.label}
            onClick={() => onSelect(i)}
            className={`px-3 py-2 rounded-md text-sm whitespace-nowrap transition-colors ${
              active === i
                ? "bg-[#EDEBE6] text-[#1C1B19] font-medium"
                : "text-neutral-500 hover:bg-black/5"
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Right arrow */}
      <button
        onClick={() => scroll("right")}
        className="h-8 w-8 rounded-full border border-[#D8D5CC] flex items-center justify-center shrink-0 text-[#4A4640] hover:bg-black/5 transition-colors"
      >
        <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
      </button>
    </div>
  );
}
