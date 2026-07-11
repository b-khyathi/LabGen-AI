import { FileText, Bot, Notebook, FolderOpen } from "lucide-react";
import { useEffect, useState } from "react";
import StatCard from "../app/StatCard";
import Loading from "../app/Loading";
import { getNotes } from "../services/notes";
import { getManuals } from "../services/manuals";
import { getResources } from "../services/resources";

import {
  WandSparkles,
  BotMessageSquare,
  Upload,
  NotebookPen,
} from "lucide-react";

import ActionCard from "../app/ActionCard";
import { toast } from "sonner";

export default function Dashboard() {
  const [manualCount, setManualCount] = useState(0);
  const [chatCount, setChatCount] = useState(0);
  const [notesCount, setNotesCount] = useState(0);
  const [resourceCount, setResourceCount] = useState(0);
  const [recentManuals, setRecentManuals] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const [manualsRes, notesRes, resourcesRes] = await Promise.all([
        getManuals(),
        getNotes(),
        getResources(),
      ]);

      setManualCount(manualsRes.data.length);
      setNotesCount(notesRes.data.length);
      setResourceCount(resourcesRes.data.length);

      // Chat is still localStorage for now
      const chats = JSON.parse(localStorage.getItem("chatHistory")) || [];
      setChatCount(chats.length);

      setRecentManuals(manualsRes.data.slice(0, 3));
    } catch (err) {
      console.error(err);
      toast(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  
  return (
    <>{
          loading ? <Loading overlay={true}/> : <></>
        }
    <div className="space-y-7">
      <div className="rounded-3xl bg-linear-to-r from-violet-700 to-indigo-600 p-10">
        <h1 className="text-4xl font-bold text-white">
          Welcome back!👋
        </h1>

        <p className="text-violet-100 mt-3 text-lg">
          Ready to build your next AI-powered lab manual?
        </p>
      </div>

      <div className="grid grid-cols-4 gap-5">
        <StatCard
          title="Manuals Generated"
          value={manualCount}
          icon={<FileText className="text-blue-400" />}
          color="bg-blue-500/20"
        />

        <StatCard
          title="AI Conversations"
          value={chatCount}
          icon={<Bot className="text-violet-400" />}
        />

        <StatCard
          title="Notes"
          value={notesCount}
          icon={<Notebook className="text-pink-400" />}
          color="bg-pink-500/20"
        />

        <StatCard
          title="Resources"
          value={resourceCount}
          icon={<FolderOpen className="text-green-400" />}
          color="bg-green-500/20"
        />
      </div>
      <div className="grid grid-cols-3 gap-8 mt-10">
        <div className="col-span-2">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>

          <div className="grid grid-cols-2 gap-6">
            <ActionCard
              title="Generate Manual"
              subtitle="AI-powered lab creation"
              icon={<WandSparkles className="text-white" />}
              path="/lab-generator"
            />

            <ActionCard
              title="Ask AI"
              subtitle="Research & troubleshooting"
              color="bg-indigo-500"
              icon={<BotMessageSquare className="text-white" />}
              path="/chat"
            />

            <ActionCard
              title="Upload Resource"
              subtitle="PDFs, Datasets, Docs"
              color="bg-emerald-500"
              icon={<Upload className="text-white" />}
              path="/resources"
            />

            <ActionCard
              title="Open Notes"
              subtitle="Review your observations"
              color="bg-pink-500"
              icon={<NotebookPen className="text-white" />}
              path="/notes"
            />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-6">
            Recent Activity
          </h2>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            {recentManuals.length === 0 ? (
              <p className="text-slate-400">No recent activity.</p>
            ) : (
              recentManuals.map((manual) => (
                <div
                  key={manual.id}
                  className="border-b border-slate-800 pb-4 last:border-0"
                >
                  <p className="text-white font-semibold">{manual.title}</p>

                  <p className="text-slate-400 text-sm">{manual.subject}</p>

                  <p className="text-violet-400 text-xs mt-1">
                    {new Date(manual.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
