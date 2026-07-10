import { Search } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white border-b h-16 flex items-center justify-between px-6">
      <h2 className="font-semibold text-xl">Welcome to LabGen AI</h2>

      <div className="flex items-center gap-3">
        <div className="flex items-center border rounded-lg px-3 py-2">
          <Search size={18} />

          <input className="outline-none ml-2" placeholder="Search..." />
        </div>
      </div>
    </header>
  );
}
