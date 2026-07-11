export default function Loading({ label, overlay }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 w-full h-full ${
        overlay ? "fixed inset-0 bg-black/70 z-50" : ""
      }`}
    >
      <div className="w-12 h-12 border-4 border-slate-700 border-t-violet-500 rounded-full animate-spin" />
      {label && <p className="text-slate-400 text-sm">{label}</p>}
    </div>
  );
}
