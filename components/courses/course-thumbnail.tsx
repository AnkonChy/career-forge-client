"use client";

import React from "react";
import { Course } from "@/types/course";
import { Sparkles, Terminal, Cpu, Database, Network, Eye, Layers } from "lucide-react";

interface CourseThumbnailProps {
  course: Course;
}

export const CourseThumbnail: React.FC<CourseThumbnailProps> = ({ course }) => {
  // Generate distinctive visual themes matching the screenshot's vibrant 3D look
  const getThemedStyle = (id: number, slug: string) => {
    switch (id) {
      case 1:
        return {
          gradient: "from-sky-700 via-blue-900 to-slate-950",
          badgeBg: "bg-sky-500/20 text-sky-200 border-sky-400/30",
          tag: "SPECIAL AI",
          accentColor: "#38bdf8",
          subtag: "PYTHON BATCH",
          headline: "AI + PYTHON",
          subheadline: "MASTER BATCH",
          Icon: Terminal,
        };
      case 2:
        return {
          gradient: "from-cyan-700 via-teal-900 to-neutral-950",
          badgeBg: "bg-cyan-500/20 text-cyan-200 border-cyan-400/30",
          tag: "GEN AI DEV",
          accentColor: "#22d3ee",
          subtag: "LLM & APIS",
          headline: "GENERATIVE AI",
          subheadline: "APPLICATION SUITE",
          Icon: Sparkles,
        };
      case 3:
        return {
          gradient: "from-indigo-800 via-purple-950 to-slate-950",
          badgeBg: "bg-purple-500/20 text-purple-200 border-purple-400/30",
          tag: "ADVANCED LLM",
          accentColor: "#c084fc",
          subtag: "FINE-TUNING",
          headline: "LLM ENGINEERING",
          subheadline: "PROMPT TO PROD",
          Icon: Cpu,
        };
      case 4:
        return {
          gradient: "from-emerald-700 via-teal-950 to-gray-950",
          badgeBg: "bg-emerald-500/20 text-emerald-200 border-emerald-400/30",
          tag: "RAG PIPELINE",
          accentColor: "#34d399",
          subtag: "VECTOR SEARCH",
          headline: "RAG SYSTEMS",
          subheadline: "ENTERPRISE SEARCH",
          Icon: Database,
        };
      case 5:
        return {
          gradient: "from-blue-700 via-indigo-950 to-slate-950",
          badgeBg: "bg-blue-500/20 text-blue-200 border-blue-400/30",
          tag: "ML SPECIAL",
          accentColor: "#60a5fa",
          subtag: "CORE ALGORITHMS",
          headline: "MACHINE LEARNING",
          subheadline: "ENGINEERING TRACK",
          Icon: Network,
        };
      case 6:
        return {
          gradient: "from-amber-600 via-stone-900 to-neutral-950",
          badgeBg: "bg-amber-500/20 text-amber-200 border-amber-400/30",
          tag: "AGENTIC AI",
          accentColor: "#fbbf24",
          subtag: "TOOL USE & MCP",
          headline: "AI AGENTS",
          subheadline: "AUTONOMOUS SYSTEMS",
          Icon: Layers,
        };
      case 7:
        return {
          gradient: "from-rose-700 via-red-950 to-neutral-950",
          badgeBg: "bg-rose-500/20 text-rose-200 border-rose-400/30",
          tag: "COMPUTER VISION",
          accentColor: "#fb7185",
          subtag: "DEEP LEARNING",
          headline: "VISION & YOLO",
          subheadline: "OBJECT DETECTION",
          Icon: Eye,
        };
      case 8:
      default:
        return {
          gradient: "from-slate-700 via-cyan-950 to-slate-950",
          badgeBg: "bg-cyan-500/20 text-cyan-200 border-cyan-400/30",
          tag: "PRODUCTION AI",
          accentColor: "#38bdf8",
          subtag: "MLOPS & CI/CD",
          headline: "MLOPS & DEPLOY",
          subheadline: "SCALABLE SYSTEMS",
          Icon: Terminal,
        };
    }
  };

  const theme = getThemedStyle(course.id, course.slug);
  const Icon = theme.Icon;

  return (
    <div className={`relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-gradient-to-br ${theme.gradient} flex flex-col justify-between p-3.5 select-none shadow-inner`}>
      {/* Background ambient decorative shapes / grid */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)`,
          backgroundSize: "16px 16px",
        }}
      />
      <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
      <div
        className="absolute -left-8 -bottom-8 w-28 h-28 rounded-full blur-xl pointer-events-none"
        style={{ backgroundColor: `${theme.accentColor}33` }}
      />

      {/* Top Banner Tag */}
      <div className="relative z-10 flex items-center justify-between w-full">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border tracking-wider backdrop-blur-xs uppercase ${theme.badgeBg}`}>
          {theme.tag}
        </span>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-semibold text-emerald-300">Live</span>
        </div>
      </div>

      {/* Center 3D-styled headline similar to the screenshot's 'ONLY MBBS', 'GENERAL + MBBS' */}
      <div className="relative z-10 my-auto text-center py-1">
        <div className="inline-block">
          <p
            className="text-lg md:text-xl font-black tracking-tight uppercase leading-none drop-shadow-md"
            style={{
              color: "#ffffff",
              textShadow: "0 2px 8px rgba(0,0,0,0.8), 0 0 16px rgba(255,255,255,0.3)",
            }}
          >
            {theme.headline}
          </p>
          <div className="mt-1 inline-flex items-center justify-center px-3 py-0.5 rounded-md bg-black/40 border border-white/15 backdrop-blur-xs">
            <span
              className="text-[11px] font-black tracking-widest uppercase"
              style={{ color: theme.accentColor }}
            >
              {theme.subheadline}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom bar inside thumbnail */}
      <div className="relative z-10 flex items-center justify-between pt-1 border-t border-white/10">
        <div className="flex items-center gap-1.5 text-white/80">
          <Icon className="w-3.5 h-3.5" style={{ color: theme.accentColor }} />
          <span className="text-[10px] font-semibold tracking-wide text-white/90">
            {theme.subtag}
          </span>
        </div>
        <span className="text-[10px] font-medium text-white/60">
          CareerForge
        </span>
      </div>
    </div>
  );
};
