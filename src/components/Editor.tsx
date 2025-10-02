"use client";

import type React from "react";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { FontFamily } from "@tiptap/extension-font-family";
import { Button, Divider, Select } from "antd";
import {
  Bold,
  Italic,
  UnderlineIcon,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Undo,
  Redo,
  Type,
} from "lucide-react";

export interface TermsEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function TermsEditor({ content, onChange }: TermsEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      TextStyle,
      Color,
      FontFamily,
    ],
    content,
    onUpdate: ({ editor }) => {
      if (onChange && typeof onChange === "function") {
        onChange(editor.getHTML());
      }
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none focus:outline-none min-h-[400px] p-4",
      },
    },
  });

  if (!editor) {
    return null;
  }

  const ToolbarButton = ({
    onClick,
    isActive,
    disabled,
    children,
    title,
  }: {
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    title: string;
  }) => (
    <Button
      type={isActive ? "primary" : "text"}
      size="small"
      onClick={onClick}
      disabled={disabled}
      title={title}
      icon={children}
      style={{ width: 32, height: 32, padding: 0 }}
    />
  );

  const characterCount = editor.state.doc.textContent.length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {/* Toolbar */}
      <div
        style={{
          border: "1px solid #d9d9d9",
          borderRadius: "8px",
          padding: "8px",
          backgroundColor: "#fafafa",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "4px",
          }}
        >
          {/* Undo/Redo */}
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Undo (Ctrl+Z)"
          >
            <Undo className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Redo (Ctrl+Y)"
          >
            <Redo className="h-4 w-4" />
          </ToolbarButton>

          <Divider
            type="vertical"
            style={{ height: "24px", margin: "0 4px" }}
          />

          {/* Text Formatting */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
            title="Bold (Ctrl+B)"
          >
            <Bold className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
            title="Italic (Ctrl+I)"
          >
            <Italic className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive("underline")}
            title="Underline (Ctrl+U)"
          >
            <UnderlineIcon className="h-4 w-4" />
          </ToolbarButton>

          <Divider
            type="vertical"
            style={{ height: "24px", margin: "0 4px" }}
          />

          {/* Headings */}
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            isActive={editor.isActive("heading", { level: 1 })}
            title="Heading 1"
          >
            <Heading1 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            isActive={editor.isActive("heading", { level: 2 })}
            title="Heading 2"
          >
            <Heading2 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            isActive={editor.isActive("heading", { level: 3 })}
            title="Heading 3"
          >
            <Heading3 className="h-4 w-4" />
          </ToolbarButton>

          <Divider
            type="vertical"
            style={{ height: "24px", margin: "0 4px" }}
          />

          {/* Lists */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </ToolbarButton>

          <Divider
            type="vertical"
            style={{ height: "24px", margin: "0 4px" }}
          />

          {/* Font Size */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Type className="h-4 w-4" style={{ color: "#8c8c8c" }} />
            <Select
              defaultValue="16"
              style={{ width: 80 }}
              size="small"
              onChange={(value) => {
                // Apply font size to selection
                editor
                  .chain()
                  .focus()
                  .setMark("textStyle", { fontSize: `${value}px` })
                  .run();
              }}
              options={[
                { value: "12", label: "12px" },
                { value: "14", label: "14px" },
                { value: "16", label: "16px" },
                { value: "18", label: "18px" },
                { value: "20", label: "20px" },
                { value: "24", label: "24px" },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Editor */}
      <div
        style={{
          border: "1px solid #d9d9d9",
          borderRadius: "8px",
          backgroundColor: "#ffffff",
        }}
      >
        <EditorContent editor={editor} />
      </div>

      {/* Character count */}
      <div style={{ fontSize: "14px", color: "#8c8c8c" }}>
        Characters: {characterCount.toLocaleString()}
      </div>
    </div>
  );
}
