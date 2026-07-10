import { Card } from "../components/ui/card";
import { useMemo } from "react";

export default function Settings() {
  const notes = useMemo(
    () => JSON.parse(localStorage.getItem("notes")) || [],
    [],
  );

  const resources = useMemo(
    () => JSON.parse(localStorage.getItem("resources")) || [],
    [],
  );

  const history = useMemo(
    () => JSON.parse(localStorage.getItem("history")) || [],
    [],
  );

  const chatHistory = useMemo(
    () => JSON.parse(localStorage.getItem("chatHistory")) || [],
    [],
  );

  return (
    <div className="h-[calc(100vh-100px)] overflow-y-auto">
      <h1 className="text-4xl font-bold text-white">Settings</h1>

      <p className="text-slate-400 mt-2 mb-10">
        Manage your LabGen AI experience and application preferences.
      </p>
      <div className="max-w-4xl mx-auto px-6 pb-10">
        {/* Appearance */}

        <Card className="bg-slate-900 border-slate-800 rounded-3xl p-5 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">🎨 Appearance</h2>

          <p className="text-slate-400 mb-6">Choose how LabGen AI looks.</p>

          <div className="grid grid-cols-3 gap-5">
            <button className="border border-slate-700 rounded-2xl py-4 px-2 bg-slate-950 hover:border-violet-500 transition">
              <div className="text-3xl mb-4">☀️</div>

              <h3 className="text-white font-semibold">Light</h3>

              <p className="text-slate-500 text-sm mt-2">Coming Soon</p>
            </button>

            <button className="border-2 border-violet-500 rounded-2xl py-4 px-2 bg-slate-800">
              <div className="text-3xl mb-4">🌙</div>

              <h3 className="text-white font-semibold">Dark</h3>

              <p className="text-violet-400 text-sm mt-2">Active</p>
            </button>

            <button className="border border-slate-700 rounded-2xl py-4 px-2 bg-slate-950 hover:border-violet-500 transition">
              <div className="text-3xl mb-4">💻</div>

              <h3 className="text-white font-semibold">System</h3>

              <p className="text-slate-500 text-sm mt-2">Coming Soon</p>
            </button>
          </div>
        </Card>

        {/* AI Preferences */}

        <Card className="bg-slate-900 border-slate-800 rounded-3xl p-5 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            🤖 AI Preferences
          </h2>

          <div className="space-y-6">
            <div>
              <label className="text-white font-semibold">Response Style</label>

              <select className="mt-3 w-full rounded-xl bg-slate-800 border border-slate-700 text-white p-3">
                <option>Balanced</option>

                <option>Concise</option>

                <option>Detailed</option>
              </select>
            </div>

            <div>
              <label className="text-white font-semibold">Output Format</label>

              <select className="mt-3 w-full rounded-xl bg-slate-800 border border-slate-700 text-white p-3">
                <option>Rich Text</option>

                <option>Markdown</option>

                <option>Plain Text</option>
              </select>
            </div>

            <div>
              <div>
                <label className="text-white font-semibold">Language</label>

                <div className="mt-3 rounded-xl bg-slate-800 border border-slate-700 p-3 text-white">
                  English
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Notes */}

        <Card className="bg-slate-900 border-slate-800 rounded-3xl p-8 max-w-5xl mx-auto mt-8">
          <h2 className="text-3xl font-bold text-white mb-8">📝 Notes</h2>

          <div className="space-y-6">
            <label className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-semibold">Auto Save Notes</h3>

                <p className="text-slate-400 text-sm">
                  Automatically save changes while editing.
                </p>
              </div>

              <input type="checkbox" defaultChecked />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-semibold">
                  Restore Last Open Note
                </h3>

                <p className="text-slate-400 text-sm">
                  Open your previous note when LabGen AI starts.
                </p>
              </div>

              <input type="checkbox" defaultChecked />
            </label>
          </div>
        </Card>

        {/* Lab Manuals */}

        <Card className="bg-slate-900 border-slate-800 rounded-3xl p-8 max-w-5xl mx-auto mt-8">
          <h2 className="text-3xl font-bold text-white mb-8">📄 Lab Manuals</h2>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-white font-semibold">
                Default Difficulty
              </label>

              <select className="w-full mt-3 rounded-xl bg-slate-800 border border-slate-700 text-white p-3">
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            <div>
              <label className="text-white font-semibold">Export Format</label>

              <select className="w-full mt-3 rounded-xl bg-slate-800 border border-slate-700 text-white p-3">
                <option>PDF</option>
                <option>DOCX</option>
                <option>Markdown</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Storage */}

        <Card className="bg-slate-900 border-slate-800 rounded-3xl p-8 max-w-5xl mx-auto mt-8">
          <h2 className="text-3xl font-bold text-white mb-8">💾 Storage</h2>

          <div className="space-y-4">
            <div className="flex justify-between text-lg">
              <span className="text-slate-400">Notes</span>
              <span className="text-white font-bold">{notes.length}</span>
            </div>

            <div className="flex justify-between text-lg">
              <span className="text-slate-400">Resources</span>
              <span className="text-white font-bold">{resources.length}</span>
            </div>

            <div className="flex justify-between text-lg">
              <span className="text-slate-400">Lab Manuals</span>
              <span className="text-white font-bold">{history.length}</span>
            </div>

            <div className="flex justify-between text-lg">
              <span className="text-slate-400">AI Chats</span>
              <span className="text-white font-bold">{chatHistory.length}</span>
            </div>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="bg-slate-900 border-red-900 rounded-3xl p-8 max-w-5xl mx-auto mt-8">
          <h2 className="text-3xl font-bold text-red-600 mb-2">
            🗑 Danger Zone
          </h2>

          <p className="text-slate-400 mb-8">These actions cannot be undone.</p>

          <div className="flex gap-8 flex-wrap text-white text-md">
            <button
              variant="destructive"
              className="px-4 py-2 text-md bg-red-800 hover:bg-red-900 rounded-2xl"
            >
              Delete All Notes
            </button>

            <button
              variant="destructive"
              className="px-4 py-2 text-md bg-red-800 hover:bg-red-900 rounded-2xl"
            >
              Clear Chat History
            </button>

            <button
              variant="destructive"
              className="px-4 py-2 text-md bg-red-800 hover:bg-red-900 rounded-2xl"
            >
              Reset Application
            </button>
          </div>
        </Card>

        <div className="max-w-4xl mx-auto mt-10 mb-20 flex justify-end">
          <button className="bg-violet-600 hover:bg-violet-700 px-8 py-3 rounded-2xl text-lg font-bold text-white">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
