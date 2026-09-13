"use client";

import { useState } from "react";
import { Plus, Trash2, Edit2, Languages as GlobeIcon } from "lucide-react";
import { LanguageItem } from "./types";
import { ItemModal, FormField, inputClass } from "./ItemModal";

interface LanguagesFormProps {
  items: LanguageItem[];
  onAdd: (item: LanguageItem) => void;
  onUpdate: (id: string, updated: LanguageItem) => void;
  onDelete: (id: string) => void;
  onNext?: () => void;
  onPrev?: () => void;
}

const emptyItem: Omit<LanguageItem, "id"> = {
  language: "",
  fluency: "Professional Working",
};

const FLUENCY_OPTIONS = [
  "Native / Full Professional",
  "Professional Working",
  "Limited Working / Conversational",
  "Elementary",
];

export function LanguagesForm({
  items,
  onAdd,
  onUpdate,
  onDelete,
  onNext,
  onPrev,
}: LanguagesFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<LanguageItem, "id">>(emptyItem);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData(emptyItem);
    setIsOpen(true);
  };

  const handleOpenEdit = (item: LanguageItem) => {
    setEditingId(item.id);
    setFormData({
      language: item.language,
      fluency: item.fluency,
    });
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      onUpdate(editingId, { id: editingId, ...formData });
    } else {
      onAdd({ id: `lang-${Date.now()}`, ...formData });
    }
    setIsOpen(false);
  };

  const handleDelete = () => {
    if (editingId) {
      onDelete(editingId);
      setIsOpen(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between overflow-y-auto px-5 py-5 text-[#1C1B19]">
      <div className="space-y-4">
        {/* Title */}
        <div className="flex items-center gap-2">
          <GlobeIcon size={20} className="text-[#1C1B19]" />
          <h2 className="text-xl font-bold text-[#1C1B19]">Languages</h2>
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
                  {item.language || "Untitled Language"}
                </h4>
                <p className="text-xs text-neutral-500">{item.fluency}</p>
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
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Language">
            <input
              type="text"
              value={formData.language}
              onChange={(e) => setFormData({ ...formData, language: e.target.value })}
              className={inputClass}
              placeholder="e.g. English"
            />
          </FormField>

          <FormField label="Fluency">
            <select
              value={formData.fluency}
              onChange={(e) => setFormData({ ...formData, fluency: e.target.value })}
              className={inputClass}
            >
              {FLUENCY_OPTIONS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </FormField>
        </div>
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
