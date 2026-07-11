import { useEffect, useRef, useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import api from "../services/api";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "Khyathi",
    email: "khyathi@example.com",
    university: "Amity University Haryana",
    course: "B.Sc. Information Technology",
    year: "3rd Year",
  });

  const fileInputRef = useRef(null);

  const [avatar, setAvatar] = useState(localStorage.getItem("avatar") || "");

  const [stats, setStats] = useState({
    manuals: 0,
    notes: 0,
    resources: 0,
    chats: 0,
  });

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    loadProfile();
    loadStats();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await api.get("/profile");

      setProfile((prev) => ({
        ...prev,
        name: res.data.name,
        email: res.data.email,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const loadStats = () => {
    const history = JSON.parse(localStorage.getItem("manualHistory")) || [];

    const notes = JSON.parse(localStorage.getItem("notes")) || [];

    const chats = JSON.parse(localStorage.getItem("chatHistory")) || [];

    const resources = JSON.parse(localStorage.getItem("resources")) || [];

    setStats({
      manuals: history.length,
      notes: notes.length,
      chats: chats.length,
      resources: resources.length,
    });
  };

  const handleAvatar = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setAvatar(reader.result);
      localStorage.setItem("avatar", reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="bg-slate-900 border-slate-800 rounded-3xl p-10">
        <div className="flex items-center gap-8">
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              hidden
              ref={fileInputRef}
              onChange={handleAvatar}
            />

            <div
              onClick={() => fileInputRef.current.click()}
              className="w-32 h-32 rounded-full bg-violet-600 overflow-hidden cursor-pointer border-4 border-violet-500"
            >
              {avatar ? (
                <img
                  src={avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-white">
                  {profile.name[0]}
                </div>
              )}
            </div>

            <button
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-0 right-0 bg-violet-600 rounded-full px-2 py-1 text-xs text-white"
            >
              📷
            </button>
          </div>

          <div>
            <h1 className="text-4xl font-bold text-white">{profile.name}</h1>

            <p className="text-slate-400 mt-2">{profile.course}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-10">
          <Input
            value={profile.email}
            className="text-white bg-slate-900 border-slate-700 focus:border-violet-500 focus:ring-violet-500"
            readOnly={!editing}
            onChange={(e) =>
              setProfile({
                ...profile,
                email: e.target.value,
              })
            }
          />

          <Input
            value={profile.university}
            className="text-white bg-slate-900 border-slate-700 focus:border-violet-500 focus:ring-violet-500"
            readOnly={!editing}
            onChange={(e) =>
              setProfile({
                ...profile,
                university: e.target.value,
              })
            }
          />

          <Input
            value={profile.course}
            className="text-white bg-slate-900 border-slate-700 focus:border-violet-500 focus:ring-violet-500"
            readOnly={!editing}
            onChange={(e) =>
              setProfile({
                ...profile,
                course: e.target.value,
              })
            }
          />

          <Input
            value={profile.year}
            className="text-white bg-slate-900 border-slate-700 focus:border-violet-500 focus:ring-violet-500"
            readOnly={!editing}
            onChange={(e) =>
              setProfile({
                ...profile,
                year: e.target.value,
              })
            }
          />
        </div>

        <div className="grid grid-cols-4 gap-5 mt-10">
          <Card className="bg-slate-800 p-5 text-center">
            <h2 className="text-3xl font-bold text-violet-400">
              {stats.manuals}
            </h2>

            <p className="text-slate-400 mt-2">Manuals</p>
          </Card>

          <Card className="bg-slate-800 p-5 text-center">
            <h2 className="text-3xl font-bold text-violet-400">
              {stats.notes}
            </h2>

            <p className="text-slate-400 mt-2">Notes</p>
          </Card>

          <Card className="bg-slate-800 p-5 text-center">
            <h2 className="text-3xl font-bold text-violet-400">
              {stats.resources}
            </h2>

            <p className="text-slate-400 mt-2">Resources</p>
          </Card>

          <Card className="bg-slate-800 p-5 text-center">
            <h2 className="text-3xl font-bold text-violet-400">
              {stats.chats}
            </h2>

            <p className="text-slate-400 mt-2">AI Chats</p>
          </Card>
        </div>

        <div className="mt-10 flex justify-end">
          <Button
            onClick={() => {
              if (editing) {
                localStorage.setItem("profile", JSON.stringify(profile));
              }

              setEditing(!editing);
            }}
          >
            {editing ? "Save Changes" : "Edit Profile"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
