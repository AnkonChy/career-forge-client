"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Course } from "@/types/course";
import { fetchCourses, FALLBACK_COURSES } from "@/services/courseService";
import { CourseCard } from "@/components/courses/course-card";
import { CourseDetailsModal } from "@/components/courses/course-details-modal";
import { EnrollModal } from "@/components/courses/enroll-modal";
import {
  Search,
  ChevronRight,
  BookOpen,
  Sparkles,
} from "lucide-react";

// Tab filter list in English matching the reference design layout
const CATEGORY_TABS = [
  { id: "all", label: "All Courses" },
  { id: "free", label: "Free Courses" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
  { id: "genai", label: "Generative AI & LLM" },
  { id: "ml", label: "Machine Learning" },
  { id: "mlops", label: "Production & MLOps" },
];

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>(FALLBACK_COURSES);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadCourses = async () => {
      try {
        const data = await fetchCourses();
        if (isMounted && data && data.length > 0) {
          setCourses(data);
        }
      } catch (err) {
        console.error("Failed to load courses:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadCourses();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter courses based on active tab and search query
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      // Tab filter
      if (activeTab === "free" && !course.is_free) return false;
      if (activeTab === "intermediate" && course.level.toLowerCase() !== "intermediate")
        return false;
      if (activeTab === "advanced" && course.level.toLowerCase() !== "advanced")
        return false;
      if (
        activeTab === "genai" &&
        !course.title.toLowerCase().includes("generative") &&
        !course.title.toLowerCase().includes("llm") &&
        !course.title.toLowerCase().includes("rag") &&
        !course.title.toLowerCase().includes("agent")
      ) {
        return false;
      }
      if (
        activeTab === "ml" &&
        !course.title.toLowerCase().includes("machine learning") &&
        !course.title.toLowerCase().includes("vision") &&
        !course.title.toLowerCase().includes("engineering with python")
      ) {
        return false;
      }
      if (
        activeTab === "mlops" &&
        !course.title.toLowerCase().includes("production") &&
        !course.title.toLowerCase().includes("mlops")
      ) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = course.title.toLowerCase().includes(query);
        const matchesDesc = course.description.toLowerCase().includes(query);
        const matchesInstructor = course.instructor_name.toLowerCase().includes(query);
        const matchesLevel = course.level.toLowerCase().includes(query);
        return matchesTitle || matchesDesc || matchesInstructor || matchesLevel;
      }

      return true;
    });
  }, [courses, activeTab, searchQuery]);

  const handleOpenDetails = (course: Course) => {
    setSelectedCourse(course);
    setIsDetailsOpen(true);
  };

  const handleOpenEnroll = (course: Course) => {
    setSelectedCourse(course);
    setIsEnrollOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header Section matching reference image layout */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
            Choose the <span className="text-[#0072bc]">Right Course</span> for Your Goals
          </h1>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
            Master real-world AI, Machine Learning, and Engineering skills curated by
            top practitioners to accelerate your professional journey.
          </p>
        </div>

        {/* Category Filter Tabs Bar (Horizontal Bar as in reference image) */}
        <div className="mb-6">
          <div className="bg-[#f1f5f9] rounded-xl p-1.5 flex items-center justify-between shadow-2xs border border-slate-200/80 overflow-x-auto scrollbar-none">
            <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
              {CATEGORY_TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? "text-[#0072bc] bg-white shadow-xs font-bold"
                        : "text-neutral-600 hover:text-neutral-900 hover:bg-slate-200/50"
                    }`}
                  >
                    <span>{tab.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-[2.5px] bg-[#0072bc] rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="hidden sm:flex items-center text-neutral-400 pl-3 pr-2 shrink-0">
              <ChevronRight className="w-4 h-4 text-neutral-400" />
              <ChevronRight className="w-4 h-4 text-neutral-300 -ml-2" />
            </div>
          </div>
        </div>

        {/* Search & Results Status */}
        <div className="mb-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses by topic, skill, or title..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0072bc] focus:border-transparent transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-600 font-semibold"
              >
                Clear
              </button>
            )}
          </div>

          <div className="text-xs sm:text-sm text-neutral-500 font-medium flex items-center gap-1.5 self-end sm:self-center">
            <Sparkles className="w-4 h-4 text-[#0072bc]" />
            <span>
              Showing <strong className="text-neutral-800">{filteredCourses.length}</strong> {filteredCourses.length === 1 ? "course" : "courses"}
            </span>
          </div>
        </div>

        {/* Courses Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="bg-white border border-neutral-200 rounded-2xl p-4 animate-pulse space-y-3"
              >
                <div className="aspect-[16/9] bg-neutral-200 rounded-xl" />
                <div className="h-4 bg-neutral-200 rounded-md w-24" />
                <div className="h-5 bg-neutral-200 rounded-md w-full" />
                <div className="h-4 bg-neutral-200 rounded-md w-2/3" />
                <div className="flex justify-between pt-2">
                  <div className="h-4 bg-neutral-200 rounded-md w-16" />
                  <div className="h-6 bg-neutral-200 rounded-md w-20" />
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="h-9 bg-neutral-200 rounded-lg" />
                  <div className="h-9 bg-neutral-200 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-white border border-neutral-200 rounded-2xl p-8">
            <BookOpen className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-neutral-800">No courses found</h3>
            <p className="text-sm text-neutral-500 mt-1 max-w-sm mx-auto">
              We couldn&apos;t find any courses matching your criteria. Try adjusting your search query or category filters.
            </p>
            <button
              onClick={() => {
                setActiveTab("all");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-[#0072bc] bg-sky-50 rounded-lg hover:bg-sky-100 transition-colors cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onOpenDetails={handleOpenDetails}
                onEnroll={handleOpenEnroll}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <CourseDetailsModal
        course={selectedCourse}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onEnroll={handleOpenEnroll}
      />

      <EnrollModal
        course={selectedCourse}
        isOpen={isEnrollOpen}
        onClose={() => setIsEnrollOpen(false)}
      />
    </div>
  );
}
