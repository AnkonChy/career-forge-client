"use client";

import React from "react";
import { Course } from "@/types/course";
import { CourseThumbnail } from "./course-thumbnail";
import {
  X,
  BookOpen,
  Clock,
  User,
  CheckCircle2,
  Calendar,
  Sparkles,
  Award,
  ShieldCheck,
} from "lucide-react";

interface CourseDetailsModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onEnroll: (course: Course) => void;
}

export const CourseDetailsModal: React.FC<CourseDetailsModalProps> = ({
  course,
  isOpen,
  onClose,
  onEnroll,
}) => {
  if (!isOpen || !course) return null;

  const highlights = [
    "Comprehensive hands-on projects & assignments",
    "Production-level coding best practices & architecture",
    "Certificate of completion verified by Career Forge",
    "Direct Q&A support & community code review",
    "Lifetime access to materials and updates",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-neutral-200 p-5 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors z-20 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Thumbnail Preview */}
        <div className="mb-4 overflow-hidden rounded-xl">
          <CourseThumbnail course={course} />
        </div>

        {/* Tag & Level */}
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold text-white bg-[#dc2626]">
            {course.level || "Intermediate"}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-600">
            {course.status.toUpperCase()}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 leading-tight mb-2">
          {course.title}
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mb-5">
          {course.description}
        </p>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-neutral-50 rounded-xl border border-neutral-100 mb-5">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#0072bc]" />
            <div>
              <div className="text-[11px] text-neutral-400">Instructor</div>
              <div className="text-xs font-semibold text-neutral-800 line-clamp-1">
                {course.instructor_name}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#0072bc]" />
            <div>
              <div className="text-[11px] text-neutral-400">Curriculum</div>
              <div className="text-xs font-semibold text-neutral-800">
                {course.lessons_count ?? 48} Lessons
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#0072bc]" />
            <div>
              <div className="text-[11px] text-neutral-400">Total Duration</div>
              <div className="text-xs font-semibold text-neutral-800">
                {course.duration_hours ?? 60} Hours
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#0072bc]" />
            <div>
              <div className="text-[11px] text-neutral-400">Certificate</div>
              <div className="text-xs font-semibold text-neutral-800">
                Verified
              </div>
            </div>
          </div>
        </div>

        {/* Course Highlights */}
        <div className="mb-6">
          <h4 className="text-sm font-bold text-neutral-900 mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#0072bc]" />
            What you will get in this course
          </h4>
          <ul className="space-y-2">
            {highlights.map((h, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-xs sm:text-sm text-neutral-600"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Pricing & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
          <div>
            <div className="text-xs text-neutral-500 font-medium">Course Fee</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-neutral-900">
                ৳ {Number(course.discount_price || course.price).toLocaleString()}
              </span>
              {course.price && (
                <span className="text-sm text-neutral-400 line-through font-medium">
                  ৳ {Number(course.price).toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl border border-neutral-300 text-neutral-700 hover:bg-neutral-100 text-sm font-semibold transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onEnroll(course);
              }}
              className="py-2.5 px-5 rounded-xl bg-[#0072bc] hover:bg-[#005ea6] text-white text-sm font-semibold transition-colors shadow-md cursor-pointer"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
