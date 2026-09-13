"use client";

import { useState, useRef } from "react";
import { Plus, Trash2, Edit2, Award } from "lucide-react";
import { CertificationItem } from "./types";
import { ItemModal, FormField, inputClass } from "./ItemModal";
import { RichTextToolbar } from "./RichTextToolbar";

interface CertificationsFormProps {
  items: CertificationItem[];
  onAdd: (item: CertificationItem) => void;
  onUpdate: (id: string, updated: CertificationItem) => void;
  onDelete: (id: string) => void;
  onNext?: () => void;
  onPrev?: () => void;
}

const emptyItem: Omit<CertificationItem, "id"> = {
  name: "",
  issuer: "",
  date: "",
  url: "",
  summary: "",
};

export function CertificationsForm({
  items,
  onAdd,
  onUpdate,
  onDelete,
  onNext,
  onPrev,
}: CertificationsFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<CertificationItem, "id">>(emptyItem);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData(emptyItem);
    setIsOpen(true);
  };

  const handleOpenEdit = (item: CertificationItem) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      issuer: item.issuer,
      date: item.date,
      url: item.url,
      summary: item.summary,
    });
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      onUpdate(editingId, { id: editingId, ...formData });
    } else {
      onAdd({ id: `cert-${Date.now()}`, ...formData });
    }
    setIsOpen(false);
  };

  const handleDelete = () => {
    if (editingId) {
      onDelete(editingId);
      setIsOpen(false);
    }
  };

  const handleInsertSymbol = (before: string, after: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selection = formData.summary.substring(start, end);
    const replacement = `${before}${selection}${after}`;

    const newValue =
      formData.summary.substring(0, start) + replacement + formData.summary.substring(end);

    setFormData((prev) => ({ ...prev, summary: newValue }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        end + before.length
      );
    }, 0);
  };

  return (
    <div className="flex-1 flex flex-col justify-between overflow-y-auto px-5 py-5 text-[#1C1B19]">
      <div className="space-y-4">
        {/* Title */}
        <div className="flex items-center gap-2">
          <Award size={20} className="text-[#1C1B19]" />
          <h2 className="text-xl font-bold text-[#1C1B19]">Certifications</h2>
        </div>

        {/* List of items */}
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenEdit(item)}
              className="group flex items-center justify-between p-3.5 bg-white border border-[#D8D5CC] rounded-lg hover:border-[#B08968] cursor-pointer transition-colors shadow-sm"
            >
              <div>
                <h4 className="font-semibold text-sm text-[#1C1B19]">
                  {item.name || "Untitled Certification"}
                </h4>
                <p className="text-xs text-neutral-500">
                  {item.issuer} {item.date ? `• ${item.date}` : ""}
                </p>
              </div>

              <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenEdit(item);
                  }}
                  className="p-1.5 hover:bg-neutral-100 rounded text-neutral-600"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(item.id);
                  }}
                  className="p-1.5 hover:bg-red-50 rounded text-red-500"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}

          {/* Add item button */}
          <button
            type="button"
            onClick={handleOpenAdd}
            className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-[#D8D5CC] rounded-lg text-sm font-medium text-neutral-600 hover:border-[#B08968] hover:text-[#1C1B19] transition-colors"
          >
            <Plus size={16} />
            <span>Create a new item</span>
          </button>
        </div>
      </div>

      {/* Modal Dialog */}
      <ItemModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create a new item"
        isEditing={!!editingId}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
      >
        <FormField label="Certification Name">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputClass}
            placeholder="e.g. AWS Certified Solutions Architect"
          />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Issuer / Organization">
            <input
              type="text"
              value={formData.issuer}
              onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
              className={inputClass}
              placeholder="e.g. Amazon Web Services"
            />
          </FormField>

          <FormField label="Date Issued">
            <input
              type="text"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className={inputClass}
              placeholder="e.g. Jan 2024"
            />
          </FormField>
        </div>

        <FormField label="Credential URL">
          <input
            type="url"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            className={inputClass}
            placeholder="https://credly.com/..."
          />
        </FormField>

        <FormField label="Summary / Description">
          <RichTextToolbar onInsertSymbol={handleInsertSymbol} />
          <textarea
            ref={textareaRef}
            rows={4}
            value={formData.summary}
            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
            placeholder="Key skills or topics covered by this certification..."
            className="w-full rounded-b-md border border-[#D8D5CC] bg-white p-3 text-sm text-[#1C1B19] outline-none focus:border-[#B08968] transition-colors resize-none"
          />
        </FormField>
      </ItemModal>

      {/* Navigation buttons */}
      <div className="pt-6 flex items-center gap-3">
        {onPrev && (
          <button
            type="button"
            onClick={onPrev}
            className="flex-1 py-3 bg-[#111827] hover:bg-black text-white text-xs font-bold tracking-wider uppercase rounded transition-colors shadow-sm"
          >
            Previous
          </button>
        )}
        {onNext && (
          <button
            type="button"
            onClick={onNext}
            className="flex-1 py-3 bg-[#111827] hover:bg-black text-white text-xs font-bold tracking-wider uppercase rounded transition-colors shadow-sm"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
