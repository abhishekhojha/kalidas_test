# 📋 Kalidas Editor - Quick Reference

## 🚀 Quick Start

```tsx
import { Editor, type EditorHandle } from "kalidas";
import "kalidas/dist/kalidas.css";
import { useRef } from "react";

export default function MyEditor() {
  const editorRef = useRef<EditorHandle>(null);

  return <Editor ref={editorRef} placeholder="Start typing..." />;
}
```

## 🔧 Essential Methods

```tsx
// Get content
const html = editorRef.current?.getHTML();

// Set content  
editorRef.current?.setContent("<p>Hello World</p>");

// Clear editor
editorRef.current?.clear();

// Insert content at cursor
editorRef.current?.chain().focus().insertContent("<p>New content</p>").run();
```

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+B` | Bold |
| `Ctrl+I` | Italic |
| `Ctrl+U` | Underline |
| `Ctrl+K` | Link |
| `#` + `Space` | H1 |
| `##` + `Space` | H2 |
| `*` + `Space` | Bullet list |
| `1.` + `Space` | Number list |
| `>` + `Space` | Quote |
| `/` | Slash menu |

## 🖼️ Image Upload

```tsx
import { ImageNode, type NodeAsExtension, type ImageNodeOptions } from "kalidas";

const upload = async (file: File) => {
  // Your upload logic
  return "https://example.com/image.jpg";
};

<Editor
  extensions={[
    ImageNode.configure({ upload }) as unknown as NodeAsExtension<ImageNodeOptions>
  ]}
/>
```

## 💾 Save/Load Pattern

```tsx
const handleSave = () => {
  const content = editorRef.current?.getHTML();
  localStorage.setItem("content", content || "");
};

const handleLoad = () => {
  const saved = localStorage.getItem("content");
  if (saved) editorRef.current?.setContent(saved);
};
```

## 🎨 Custom Styling

```css
/* Import the base styles */
@import "kalidas/dist/kalidas.css";

/* Customize */
.kali-editorcontent {
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
}

.kali-editorcontent h1 {
  color: #1f2937;
  font-size: 2rem;
}
```

## 📦 All Available Exports

```tsx
import { 
  Editor,           // Main editor component
  type EditorHandle,// Editor ref type
  BubbleToolbar,    // Bubble menu component
  ImageNode,        // Image extension
  type ImageNodeOptions,
  type NodeAsExtension,
  toggleBold,       // Utility functions
  toggleItalic,
  toggleStrike,
  // ... more utilities
} from "kalidas";
```

## 🎪 Slash Commands

Type `/` in editor:
- `/h1`, `/h2`, `/h3` - Headings
- `/p` - Paragraph  
- `/ul` - Bullet list
- `/ol` - Numbered list
- `/quote` - Blockquote
- `/code` - Code block
- `/youtube` - YouTube embed
- `/twitter` - Twitter embed

## 🚨 Common Issues

**TypeScript errors with extensions?**
```tsx
// Use proper type casting
ImageNode.configure({...}) as unknown as NodeAsExtension<ImageNodeOptions>
```

**Styles not loading?**
```tsx
// Don't forget to import CSS
import "kalidas/dist/kalidas.css";
```

**Content not updating?**
```tsx
// Use ref methods, not state
editorRef.current?.setContent(newContent);  // ✅
setContent(newContent);  // ❌
```