import { useState, useEffect, useRef } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import RichTextEditor from "../app/RichTextEditor";
import Loading from "../app/Loading";
import {
  improveNotes,
  summarizeNotes,
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../services/api";
import { toast } from "sonner";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const [title, setTitle] = useState("");
  const [contentHtml, setContentHtml] = useState("");
  const [contentText, setContentText] = useState("");

  const [search, setSearch] = useState("");

  const [saving, setSaving] = useState(false);
  const [improving, setImproving] = useState(false);
  const [summarizing, setSummarizing] = useState(false);
  const [loading, setLoading] = useState(true);

  const savedRef = useRef({ id: null, title: "", contentHtml: "" });

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async (selected = null) => {
    try {
      setLoading(true);
      const res = await getNotes();
      setNotes(res.data);

      if (res.data.length === 0) {
        selectNote(null);
        return;
      }

      let note = selected ? res.data.find((n) => n.id === selected) : null;
      if (!note) note = res.data[0];

      selectNote(note);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  const selectNote = (note) => {
    setSelectedId(note?.id ?? null);
    setTitle(note?.title ?? "");
    setContentHtml(note?.contentHtml ?? note?.content ?? "");
    setContentText(note?.contentText ?? note?.content ?? "");
    savedRef.current = {
      id: note?.id ?? null,
      title: note?.title ?? "",
      contentHtml: note?.contentHtml ?? note?.content ?? "",
    };
  };

  const isDirty = () => {
    const saved = savedRef.current;
    return (
      saved.id === selectedId &&
      (saved.title !== title || saved.contentHtml !== contentHtml)
    );
  };

  const persistNote = async () => {
    if (!selectedId) return false;

    try {
      await updateNote(selectedId, { title, content: contentHtml });

      savedRef.current = { id: selectedId, title, contentHtml };

      setNotes((prev) =>
        prev.map((n) =>
          n.id === selectedId ? { ...n, title, content: contentHtml } : n,
        ),
      );

      return true;
    } catch (err) {
      console.error(err);
      toast.error("Failed to save note");
      return false;
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const ok = await persistNote();
    setSaving(false);
    if (ok) toast.success("Note saved");
  };

  const confirmUnsavedChanges = (proceed) => {
    toast.custom(
      (t) => (
        <div className="bg-amber-50 text-black rounded-xl p-4 w-80 shadow-lg border border-slate-700">
          <p className="text-sm mb-3">
            You have unsaved changes. Save before switching?
          </p>
          <div className="flex justify-end gap-2">
            <Button size="sm" variant="ghost" onClick={() => toast.dismiss(t)}>
              Cancel
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => {
                toast.dismiss(t);
                proceed();
              }}
            >
              ✕ Discard
            </Button>
            <Button
              size="sm"
              onClick={async () => {
                toast.dismiss(t);
                setSaving(true);
                const ok = await persistNote();
                setSaving(false);
                if (ok) {
                  toast.success("Note saved");
                  proceed();
                }
              }}
            >
              ✓ Save
            </Button>
          </div>
        </div>
      ),
      { duration: Infinity },
    );
  };

  const withUnsavedCheck = (action) => {
    if (isDirty()) {
      confirmUnsavedChanges(action);
    } else {
      action();
    }
  };

  const handleSelectNote = (note) => {
    if (note.id === selectedId) return;
    withUnsavedCheck(() => selectNote(note));
  };

  const handleNewNote = () => {
    withUnsavedCheck(async () => {
      try {
        const res = await createNote({ title: "Untitled", content: "" });
        await loadNotes(res.data.id);
        toast.success("New note created");
      } catch (err) {
        console.error(err);
        toast.error("Failed to create note");
      }
    });
  };

  const filteredNotes = notes.filter((note) =>
    (note.title || "").toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = () => {
    if (!selectedId) return;

    toast("Delete this note?", {
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await deleteNote(selectedId);
            toast.success("Deleted successfully");
            await loadNotes();
          } catch (err) {
            console.error(err);
            toast.error("Failed to delete note");
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
    });
  };

  const handleImprove = async () => {
    if (!contentText.trim()) {
      toast("Nothing to improve yet");
      return;
    }

    setImproving(true);
    try {
      const data = await improveNotes(contentText);
      setContentHtml(data.result);
      toast.success("Notes improved - remember to save");
    } catch (err) {
      console.error(err);
      toast.error("Failed to improve notes");
    } finally {
      setImproving(false);
    }
  };

  const handleSummarize = async () => {
    if (!contentText.trim()) {
      toast("Nothing to summarize yet");
      return;
    }

    setSummarizing(true);
    try {
      const data = await summarizeNotes(contentText);
      setContentHtml(data.result);
      toast.success("Notes summarized - remember to save");
    } catch (err) {
      console.error(err);
      toast.error("Failed to summarize notes");
    } finally {
      setSummarizing(false);
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (isDirty()) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  });

  // if (loading) {
  //   return <Loading />;
  // }

  return (
    <> {loading && <Loading overlay />}
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
                {note.updatedAt
                  ? new Date(note.updatedAt).toLocaleDateString()
                  : ""}
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
            disabled={!selectedId}
          />

          <Button
            onClick={handleSave}
            disabled={!selectedId || saving}
            className="cursor-pointer"
          >
            {saving ? "Saving..." : "💾 Save"}
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={!selectedId}
            className="cursor-pointer"
          >
            Delete
          </Button>
        </div>

        <div className="flex gap-3 mb-4">
          <Button onClick={handleImprove} disabled={improving || !selectedId}>
            {improving ? "Improving..." : "🎓 Rewrite Notes"}
          </Button>

          <Button
            onClick={handleSummarize}
            disabled={summarizing || !selectedId}
          >
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
    </>
  );
}
