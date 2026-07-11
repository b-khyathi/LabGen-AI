import Sidebar from "../app/Sidebar";
import Footer from "../app/Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-y-auto p-8">
        <div className="flex-1">
          <Outlet />
        </div>
        <Toaster />
        <Footer />
      </main>
    </div>
  );
}
