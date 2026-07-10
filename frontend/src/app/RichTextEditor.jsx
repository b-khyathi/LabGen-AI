import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

export default function RichTextEditor({ value, onChange }) {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) return;

    quillRef.current = new Quill(editorRef.current, {
      theme: "snow",
      placeholder: "Start writing your notes...",
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],

          [{ size: [] }],

          ["bold", "italic", "underline", "strike"],

          [{ color: [] }, { background: [] }],

          [{ list: "ordered" }, { list: "bullet" }],

          [{ align: [] }],

          ["blockquote", "code-block"],

          ["link"],

          ["clean"],
        ],
      },
    });

    quillRef.current.on("text-change", () => {
      onChange({
        html: quillRef.current.root.innerHTML,
        text: quillRef.current.getText().trim(),
      });
    });
  }, []);

  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      quillRef.current.clipboard.dangerouslyPasteHTML(value || "");
    }
  }, [value]);

  return (
    <div className="bg-slate-900 rounded-xl h-full flex flex-col overflow-hidden">
      <div ref={editorRef} className="h-full" />
    </div>
  );
}
