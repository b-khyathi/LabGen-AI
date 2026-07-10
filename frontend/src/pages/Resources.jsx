import { useState, useRef, useEffect } from "react";

import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export default function Resources() {
  const [search, setSearch] = useState("");

  const mockResources = [
    {
      id: 1,
      name: "Operating Systems.pdf",
      type: "PDF",
      size: "2.4 MB",
      uploaded: "09 July 2026",
      category: "Operating Systems",
      description:
        "Notes covering processes, scheduling, deadlocks and memory management.",
    },
    {
      id: 2,
      name: "DBMS Notes.docx",
      type: "DOCX",
      size: "860 KB",
      uploaded: "08 July 2026",
      category: "Database Management",
      description: "Database concepts, ER models, normalization and SQL.",
    },
  ];

  const [selectedResource, setSelectedResource] = useState(mockResources[0]);

  const [resources, setResources] = useState(mockResources);

  useEffect(() => {
    localStorage.setItem("resources", JSON.stringify(resources));
  }, [resources]);

  const fileInputRef = useRef(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const extension = file.name.split(".").pop().toUpperCase();

    const newResource = {
      id: Date.now(),
      name: file.name,
      file,
      url: URL.createObjectURL(file),

      type: extension,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,

      uploaded: new Date().toLocaleDateString(),

      category: "Uncategorized",

      description: "Uploaded study material.",
    };

    setResources((prev) => [newResource, ...prev]);

    setSelectedResource(newResource);
  };

  const filteredResources = resources.filter((resource) =>
    resource.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleOpen = () => {
    if (!selectedResource?.url) {
      alert("Preview is only available for uploaded files.");
      return;
    }

    window.open(selectedResource.url, "_blank");
  };

  const handleDelete = () => {
    if (!selectedResource) return;

    if (!window.confirm("Delete this resource?")) return;

    const updated = resources.filter(
      (resource) => resource.id !== selectedResource.id,
    );

    setResources(updated);

    if (updated.length > 0) {
      setSelectedResource(updated[0]);
    } else {
      setSelectedResource(null);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-6 h-[calc(100vh-100px)]">
      {/* Sidebar */}

      <Card className="col-span-1 bg-slate-900 border-slate-800 rounded-3xl p-5 flex flex-col">
        <>
          <input
            type="file"
            ref={fileInputRef}
            hidden
            onChange={handleUpload}
          />

          <Button
            className="mb-5 bg-slate-700"
            onClick={() => fileInputRef.current.click()}
          >
            + Upload Resource
          </Button>
        </>

        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="mb-4 text-white"
        />

        <div className="flex-1 overflow-y-auto space-y-3">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              onClick={() => setSelectedResource(resource)}
              className={`rounded-xl p-4 cursor-pointer transition
        ${
          selectedResource.id === resource.id
            ? "bg-violet-600"
            : "bg-slate-800 hover:bg-slate-700"
        }`}
            >
              <h3 className="text-white font-semibold">{resource.name}</h3>

              <p className="text-slate-300 text-sm">
                {resource.type} • {resource.size}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Right Side */}

      <Card className="col-span-3 bg-slate-900 border-slate-800 rounded-3xl p-8 flex flex-col">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Resources</h1>

            <p className="text-slate-400 mt-2">
              Upload PDFs, Word documents, presentations and other study
              materials.
            </p>
          </div>
        </div>

        <div className="mt-10 flex-1 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {selectedResource.name}
              </h2>

              <p className="text-slate-400 mt-2">
                {selectedResource.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <Card className="bg-slate-800 border-slate-700 p-4">
                <p className="text-slate-400">Type</p>

                <p className="text-white font-semibold">
                  {selectedResource.type}
                </p>
              </Card>

              <Card className="bg-slate-800 border-slate-700 p-4">
                <p className="text-slate-400">Size</p>

                <p className="text-white font-semibold">
                  {selectedResource.size}
                </p>
              </Card>

              <Card className="bg-slate-800 border-slate-700 p-4">
                <p className="text-slate-400">Uploaded</p>

                <p className="text-white font-semibold">
                  {selectedResource.uploaded}
                </p>
              </Card>

              <Card className="bg-slate-800 border-slate-700 p-4">
                <p className="text-slate-400">Category</p>

                <p className="text-white font-semibold">
                  {selectedResource.category}
                </p>
              </Card>
            </div>

            <div className="flex gap-4 pt-4">
              <Button onClick={handleOpen}>📖 Open Resource</Button>

              <Button variant="destructive" onClick={handleDelete}>
                🗑 Delete
              </Button>

              <Button disabled className="bg-violet-600 hover:bg-violet-700">
                🤖 Ask AI (Coming Soon)
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
