import { useState, useEffect } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import RichTextEditor from "../app/RichTextEditor";
import {
  improveNotes,
  summarizeNotes,
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../services/api";
// import { getNotes } from "../services/notes";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const [title, setTitle] = useState("");
  const [contentHtml, setContentHtml] = useState("");
  const [contentText, setContentText] = useState("");

  const [search, setSearch] = useState("");

  const [improving, setImproving] = useState(false);
  const [summarizing, setSummarizing] = useState(false);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async (selected = null) => {
    const res = await getNotes();

    setNotes(res.data);

    if (res.data.length === 0) return;

    let note;

    if (selected) {
      note = res.data.find((n) => n.id === selected);
    }

    if (!note) {
      note = res.data[0];
    }

    setSelectedId(note.id);
    setTitle(note.title);
    setContentHtml(note.contentHtml || "");
    setContentText(note.contentText || "");
  };

  const handleNewNote = async () => {
    const res = await createNote({
      title: "Untitled",
      content: "",
    });

    await loadNotes(res.data.id);
  };

  useEffect(() => {
    if (!selectedId) return;

    const timeout = setTimeout(async () => {
      try {
        await updateNote(selectedId, {
          title,
          content: contentHtml,
        });

        setNotes((prev) =>
          prev.map((note) =>
            note.id === selectedId
              ? {
                  ...note,
                  title,
                  content: contentHtml,
                }
              : note,
          ),
        );
      } catch (err) {
        console.error(err);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [selectedId, title, contentHtml]);

  const handleSelectNote = (note) => {
    setSelectedId(note.id);
    setTitle(note.title);
    setContentHtml(note.content || "");
    setContentText(note.content || "");
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = async () => {
    if (!selectedId) return;

    if (!window.confirm("Delete this note?")) return;

    await deleteNote(selectedId);

    await loadNotes();
  };

  const handleImprove = async () => {
    if (!contentText.trim()) return;

    setImproving(true);

    try {
      const data = await improveNotes(contentText);
      setContentHtml(data.result);
    } finally {
      setImproving(false);
    }
  };

  const handleSummarize = async () => {
    if (!contentText.trim()) return;

    setSummarizing(true);

    try {
      const data = await summarizeNotes(contentText);
      setContentHtml(data.result);
    } finally {
      setSummarizing(false);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-6 h-[calc(100vh-100px)]">
      {/* Sidebar */}
      <Card className="col-span-1 bg-slate-900 border-slate-800 rounded-3xl p-5 flex flex-col">
        <Button className="mb-5 bg-slate-700" onClick={handleNewNote}>
          + New Note
        </Button>

        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="mb-4 text-white"
        />

        <div className="flex-1 overflow-y-auto space-y-2">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              onClick={() => handleSelectNote(note)}
              className={`rounded-xl p-3 cursor-pointer transition
      ${
        selectedId === note.id
          ? "bg-violet-600"
          : "bg-slate-800 hover:bg-slate-700"
      }`}
            >
              <h3 className="text-white font-semibold truncate">
                {note.title}
              </h3>

              <p className="text-slate-400 text-sm">
                {new Date(note.updatedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Editor */}

      <Card className="col-span-3 bg-slate-900 border-slate-800 rounded-3xl p-6 flex flex-col h-full overflow-hidden">
        <div className="flex gap-4 mb-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title..."
            className="text-white text-xl font-semibold"
          />

          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>

        <div className="flex gap-3 mb-4">
          <Button onClick={handleImprove} disabled={improving}>
            {improving ? "Improving..." : "🎓 Rewrite Notes"}
          </Button>

          <Button onClick={handleSummarize} disabled={summarizing}>
            {summarizing ? "Summarizing..." : "✨ Summarize"}
          </Button>
        </div>

        <div className="flex-1 overflow-hidden">
          <RichTextEditor
            value={contentHtml}
            onChange={({ html, text }) => {
              setContentHtml(html);
              setContentText(text);
            }}
          />
        </div>
      </Card>
    </div>
  );
}
