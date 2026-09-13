"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Group, Panel, Separator } from "react-resizable-panels";
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  Languages as GlobeIcon,
  Award,
  FolderGit2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronLeft,
  Download,
  History,
  FileCheck,
} from "lucide-react";
import { TabSlider } from "./SectionTab";
import { BasicsForm } from "./BasicForm";
import { SummaryForm } from "./SummaryForm";
import { ExperienceForm } from "./ExperienceForm";
import { EducationForm } from "./EducationForm";
import { SkillsForm } from "./SkillsForm";
import { LanguagesForm } from "./LanguagesForm";
import { CertificationsForm } from "./CertificationsForm";
import { ProjectsForm } from "./ProjectsForm";
import { CVPreview } from "./CVPreview";
import {
  CVData,
  initialCVData,
  ExperienceItem,
  EducationItem,
  SkillItem,
  LanguageItem,
  CertificationItem,
  ProjectItem,
} from "./types";

const SECTIONS = [
  { icon: User, label: "Personal Info" },
  { icon: FileText, label: "Summary" },
  { icon: Briefcase, label: "Experience" },
  { icon: GraduationCap, label: "Education" },
  { icon: Wrench, label: "Skills" },
  { icon: GlobeIcon, label: "Languages" },
  { icon: Award, label: "Certifications" },
  { icon: FolderGit2, label: "Projects" },
];

export function CVBuilder() {
  const [zoom, setZoom] = useState(1);
  const [activeSection, setActiveSection] = useState(0);
  const [cvData, setCvData] = useState<CVData>(initialCVData);

  // Position for dragging paper
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const positionStart = useRef({ x: 0, y: 0 });

  const handleDownloadPDF = () => {
    window.print();
  };

  // -------------------------
  // Form State Handlers
  // -------------------------
  const handleBasicsChange = (
    field: keyof typeof cvData.basics,
    value: string
  ) => {
    setCvData((prev) => ({
      ...prev,
      basics: { ...prev.basics, [field]: value },
    }));
  };

  const handleSummaryChange = (summaryText: string) => {
    setCvData((prev) => ({
      ...prev,
      summary: { summary: summaryText },
    }));
  };

  // Experience Handlers
  const handleAddExperience = (item: ExperienceItem) => {
    setCvData((prev) => ({
      ...prev,
      experience: [...prev.experience, item],
    }));
  };
  const handleUpdateExperience = (id: string, updated: ExperienceItem) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.map((i) => (i.id === id ? updated : i)),
    }));
  };
  const handleDeleteExperience = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.filter((i) => i.id !== id),
    }));
  };

  // Education Handlers
  const handleAddEducation = (item: EducationItem) => {
    setCvData((prev) => ({
      ...prev,
      education: [...prev.education, item],
    }));
  };
  const handleUpdateEducation = (id: string, updated: EducationItem) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.map((i) => (i.id === id ? updated : i)),
    }));
  };
  const handleDeleteEducation = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.filter((i) => i.id !== id),
    }));
  };

  // Skills Handlers
  const handleAddSkill = (item: SkillItem) => {
    setCvData((prev) => ({
      ...prev,
      skills: [...prev.skills, item],
    }));
  };
  const handleUpdateSkill = (id: string, updated: SkillItem) => {
    setCvData((prev) => ({
      ...prev,
      skills: prev.skills.map((i) => (i.id === id ? updated : i)),
    }));
  };
  const handleDeleteSkill = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      skills: prev.skills.filter((i) => i.id !== id),
    }));
  };

  // Languages Handlers
  const handleAddLanguage = (item: LanguageItem) => {
    setCvData((prev) => ({
      ...prev,
      languages: [...prev.languages, item],
    }));
  };
  const handleUpdateLanguage = (id: string, updated: LanguageItem) => {
    setCvData((prev) => ({
      ...prev,
      languages: prev.languages.map((i) => (i.id === id ? updated : i)),
    }));
  };
  const handleDeleteLanguage = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      languages: prev.languages.filter((i) => i.id !== id),
    }));
  };

  // Certifications Handlers
  const handleAddCertification = (item: CertificationItem) => {
    setCvData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, item],
    }));
  };
  const handleUpdateCertification = (id: string, updated: CertificationItem) => {
    setCvData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((i) => (i.id === id ? updated : i)),
    }));
  };
  const handleDeleteCertification = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((i) => i.id !== id),
    }));
  };

  // Projects Handlers
  const handleAddProject = (item: ProjectItem) => {
    setCvData((prev) => ({
      ...prev,
      projects: [...prev.projects, item],
    }));
  };
  const handleUpdateProject = (id: string, updated: ProjectItem) => {
    setCvData((prev) => ({
      ...prev,
      projects: prev.projects.map((i) => (i.id === id ? updated : i)),
    }));
  };
  const handleDeleteProject = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      projects: prev.projects.filter((i) => i.id !== id),
    }));
  };

  // Navigation controls
  const handleNextSection = () => {
    if (activeSection < SECTIONS.length - 1) {
      setActiveSection((prev) => prev + 1);
    }
  };
  const handlePrevSection = () => {
    if (activeSection > 0) {
      setActiveSection((prev) => prev - 1);
    }
  };

  // -------------------------
  // Zoom & Drag Controls
  // -------------------------
  const zoomIn = () => setZoom((z) => Math.min(z + 0.1, 2));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.1, 0.5));
  const resetZoom = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const zoomSpeed = 0.0015;
    setZoom((currentZoom) => {
      const newZoom = currentZoom - e.deltaY * zoomSpeed;
      return Math.min(Math.max(newZoom, 0.5), 2);
    });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    positionStart.current = { x: position.x, y: position.y };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setPosition({
      x: positionStart.current.x + dx,
      y: positionStart.current.y + dy,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="h-screen flex flex-col bg-[#EDEBE6] overflow-hidden">
      {/* Top Header Navbar */}
      <header className="h-14 border-b border-[#D8D5CC] bg-white px-5 flex items-center justify-between shrink-0 z-20 print:hidden">
        {/* Left: Dashboard Button */}
        <Link
          href="/"
          className="bg-[#1C1B19] hover:bg-black text-white text-xs font-medium px-3.5 py-2 rounded-md flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <ChevronLeft size={16} />
          <span>Dashboard</span>
        </Link>

        {/* Middle: Logo */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[#10B981] flex items-center justify-center text-white font-bold text-[10px]">
            CF
          </div>
          <span className="font-bold text-sm text-[#1C1B19] tracking-tight">
            Career Forge <span className="text-neutral-500 font-normal">CV Builder</span>
          </span>
        </div>

        {/* Right: History & Save/Download */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={resetZoom}
            className="p-2 rounded-md bg-[#1C1B19] text-white hover:bg-black transition-colors"
            title="Reset View"
          >
            <History size={15} />
          </button>

          <button
            type="button"
            onClick={handleDownloadPDF}
            className="bg-[#6B7280] hover:bg-[#4B5563] text-white text-xs font-semibold px-4 py-2 rounded-md flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <span>Save</span>
            <span className="text-[11px] opacity-90">☁</span>
          </button>
        </div>
      </header>

      {/* Main Panelled Workspace */}
      <div className="flex-1 overflow-hidden">
        <Group orientation="horizontal" className="h-full bg-[#EDEBE6]">
          {/* Sidebar Form Panel */}
          <Panel defaultSize="32%" minSize="28%" maxSize="50%" className="print:hidden">
            <div className="h-full bg-white text-[#1C1B19] flex flex-col">
              <TabSlider
                sections={SECTIONS.map((s) => ({ label: s.label }))}
                active={activeSection}
                onSelect={setActiveSection}
              />

              {/* 0: Personal Info */}
              {activeSection === 0 && (
                <div className="flex-1 flex flex-col justify-between overflow-y-auto">
                  <BasicsForm data={cvData.basics} onChange={handleBasicsChange} />
                  <div className="p-5 pt-0">
                    <button
                      type="button"
                      onClick={handleNextSection}
                      className="w-full py-3 bg-[#111827] hover:bg-black text-white text-xs font-bold tracking-wider uppercase rounded transition-colors shadow-sm"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* 1: Summary */}
              {activeSection === 1 && (
                <SummaryForm
                  data={cvData.summary}
                  onChange={handleSummaryChange}
                  onNext={handleNextSection}
                  onPrev={handlePrevSection}
                />
              )}

              {/* 2: Experience */}
              {activeSection === 2 && (
                <ExperienceForm
                  items={cvData.experience}
                  onAdd={handleAddExperience}
                  onUpdate={handleUpdateExperience}
                  onDelete={handleDeleteExperience}
                  onNext={handleNextSection}
                  onPrev={handlePrevSection}
                />
              )}

              {/* 3: Education */}
              {activeSection === 3 && (
                <EducationForm
                  items={cvData.education}
                  onAdd={handleAddEducation}
                  onUpdate={handleUpdateEducation}
                  onDelete={handleDeleteEducation}
                  onNext={handleNextSection}
                  onPrev={handlePrevSection}
                />
              )}

              {/* 4: Skills */}
              {activeSection === 4 && (
                <SkillsForm
                  items={cvData.skills}
                  onAdd={handleAddSkill}
                  onUpdate={handleUpdateSkill}
                  onDelete={handleDeleteSkill}
                  onNext={handleNextSection}
                  onPrev={handlePrevSection}
                />
              )}

              {/* 5: Languages */}
              {activeSection === 5 && (
                <LanguagesForm
                  items={cvData.languages}
                  onAdd={handleAddLanguage}
                  onUpdate={handleUpdateLanguage}
                  onDelete={handleDeleteLanguage}
                  onNext={handleNextSection}
                  onPrev={handlePrevSection}
                />
              )}

              {/* 6: Certifications */}
              {activeSection === 6 && (
                <CertificationsForm
                  items={cvData.certifications}
                  onAdd={handleAddCertification}
                  onUpdate={handleUpdateCertification}
                  onDelete={handleDeleteCertification}
                  onNext={handleNextSection}
                  onPrev={handlePrevSection}
                />
              )}

              {/* 7: Projects */}
              {activeSection === 7 && (
                <ProjectsForm
                  items={cvData.projects}
                  onAdd={handleAddProject}
                  onUpdate={handleUpdateProject}
                  onDelete={handleDeleteProject}
                  onPrev={handlePrevSection}
                />
              )}
            </div>
          </Panel>

          {/* Resize Handle */}
          <Separator className="w-[2px] bg-[#D8D5CC] hover:bg-[#B08968] active:bg-[#95724F] cursor-col-resize transition-colors print:hidden" />

          {/* Preview Area */}
          <Panel defaultSize="68%">
            <div className="flex h-full flex-col">
              {/* Zoom Toolbar */}
              <div className="flex items-center justify-center gap-1 border-b border-[#D8D5CC] py-2.5 bg-[#F5F3EF] print:hidden">
                <button
                  onClick={zoomOut}
                  className="h-8 w-8 flex items-center justify-center rounded-md text-[#4A4640] hover:bg-black/5 transition-colors"
                  title="Zoom out"
                >
                  <ZoomOut className="h-4 w-4" strokeWidth={1.75} />
                </button>

                <span className="text-[13px] font-medium text-[#4A4640] w-11 text-center tabular-nums select-none">
                  {Math.round(zoom * 100)}%
                </span>

                <button
                  onClick={zoomIn}
                  className="h-8 w-8 flex items-center justify-center rounded-md text-[#4A4640] hover:bg-black/5 transition-colors"
                  title="Zoom in"
                >
                  <ZoomIn className="h-4 w-4" strokeWidth={1.75} />
                </button>

                <div className="w-px h-4 bg-[#D8D5CC] mx-2" />

                <button
                  onClick={resetZoom}
                  className="h-8 w-8 flex items-center justify-center rounded-md text-[#4A4640] hover:bg-black/5 transition-colors"
                  title="Reset zoom"
                >
                  <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.75} />
                </button>
              </div>

              {/* CV Canvas */}
              <div
                className={`flex-1 overflow-auto flex items-center justify-center bg-[#EDEBE6] py-12 print:p-0 print:m-0 print:bg-white print:overflow-visible ${
                  isDragging ? "cursor-grabbing" : "cursor-grab"
                }`}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <div
                  style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                    transformOrigin: "center top",
                    transition: isDragging ? "none" : "transform 0.1s ease-out",
                  }}
                  className="select-none print:transform-none print:m-0 print:p-0"
                >
                  <CVPreview data={cvData} />
                </div>
              </div>
            </div>
          </Panel>
        </Group>
      </div>
    </div>
  );
}
