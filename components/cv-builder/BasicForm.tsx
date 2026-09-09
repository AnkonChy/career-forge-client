"use client";

import { useState } from "react";
import { Camera } from "lucide-react";

interface BasicsData {
  fullName: string;
  headline: string;
  email: string;
  website: string;
  phone: string;
  location: string;
  avatar: string | null;
}

interface BasicsFormProps {
  data: BasicsData;
  onChange: (field: keyof BasicsData, value: string) => void;
}

export function BasicsForm({ data, onChange }: BasicsFormProps) {
  return (
    <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
      {/* Section title */}
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-bold text-[#1C1B19]">Basics</h2>
      </div>

      {/* Avatar */}
      <div className="relative w-16 h-16">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-[#EDEBE6] border border-[#D8D5CC]">
          {data.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.avatar}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          ) : null}
        </div>
        <label className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-white border border-[#D8D5CC] flex items-center justify-center cursor-pointer hover:bg-black/5 transition-colors">
          <Camera className="h-3 w-3 text-[#4A4640]" strokeWidth={1.75} />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => onChange("avatar", reader.result as string);
              reader.readAsDataURL(file);
            }}
          />
        </label>
      </div>

      {/* Full Name */}
      <Field label="Full Name">
        <input
          type="text"
          value={data.fullName}
          onChange={(e) => onChange("fullName", e.target.value)}
          className={inputClass}
          placeholder="Ankon Chowdhury"
        />
      </Field>

      {/* Headline */}
      <Field label="Headline">
        <input
          type="text"
          value={data.headline}
          onChange={(e) => onChange("headline", e.target.value)}
          className={inputClass}
          placeholder="Full Stack Developer"
        />
      </Field>

      {/* Email + Website */}
      <div className="grid grid-cols-2 gap-3">
        <Field label="Email">
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            className={inputClass}
            placeholder="you@example.com"
          />
        </Field>
        <Field label="Website">
          <input
            type="url"
            value={data.website}
            onChange={(e) => onChange("website", e.target.value)}
            className={inputClass}
            placeholder="https://..."
          />
        </Field>
      </div>

      {/* Phone + Location */}
      <div className="grid grid-cols-2 gap-3">
        <Field label="Phone">
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className={inputClass}
            placeholder="8801XXXXXXXXX"
          />
        </Field>
        <Field label="Location">
          <input
            type="text"
            value={data.location}
            onChange={(e) => onChange("location", e.target.value)}
            className={inputClass}
            placeholder="Dhaka, Bangladesh"
          />
        </Field>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold text-[#1C1B19]">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-md border border-[#D8D5CC] bg-white px-3 py-2.5 text-sm text-[#1C1B19] outline-none focus:border-[#B08968] transition-colors";

// Default empty state — import this in CVBuilder to initialize
export const defaultBasicsData: BasicsData = {
  fullName: "",
  headline: "",
  email: "",
  website: "",
  phone: "",
  location: "",
  avatar: null,
};
