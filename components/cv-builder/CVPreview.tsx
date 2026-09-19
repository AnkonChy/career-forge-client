"use client";

import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import { CVData } from "./types";

interface CVPreviewProps {
  data: CVData;
}

export function CVPreview({ data }: CVPreviewProps) {
  const {
    basics,
    summary,
    experience,
    education,
    skills,
    languages,
    certifications,
    projects,
  } = data;

  const parseHeaderLinks = (input: string) => {
    if (!input) return [];
    const parts = input.split(/[\n|,]+/).map((s) => s.trim()).filter(Boolean);
    return parts.map((part) => {
      let label = part;
      const lower = part.toLowerCase();
      if (lower.includes("github")) label = "GitHub";
      else if (lower.includes("linkedin")) label = "LinkedIn";
      else if (lower.includes("portfolio") || lower.includes("netlify") || lower.includes("vercel")) label = "Portfolio";
      
      const href = part.startsWith("http://") || part.startsWith("https://") ? part : `https://${part}`;
      return { label, href };
    });
  };

  const headerLinks = parseHeaderLinks(basics.website);

  return (
    <div
      id="cv-preview-document"
      className="w-[650px] min-h-[850px] bg-white text-black shadow-[0_1px_3px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.08)] p-10 font-sans leading-relaxed text-[#111827] print:w-full print:max-w-none print:min-h-0 print:p-0 print:m-0 print:shadow-none"
      style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}
    >
      <div className="flex items-start gap-4 pb-2">
        {basics.avatar && (
          <div className="w-16 h-16 shrink-0 overflow-hidden rounded bg-[#EDEBE6]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={basics.avatar}
              alt={basics.fullName}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex-1 min-w-0 font-sans">
          <h1 className="text-[24px] leading-[1.1] font-bold text-black tracking-tight">
            {basics.fullName || "Your Name"}
          </h1>

          <p className="mt-1 text-[14px] font-medium text-neutral-800">
            {basics.headline || "Your Headline"}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-x-2 text-[12px] text-neutral-700">
            {basics.location && (
              <span className="flex items-center gap-1">
                <FiMapPin size={12} />
                <span>{basics.location}</span>
              </span>
            )}

            {basics.location && basics.phone && (
              <span className="text-neutral-300">|</span>
            )}

            {basics.phone && (
              <span className="flex items-center gap-1">
                <FiPhone size={12} />
                <span>{basics.phone}</span>
              </span>
            )}

            {basics.phone && basics.email && (
              <span className="text-neutral-300">|</span>
            )}

            {basics.email && (
              <span className="flex items-center gap-1">
                <FiMail size={12} />
                <span>{basics.email}</span>
              </span>
            )}
          </div>

          {headerLinks.length > 0 && (
            <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[12px] font-bold text-black">
              {headerLinks.map((link, idx) => (
                <span key={idx} className="flex items-center gap-2">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline text-black font-bold"
                  >
                    {link.label}
                  </a>
                  {idx < headerLinks.length - 1 && (
                    <span className="text-black font-bold">|</span>
                  )}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-5 text-[12px] text-neutral-900">
        {summary.summary && (
          <section className="space-y-1">
            <h3 className="font-sans font-bold text-[15px] uppercase text-black border-b border-neutral-400 pb-0.5 mb-1.5">
              Summary
            </h3>
            <p className="whitespace-pre-line text-neutral-800 text-[12px] leading-relaxed">
              {summary.summary}
            </p>
          </section>
        )}

        {experience.length > 0 && (
          <section className="space-y-3">
            <h3 className="font-sans font-bold text-[15px] uppercase text-black border-b border-neutral-400 pb-0.5 mb-1">
              Experience
            </h3>
            {experience.map((item) => (
              <div key={item.id} className="space-y-0.5">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-[12px] text-black">{item.company}</span>
                  <span className="text-[12px] font-sans text-neutral-600">
                    {item.date}
                  </span>
                </div>
                <div className="flex justify-between items-baseline italic text-neutral-700 text-[12px]">
                  <span>{item.position}</span>
                  {item.location && (
                    <span className="text-[12px] font-sans not-italic text-neutral-600">
                      {item.location}
                    </span>
                  )}
                </div>
                {item.summary && (
                  <p className="whitespace-pre-line text-neutral-800 text-[12px] pt-1 leading-relaxed">
                    {item.summary}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}

        {education.length > 0 && (
          <section className="space-y-3">
            <h3 className="font-sans font-bold text-[15px] uppercase text-black border-b border-neutral-400 pb-0.5 mb-1">
              Education
            </h3>
            {education.map((item) => (
              <div key={item.id} className="space-y-0.5">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-[12px] text-black">{item.institution}</span>
                  <span className="text-[12px] font-sans text-neutral-600">
                    {item.date}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-neutral-700 text-[12px]">
                  <span>
                    {item.fieldOfStudy}
                    {item.degree ? ` (${item.degree})` : ""}
                  </span>
                  {item.gpa && (
                    <span className="text-[12px] font-semibold text-black">
                      GPA: {item.gpa}
                    </span>
                  )}
                </div>
                {item.summary && (
                  <p className="whitespace-pre-line text-neutral-800 text-[12px] pt-1">
                    {item.summary}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}

        {skills.length > 0 && (
          <section className="space-y-2">
            <h3 className="font-sans font-bold text-[15px] uppercase text-black border-b border-neutral-400 pb-0.5 mb-1">
              Skills
            </h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {skills.map((item) => (
                <div key={item.id} className="flex flex-col text-[12px]">
                  <span className="font-bold text-black text-[12px]">{item.name}</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((dotIndex) => {
                        const isFilled =
                          item.level === "Expert"
                            ? dotIndex <= 4
                            : item.level === "Advanced"
                            ? dotIndex <= 3
                            : item.level === "Intermediate"
                            ? dotIndex <= 2
                            : dotIndex <= 1;
                        return (
                          <span
                            key={dotIndex}
                            className={`w-2.5 h-2.5 rounded-full inline-block ${
                              isFilled
                                ? "bg-red-500 border border-red-500"
                                : "bg-neutral-100 border border-neutral-300"
                            }`}
                            style={{
                              backgroundColor: isFilled ? "#ef4444" : "#f5f5f5",
                              borderColor: isFilled ? "#ef4444" : "#d4d4d4",
                              WebkitPrintColorAdjust: "exact",
                              printColorAdjust: "exact",
                            }}
                          />
                        );
                      })}
                    </div>
                    <span className="text-[12px] font-sans text-neutral-500">
                      {item.level}
                    </span>
                  </div>
                  {item.description && (
                    <span className="text-[12px] text-neutral-600">
                      {item.description}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {languages.length > 0 && (
          <section className="space-y-1.5">
            <h3 className="font-sans font-bold text-[15px] uppercase text-black border-b border-neutral-400 pb-0.5 mb-1">
              Languages
            </h3>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-[12px]">
              {languages.map((item) => (
                <div key={item.id} className="text-[12px]">
                  <span className="font-bold text-black text-[12px]">{item.language}</span>:{" "}
                  <span className="text-neutral-700 text-[12px]">{item.fluency}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section className="space-y-2">
            <h3 className="font-sans font-bold text-[15px] uppercase text-black border-b border-neutral-400 pb-0.5 mb-1">
              Certifications
            </h3>
            {certifications.map((item) => (
              <div key={item.id} className="space-y-0.5 text-[12px]">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-[12px] text-black">{item.name}</span>
                  <span className="text-[12px] font-sans text-neutral-600">
                    {item.date}
                  </span>
                </div>
                <div className="text-[12px] text-neutral-700">
                  <span>{item.issuer}</span>
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2 text-blue-600 hover:underline"
                    >
                      [Link]
                    </a>
                  )}
                </div>
                {item.summary && (
                  <p className="text-[12px] text-neutral-800">{item.summary}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {projects.length > 0 && (
          <section className="space-y-3">
            <h3 className="font-sans font-bold text-[15px] uppercase text-black border-b border-neutral-400 pb-0.5 mb-1">
              Projects
            </h3>
            {projects.map((item) => (
              <div key={item.id} className="space-y-0.5 text-[12px]">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-[12px] text-black">{item.name}</span>
                  <span className="text-[12px] font-sans text-neutral-600">
                    {item.date}
                  </span>
                </div>
                {item.role && (
                  <p className="italic text-neutral-700 text-[12px]">
                    {item.role}
                  </p>
                )}
                {item.summary && (
                  <p className="whitespace-pre-line text-neutral-800 text-[12px] pt-0.5 leading-relaxed">
                    {item.summary}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

