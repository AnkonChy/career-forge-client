"use client";

import { useEffect } from "react";
import { X, Plus } from "lucide-react";

interface ItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  isEditing?: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onDelete?: () => void;
  children: React.ReactNode;
}

export function ItemModal({
  isOpen,
  onClose,
  title = "Create a new item",
  isEditing = false,
  onSubmit,
  onDelete,
  children,
}: ItemModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px] animate-fadeIn">
      {/* Modal Container */}
      <div
        className="w-full max-w-xl bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-[#D8D5CC] text-[#1C1B19]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EDEBE6]">
          <div className="flex items-center gap-2 font-bold text-lg text-[#1C1B19]">
            {!isEditing && <Plus size={18} className="text-[#1C1B19]" />}
            <span>{isEditing ? "Edit Item" : title}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-neutral-400 hover:text-black hover:bg-black/5 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={onSubmit} className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {children}

          {/* Modal Footer / Submit Button */}
          <div className="pt-4 flex items-center justify-between border-t border-[#EDEBE6] mt-6">
            {isEditing && onDelete ? (
              <button
                type="button"
                onClick={onDelete}
                className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                Delete
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#1C1B19] hover:bg-[#333] text-white text-sm font-medium rounded-md transition-colors shadow-sm"
              >
                {isEditing ? "Save" : "Create"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export const inputClass =
  "w-full rounded-md border border-[#D8D5CC] bg-white px-3 py-2 text-sm text-[#1C1B19] outline-none focus:border-[#B08968] transition-colors";

export function FormField({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="text-xs font-semibold text-[#1C1B19] uppercase tracking-wider">{label}</label>
      {children}
    </div>
  );
}
