import { useEffect, useRef, useState } from "react";
import Editor from "react-simple-wysiwyg";
import API from "../utils/axios";
import Home from "../pages/Home";

const EditorShell = ({ selectedPage, setPages, setSelectedPage }) => {
  const saveTimer = useRef(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("Saved");

  /* =========================
     Load page on switch
     ========================= */
  useEffect(() => {
    if (!selectedPage) return;

    setTitle(selectedPage.title || "");
    setContent(selectedPage.content || "");
    setStatus("Saved");

    clearTimeout(saveTimer.current);
  }, [selectedPage?._id]);

  /* =========================
     Autosave (debounced)
     ========================= */
  useEffect(() => {
    if (!selectedPage) return;

    setStatus("Saving...");
    clearTimeout(saveTimer.current);

    saveTimer.current = setTimeout(async () => {
      try {
        await API.put(`/pages/${selectedPage._id}`, {
          title,
          content,
        });

        setPages((prev) =>
          prev.map((p) =>
            p._id === selectedPage._id
              ? { ...p, title, content }
              : p
          )
        );

        setStatus("Saved");
      } catch {
        setStatus("Error saving");
      }
    }, 800);

    return () => clearTimeout(saveTimer.current);
  }, [title, content]);

  /* =========================
     HOME VIEW
     ========================= */
  if (!selectedPage) {
    return <Home onSelectPage={setSelectedPage} />;
  }

  /* =========================
     EDITOR VIEW
     ========================= */
 return (
  <div className="h-full overflow-y-auto bg-gray-100">
    <div className="mx-auto max-w-4xl px-6 py-6">
      
      {/* Status */}
      <div className="mb-3 flex justify-end">
        <span
          className={`text-xs ${
            status === "Saved"
              ? "text-green-600"
              : status === "Saving..."
              ? "text-gray-400"
              : "text-red-500"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Writing surface */}
      <div className="rounded-lg bg-white border shadow-sm px-5 py-5">

        {/* Title */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled"
          className="
            mb-4 w-full bg-transparent
            text-3xl font-semibold text-gray-900
            outline-none placeholder-gray-300
          "
        />

        {/* Divider */}
        <div className="mb-4 h-px bg-gray-200" />

        {/* Editor */}
        <Editor
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="
            min-h-65
            text-base leading-relaxed
          "
        />
      </div>
    </div>
  </div>
);

};

export default EditorShell;
