"use client";

import React, { useState } from "react";
import { Course } from "@/types/course";
import { CourseThumbnail } from "./course-thumbnail";
import { Bookmark, BookOpen, Clock, Check, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

interface CourseCardProps {
  course: Course;
  onOpenDetails: (course: Course) => void;
  onEnroll: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onOpenDetails,
  onEnroll,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    if (!isBookmarked) {
      toast.success(`Bookmarked "${course.title}"`);
    } else {
      toast("Removed from bookmarks", { icon: "🔖" });
    }
  };

  // Tag color matching the red badge in the screenshot
  const badgeLabel = course.level || "AI Track";

  return (
    <div className="group relative bg-white border border-neutral-200/90 rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-neutral-300 transition-all duration-300">
      {/* Top Section */}
      <div>
        {/* Thumbnail Banner */}
        <div
          onClick={() => onOpenDetails(course)}
          className="cursor-pointer overflow-hidden rounded-xl transition-transform duration-300 group-hover:scale-[1.01]"
        >
          <CourseThumbnail course={course} />
        </div>

        {/* Badge & Bookmark Row */}
        <div className="flex items-center justify-between mt-3 mb-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold text-white bg-[#dc2626] shadow-xs tracking-wide">
            {badgeLabel}
          </span>

          <button
            type="button"
            onClick={toggleBookmark}
            aria-label="Bookmark course"
            className="p-1 rounded-md text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <Bookmark
              className={`w-4 h-4 transition-colors ${
                isBookmarked
                  ? "fill-[#0072bc] text-[#0072bc]"
                  : "text-neutral-400"
              }`}
            />
          </button>
        </div>

        {/* Title */}
        <h3
          onClick={() => onOpenDetails(course)}
          className="cursor-pointer text-[15px] sm:text-[16px] font-bold text-neutral-900 group-hover:text-[#0072bc] transition-colors leading-snug line-clamp-2 min-h-[2.6rem] mb-3"
          title={course.title}
        >
          {course.title}
        </h3>

        {/* Meta & Price Grid */}
        <div className="flex items-end justify-between pt-1 pb-3 border-b border-neutral-100">
          {/* Left stats: Lesson & Hours */}
          <div className="flex flex-col gap-1.5 text-xs text-neutral-500 font-medium">
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span>{course.lessons_count ?? 48} Lesson</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span>{course.duration_hours ?? 60} hours</span>
            </div>
          </div>

          {/* Right Price display */}
          <div className="text-right">
            {course.is_free ? (
              <div className="text-base font-bold text-emerald-600">Free</div>
            ) : (
              <>
                {course.price && (
                  <div className="text-xs text-neutral-400 line-through font-medium leading-none mb-1">
                    ৳ {Number(course.price).toLocaleString()}
                  </div>
                )}
                <div className="text-lg font-bold text-neutral-900 tracking-tight leading-none">
                  ৳{" "}
                  {Number(
                    course.discount_price || course.price
                  ).toLocaleString()}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="flex items-center gap-2 pt-3 mt-auto">
        <button
          type="button"
          onClick={() => onOpenDetails(course)}
          className="flex-1 min-w-0 h-9 rounded-lg border border-[#0072bc] text-[#0072bc] hover:bg-[#0072bc]/5 active:bg-[#0072bc]/10 text-xs sm:text-[13px] font-semibold transition-colors flex items-center justify-center px-1.5 whitespace-nowrap cursor-pointer"
        >
          Course Details
        </button>

        <button
          type="button"
          onClick={() => onEnroll(course)}
          className="flex-1 min-w-0 h-9 rounded-lg bg-[#0072bc] hover:bg-[#005ea6] active:bg-[#004e8c] text-white text-xs sm:text-[13px] font-semibold transition-all flex items-center justify-center px-1.5 whitespace-nowrap shadow-xs hover:shadow-sm cursor-pointer"
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
};
