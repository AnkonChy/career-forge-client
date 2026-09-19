"use client";

import {
  Bold,
  Italic,
  Strikethrough,
  Underline,
  Link as LinkIcon,
  Code,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Heading1,
  Heading2,
  Heading3,
  Pilcrow,
} from "lucide-react";

interface RichTextToolbarProps {
  onInsertSymbol?: (before: string, after?: string) => void;
}

export function RichTextToolbar({ onInsertSymbol }: RichTextToolbarProps) {
  const insert = (before: string, after: string = "") => {
    if (onInsertSymbol) {
      onInsertSymbol(before, after);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-1 border border-[#D8D5CC] border-b-0 bg-[#FBFBFA] px-2 py-1.5 rounded-t-md text-[#4A4640]">
      <button
        type="button"
        onClick={() => insert("**", "**")}
        className="p-1 rounded hover:bg-black/5 transition-colors"
        title="Bold"
      >
        <Bold size={14} />
      </button>

      <button
        type="button"
        onClick={() => insert("*", "*")}
        className="p-1 rounded hover:bg-black/5 transition-colors"
        title="Italic"
      >
        <Italic size={14} />
      </button>

      <button
        type="button"
        onClick={() => insert("~~", "~~")}
        className="p-1 rounded hover:bg-black/5 transition-colors"
        title="Strikethrough"
      >
        <Strikethrough size={14} />
      </button>

      <button
        type="button"
        onClick={() => insert("<u>", "</u>")}
        className="p-1 rounded hover:bg-black/5 transition-colors"
        title="Underline"
      >
        <Underline size={14} />
      </button>

      <div className="w-px h-4 bg-[#D8D5CC] mx-1" />

      <button
        type="button"
        onClick={() => insert("[", "](url)")}
        className="p-1 rounded hover:bg-black/5 transition-colors"
        title="Link"
      >
        <LinkIcon size={14} />
      </button>

      <button
        type="button"
        onClick={() => insert("`", "`")}
        className="p-1 rounded hover:bg-black/5 transition-colors"
        title="Code"
      >
        <Code size={14} />
      </button>

      <div className="w-px h-4 bg-[#D8D5CC] mx-1" />

      <button
        type="button"
        onClick={() => insert("# ")}
        className="p-1 rounded hover:bg-black/5 transition-colors"
        title="Heading 1"
      >
        <Heading1 size={14} />
      </button>

      <button
        type="button"
        onClick={() => insert("## ")}
        className="p-1 rounded hover:bg-black/5 transition-colors"
        title="Heading 2"
      >
        <Heading2 size={14} />
      </button>

      <button
        type="button"
        onClick={() => insert("### ")}
        className="p-1 rounded hover:bg-black/5 transition-colors"
        title="Heading 3"
      >
        <Heading3 size={14} />
      </button>

      <button
        type="button"
        onClick={() => insert("\n")}
        className="p-1 rounded hover:bg-black/5 transition-colors"
        title="Paragraph"
      >
        <Pilcrow size={14} />
      </button>

      <div className="w-px h-4 bg-[#D8D5CC] mx-1" />

      <button
        type="button"
        className="p-1 rounded hover:bg-black/5 transition-colors"
        title="Align Left"
      >
        <AlignLeft size={14} />
      </button>

      <button
        type="button"
        className="p-1 rounded hover:bg-black/5 transition-colors"
        title="Align Center"
      >
        <AlignCenter size={14} />
      </button>

      <button
        type="button"
        className="p-1 rounded hover:bg-black/5 transition-colors"
        title="Align Right"
      >
        <AlignRight size={14} />
      </button>

      <div className="w-px h-4 bg-[#D8D5CC] mx-1" />

      <button
        type="button"
        onClick={() => insert("\n- ")}
        className="p-1 rounded hover:bg-black/5 transition-colors"
        title="Bullet List"
      >
        <List size={14} />
      </button>

      <button
        type="button"
        onClick={() => insert("\n1. ")}
        className="p-1 rounded hover:bg-black/5 transition-colors"
        title="Numbered List"
      >
        <ListOrdered size={14} />
      </button>

      <div className="w-px h-4 bg-[#D8D5CC] mx-1" />

      <button
        type="button"
        className="p-1 rounded hover:bg-black/5 transition-colors"
        title="Undo"
      >
        <Undo size={14} />
      </button>

      <button
        type="button"
        className="p-1 rounded hover:bg-black/5 transition-colors"
        title="Redo"
      >
        <Redo size={14} />
      </button>
    </div>
  );
}
