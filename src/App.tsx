import { Editor, type EditorHandle } from "kalidas";
import "kalidas/dist/kalidas.css";
import { CustomBubbleMenu } from "./components/CustomBubbleMenu";
import { ImageNode,type NodeAsExtension, type ImageNodeOptions } from "kalidas";
import { useRef, useState, useCallback, useEffect } from "react";

export default function App() {
  const editorRef = useRef<EditorHandle>(null);
  const [content, setContent] = useState<string>("");
  const [savedContent, setSavedContent] = useState<string>("");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Initial content
  const initialContent = `
    <h1>🚀 Welcome to Kalidas Editor</h1>
    <p>This is your <strong>initial content</strong> with rich features:</p>
    <ul>
      <li>📝 Rich text editing with formatting</li>
      <li>🖼️ Image uploads with drag & drop</li>
      <li>⚡ Slash commands for quick actions</li>
      <li>💾 Save and load your work</li>
      <li>➕ Insert content at any position</li>
    </ul>
    <blockquote>
      <p><em>Try typing "/" for the command menu!</em></p>
    </blockquote>
  `;

  const mockUpload = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      console.log("Uploading file:", file);
      
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  // Handle content updates
  const handleContentUpdate = useCallback((newContent: string) => {
    setContent(newContent);
  }, []);

  // Save functionality
  const handleSave = useCallback(() => {
    if (editorRef.current) {
      const currentContent = editorRef.current.getHTML();
      setSavedContent(currentContent);
      setLastSaved(new Date());
      console.log(currentContent);
      
      localStorage.setItem("kalidas-editor-content", currentContent);
      alert("Content saved!");
    }
  }, []);

  // Load saved content
  const handleLoad = useCallback(() => {
    const saved = localStorage.getItem("kalidas-editor-content");
    if (saved && editorRef.current) {
      editorRef.current.setContent(saved);
      setSavedContent(saved);
      alert("Content loaded!");
    } else {
      alert("No saved content found!");
    }
  }, []);

  // Insert content at cursor
  const insertContent = useCallback((html: string) => {
    if (editorRef.current) {
      editorRef.current.chain().focus().insertContent(html).run();
    }
  }, []);

  // Clear all content
  const handleClear = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.clear();
    }
  }, []);

  // Set initial content
  const handleSetInitial = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.setContent(initialContent);
    }
  }, [initialContent]);

  // Load initial content on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.setContent(initialContent);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [initialContent]);

  const hasUnsavedChanges = content !== savedContent;

  return (
    <div className="p-4 space-y-4 mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Kalidas Editor</h1>
        <div className="text-sm text-gray-500">
          {lastSaved ? `Saved: ${lastSaved.toLocaleTimeString()}` : "Not saved"}
          {hasUnsavedChanges && <span className="text-orange-500 ml-2">• Unsaved</span>}
        </div>
      </div>

      {/* Control buttons */}
      <div className="flex gap-2 p-4 bg-gray-50 rounded-lg">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          💾 Save
        </button>
        
        <button
          onClick={handleLoad}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          📂 Load
        </button>
        
        <button
          onClick={handleSetInitial}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          🔄 Reset
        </button>
        
        <button
          onClick={() => insertContent('<p><strong>Inserted!</strong> This was added at cursor.</p>')}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          ➕ Insert
        </button>
        
        <button
          onClick={() => insertContent('<blockquote><p>💡 <em>Inserted quote!</em></p></blockquote>')}
          className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
        >
          💬 Quote
        </button>
        
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          🗑️ Clear
        </button>
      </div>

      {/* Editor */}
      <div className="border rounded-lg p-4 min-h-[400px]">
        <Editor
          ref={editorRef}
          placeholder="Start typing..."
          onUpdate={handleContentUpdate}
          extensions={[
            ImageNode.configure({
              upload: mockUpload,
            }) as unknown as NodeAsExtension<ImageNodeOptions>,
          ]}
        >
          <CustomBubbleMenu /> 
        </Editor>
      </div>

      {/* Content preview */}
      <details>
        <summary className="cursor-pointer font-semibold">Show HTML</summary>
        <pre className="mt-2 p-4 bg-gray-100 rounded text-sm overflow-auto">
          {content || "No content..."}
        </pre>
      </details>
    </div>
  );
}
