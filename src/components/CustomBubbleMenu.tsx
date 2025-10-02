import React from "react";
import {
  BubbleToolbar,
  type BubbleToolbarButton,
  toggleBold,
  toggleItalic,
  toggleStrike,
  toggleLink,
  aiHelper,
  toggleBlockquote,
  setParagraph,
  toggleHeading,
  toggleBulletList,
  toggleOrderedList,
  toggleCodeBlock,
} from "kalidas";

import {
  BsTypeBold,
  BsTypeItalic,
  BsTypeStrikethrough,
  BsLink,
} from "react-icons/bs";
import { GiSparkles } from "react-icons/gi";
import { FaQuoteRight } from "react-icons/fa";
import { LuHeading1, LuHeading2, LuHeading3 } from "react-icons/lu";
import { RiListOrdered, RiListUnordered, RiText } from "react-icons/ri";
import { VscCode } from "react-icons/vsc";

export const CustomBubbleMenu: React.FC = () => {
  const fetchAIResponse = async (
    type: "generate" | "regenerate" | "continue"
  ) => {
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }), // pass type to backend
      });

      const data = await res.json();
      return data.text; // 👈 assume backend returns { text: "..." }
    } catch (error) {
      console.error("AI fetch failed:", error);
      return "⚠️ Failed to fetch AI response.";
    }
  };
  const buttons: BubbleToolbarButton[] = [
    {
      label: <BsTypeBold />,
      tooltip: "Bold",
      command: (editor) => toggleBold(editor),
      isActive: (editor) => editor.isActive("bold"),
    },
    {
      label: <BsTypeItalic />,
      tooltip: "Italic",
      command: (editor) => toggleItalic(editor),
      isActive: (editor) => editor.isActive("italic"),
    },
    {
      label: <BsTypeStrikethrough />,
      tooltip: "Strike-through",
      command: (editor) => toggleStrike(editor),
      isActive: (editor) => editor.isActive("strike"),
    },
    {
      label: <BsLink />,
      tooltip: "Insert Link",
      command: (editor) => {
        const url = prompt("Enter URL") || "";
        toggleLink(editor, url);
      },
      isActive: (editor) => editor.isActive("link"),
    },
    {
      label: <GiSparkles />,
      tooltip: "AI Tools",
      submenu: [
        {
          label: "Generate",
          tooltip: "Generate with AI",
          command: async (editor) => {
            const text = await fetchAIResponse("generate");
            aiHelper(editor, text);
          },
        },
        {
          label: "Regenerate",
          tooltip: "Regenerate AI content",
          command: async (editor) => {
            const text = await fetchAIResponse("regenerate");
            aiHelper(editor, text);
          },
        },
        {
          label: "Continue",
          tooltip: "Continue writing with AI",
          command: async (editor) => {
            const text = await fetchAIResponse("continue");
            aiHelper(editor, text);
          },
        },
      ],
    },
    {
      label: "Turn Into",
      tooltip: "Convert text block",
      submenu: [
        {
          label: <LuHeading1 />,
          tooltip: "Heading 1",
          command: (editor) => toggleHeading(editor, 1),
          isActive: (editor) => editor.isActive("heading", { level: 1 }),
        },
        {
          label: <LuHeading2 />,
          tooltip: "Heading 2",
          command: (editor) => toggleHeading(editor, 2),
          isActive: (editor) => editor.isActive("heading", { level: 2 }),
        },
        {
          label: <LuHeading3 />,
          tooltip: "Heading 3",
          command: (editor) => toggleHeading(editor, 3),
          isActive: (editor) => editor.isActive("heading", { level: 3 }),
        },
        {
          label: <RiText />,
          tooltip: "Paragraph",
          command: (editor) => setParagraph(editor),
          isActive: (editor) => editor.isActive("paragraph"),
        },
        {
          label: <FaQuoteRight />,
          tooltip: "Blockquote",
          command: (editor) => toggleBlockquote(editor),
          isActive: (editor) => editor.isActive("blockquote"),
        },
        {
          label: <RiListUnordered />,
          tooltip: "Bullet List",
          command: (editor) => toggleBulletList(editor),
          isActive: (editor) => editor.isActive("bulletList"),
        },
        {
          label: <RiListOrdered />,
          tooltip: "Ordered List",
          command: (editor) => toggleOrderedList(editor),
          isActive: (editor) => editor.isActive("orderedList"),
        },
        {
          label: <VscCode />,
          tooltip: "Code Block",
          command: (editor) => toggleCodeBlock(editor),
          isActive: (editor) => editor.isActive("codeBlock"),
        },
      ],
    },
  ];

  return <BubbleToolbar buttons={buttons} />;
};
