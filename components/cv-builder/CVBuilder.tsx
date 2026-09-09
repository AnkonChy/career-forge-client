"use client";

import { useRef, useState } from "react";
import { Group, Panel, Separator } from "react-resizable-panels";
import {
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";
import { TabSlider } from "./SectionTab";
import { BasicsForm, defaultBasicsData } from "./BasicForm";

const SECTIONS = [
  { icon: User, label: "Personal Info" },
  { icon: Briefcase, label: "Experience" },
  { icon: GraduationCap, label: "Education" },
  { icon: Wrench, label: "Skills" },
];

export function CVBuilder() {
  const [zoom, setZoom] = useState(1);
  const [activeSection, setActiveSection] = useState(0);

  // Basics form data
  const [basicsData, setBasicsData] = useState(defaultBasicsData);

  const handleBasicsChange = (
    field: keyof typeof basicsData,
    value: string
  ) => {
    setBasicsData((prev) => ({ ...prev, [field]: value }));
  };

  // CV position
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  // Drag state
  const [isDragging, setIsDragging] = useState(false);

  const dragStart = useRef({
    x: 0,
    y: 0,
  });

  const positionStart = useRef({
    x: 0,
    y: 0,
  });

  // -------------------------
  // Zoom Controls
  // -------------------------

  const zoomIn = () => {
    setZoom((z) => Math.min(z + 0.1, 2));
  };

  const zoomOut = () => {
    setZoom((z) => Math.max(z - 0.1, 0.5));
  };

  const resetZoom = () => {
    setZoom(1);
    setPosition({
      x: 0,
      y: 0,
    });
  };

  // -------------------------
  // Mouse Wheel Zoom
  // -------------------------

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();

    const zoomSpeed = 0.0015;

    setZoom((currentZoom) => {
      const newZoom = currentZoom - e.deltaY * zoomSpeed;

      return Math.min(Math.max(newZoom, 0.5), 2);
    });
  };

  // -------------------------
  // Start Dragging
  // -------------------------

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    setIsDragging(true);

    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
    };

    positionStart.current = {
      x: position.x,
      y: position.y,
    };
  };

  // -------------------------
  // Drag CV
  // -------------------------

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const dx = e.clientX - dragStart.current.x;

    const dy = e.clientY - dragStart.current.y;

    setPosition({
      x: positionStart.current.x + dx,
      y: positionStart.current.y + dy,
    });
  };

  // -------------------------
  // Stop Dragging
  // -------------------------

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <Group orientation="horizontal" className="h-screen bg-[#EDEBE6]">
      {/* Sidebar */}
      <Panel defaultSize="22%" minSize="30%" maxSize="50%">
        <div className="h-full bg-white text-[#1C1B19] flex flex-col">
          <TabSlider
            sections={SECTIONS.map((s) => ({ label: s.label }))}
            active={activeSection}
            onSelect={setActiveSection}
          />

          {activeSection === 0 && (
            <BasicsForm data={basicsData} onChange={handleBasicsChange} />
          )}

          {activeSection !== 0 && (
            <p className="text-neutral-400 text-sm p-6">
              {SECTIONS[activeSection].label} — coming soon
            </p>
          )}
        </div>
      </Panel>

      {/* Drag handle */}
      <Separator className="w-[2px] bg-[#D8D5CC] hover:bg-[#B08968] active:bg-[#95724F] cursor-col-resize transition-colors" />

      {/* CV Preview area */}
      <Panel defaultSize="50%">
        <div className="flex h-full flex-col">
          {/* =========================
              Zoom Toolbar
          ========================== */}

          <div className="flex items-center justify-center gap-1 border-b border-[#D8D5CC] py-2.5 bg-[#F5F3EF]">
            {/* Zoom Out */}

            <button
              onClick={zoomOut}
              className="h-8 w-8 flex items-center justify-center rounded-md text-[#4A4640] hover:bg-black/5 transition-colors"
              title="Zoom out"
            >
              <ZoomOut className="h-4 w-4" strokeWidth={1.75} />
            </button>

            {/* Zoom Percentage */}

            <span className="text-[13px] font-medium text-[#4A4640] w-11 text-center tabular-nums select-none">
              {Math.round(zoom * 100)}%
            </span>

            {/* Zoom In */}

            <button
              onClick={zoomIn}
              className="h-8 w-8 flex items-center justify-center rounded-md text-[#4A4640] hover:bg-black/5 transition-colors"
              title="Zoom in"
            >
              <ZoomIn className="h-4 w-4" strokeWidth={1.75} />
            </button>

            {/* Divider */}

            <div className="w-px h-4 bg-[#D8D5CC] mx-2" />

            {/* Reset */}

            <button
              onClick={resetZoom}
              className="h-8 w-8 flex items-center justify-center rounded-md text-[#4A4640] hover:bg-black/5 transition-colors"
              title="Reset zoom"
            >
              <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.75} />
            </button>
          </div>

          {/* =========================
              CV Workspace
          ========================== */}

          <div
            className={`flex-1 overflow-hidden flex items-center justify-center bg-[#EDEBE6] ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* =========================
                CV
            ========================== */}

            <div
              style={{
                transform: `
                  translate(${position.x}px, ${position.y}px)
                  scale(${zoom})
                `,
                transformOrigin: "center center",

                transition: isDragging ? "none" : "transform 0.1s ease-out",
              }}
              className="select-none"
            >
              <div className="w-[600px] min-h-[800px] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.08)]">
                <div className="p-10">
                  <p className="text-neutral-300 text-sm">CV Preview here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Panel>
    </Group>
  );
}