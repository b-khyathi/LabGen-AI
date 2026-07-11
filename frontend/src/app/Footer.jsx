export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 mt-7 py-2 mb-[-30px]">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-400">
        <p>
          © {year} <span className="text-violet-400 font-semibold">LabAI</span>.
          Built by{" "}
          <span className="text-white font-medium">Biruduganti Khyathi</span>.
          All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          <a href="/" className="hover:text-white transition-colors">
            Dashboard
          </a>
          <a href="/profile" className="hover:text-white transition-colors">
            Profile
          </a>
        </div>
      </div>
    </footer>
  );
}
