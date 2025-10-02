import { Editor } from "kalidas";
import "kalidas/dist/kalidas.css";
import { CustomBubbleMenu } from "./components/CustomBubbleMenu";
import { ImageNode,type NodeAsExtension, type ImageNodeOptions } from "kalidas";
export default function App() {
  const mockUpload = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      console.log("Uploading file:", file);
      
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  return (
    <div className="p-4 space-y-4">
      <h1>My Editor</h1>

      <Editor
        placeholder="Start typing..."
        extensions={[
          ImageNode.configure({
            upload: mockUpload,
          }) as unknown as NodeAsExtension<ImageNodeOptions>, // <-- cast here
        ]}
      >
        <CustomBubbleMenu />
      </Editor>
    </div>
  );
}
