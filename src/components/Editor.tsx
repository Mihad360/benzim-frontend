"use client";

import type React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { FontFamily } from "@tiptap/extension-font-family";

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
      FontFamily.configure({
        types: ["textStyle"],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      if (onChange && typeof onChange === "function") {
        onChange(editor.getHTML());
      }
    },
    editorProps: {
      attributes: {
        class: "editor-content",
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
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`toolbar-btn ${isActive ? "active" : ""}`}
    >
      {children}
    </button>
  );

  const characterCount = editor.state.doc.textContent.length;

  return (
    <div className="editor-container">
      {/* Toolbar */}
      <div className="toolbar">
        {/* Undo/Redo */}
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo (Ctrl+Z)"
        >
          <UndoIcon />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo (Ctrl+Y)"
        >
          <RedoIcon />
        </ToolbarButton>

        <div className="toolbar-divider"></div>

        {/* Text Formatting */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          title="Bold (Ctrl+B)"
        >
          <BoldIcon />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          title="Italic (Ctrl+I)"
        >
          <ItalicIcon />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
          title="Underline (Ctrl+U)"
        >
          <UnderlineIcon />
        </ToolbarButton>

        <div className="toolbar-divider"></div>

        {/* Headings */}
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          isActive={editor.isActive("heading", { level: 1 })}
          title="Heading 1"
        >
          <Heading1Icon />
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={editor.isActive("heading", { level: 2 })}
          title="Heading 2"
        >
          <Heading2Icon />
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          isActive={editor.isActive("heading", { level: 3 })}
          title="Heading 3"
        >
          <Heading3Icon />
        </ToolbarButton>

        <div className="toolbar-divider"></div>

        {/* Lists */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
          title="Bullet List"
        >
          <ListIcon />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
          title="Numbered List"
        >
          <ListOrderedIcon />
        </ToolbarButton>

        <div className="toolbar-divider"></div>

        {/* Font Family */}
        <div className="toolbar-group">
          <TypeIcon />
          <select
            onChange={(e) => {
              editor.chain().focus().setFontFamily(e.target.value).run();
            }}
            className="toolbar-select"
          >
            <option value="">Font Family</option>
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Georgia">Georgia</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
          </select>
        </div>

        {/* Font Size */}
        <div className="toolbar-group">
          <select
            onChange={(e) => {
              const size = e.target.value;
              if (size) {
                editor.chain().focus().setFontSize(size).run();
              } else {
                editor.chain().focus().unsetFontSize().run();
              }
            }}
            className="toolbar-select"
          >
            <option value="">Font Size</option>
            <option value="12px">12px</option>
            <option value="14px">14px</option>
            <option value="16px">16px</option>
            <option value="18px">18px</option>
            <option value="20px">20px</option>
            <option value="24px">24px</option>
            <option value="32px">32px</option>
          </select>
        </div>

        {/* Text Color */}
        <div className="toolbar-group">
          <input
            type="color"
            onChange={(e) => {
              editor.chain().focus().setColor(e.target.value).run();
            }}
            title="Text Color"
            className="color-picker"
          />
        </div>
      </div>

      {/* Editor */}
      <div className="editor-content-wrapper">
        <EditorContent editor={editor} />
      </div>

      {/* Character count */}
      <div className="character-count">
        Characters: {characterCount.toLocaleString()}
      </div>
    </div>
  );
}

// Simple SVG Icons to replace Lucide React
const BoldIcon = () => <span style={{ fontWeight: "bold" }}>B</span>;
const ItalicIcon = () => <span style={{ fontStyle: "italic" }}>I</span>;
const UnderlineIcon = () => (
  <span style={{ textDecoration: "underline" }}>U</span>
);
const Heading1Icon = () => <span style={{ fontWeight: "bold" }}>H1</span>;
const Heading2Icon = () => <span style={{ fontWeight: "bold" }}>H2</span>;
const Heading3Icon = () => <span style={{ fontWeight: "bold" }}>H3</span>;
const ListIcon = () => <span>•</span>;
const ListOrderedIcon = () => <span>1.</span>;
const UndoIcon = () => <span>↶</span>;
const RedoIcon = () => <span>↷</span>;
const TypeIcon = () => <span>A</span>;

// Add this CSS to your global styles
const styles = `
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  border: 1px solid #e0e0e0;
}

.card-header {
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
}

.card-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.card-body {
  padding: 24px;
}

.btn {
  padding: 8px 16px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.btn:hover:not(:disabled) {
  background: #f5f5f5;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: #1890ff;
  color: white;
  border-color: #1890ff;
}

.btn-primary:hover:not(:disabled) {
  background: #40a9ff;
  border-color: #40a9ff;
}

.btn-secondary {
  color: #000000d9;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #1890ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.editor-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 8px;
  background: #fafafa;
}

.toolbar-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid transparent;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.toolbar-btn:hover:not(:disabled) {
  background: #e6f7ff;
  border-color: #91d5ff;
}

.toolbar-btn.active {
  background: #1890ff;
  color: white;
  border-color: #1890ff;
}

.toolbar-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.toolbar-divider {
  width: 1px;
  height: 24px;
  background: #d9d9d9;
  margin: 0 4px;
}

.toolbar-group {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 4px;
}

.toolbar-select {
  padding: 4px 8px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background: white;
  font-size: 12px;
}

.color-picker {
  width: 32px;
  height: 32px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
}

.editor-content-wrapper {
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  background: #ffffff;
  min-height: 400px;
}

.editor-content {
  padding: 16px;
  min-height: 400px;
  outline: none;
}

.editor-content .ProseMirror {
  outline: none;
  min-height: 400px;
}

.editor-content .ProseMirror p {
  margin: 0 0 1em 0;
}

.editor-content .ProseMirror h1,
.editor-content .ProseMirror h2,
.editor-content .ProseMirror h3 {
  margin: 1em 0 0.5em 0;
  font-weight: bold;
}

.editor-content .ProseMirror h1 { font-size: 2em; }
.editor-content .ProseMirror h2 { font-size: 1.5em; }
.editor-content .ProseMirror h3 { font-size: 1.25em; }

.editor-content .ProseMirror ul,
.editor-content .ProseMirror ol {
  padding-left: 1.5em;
  margin: 0.5em 0;
}

.editor-content .ProseMirror li {
  margin: 0.25em 0;
}

.editor-content .ProseMirror u {
  text-decoration: underline;
}

.character-count {
  font-size: 14px;
  color: #8c8c8c;
  text-align: right;
}
`;

// Inject styles
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
