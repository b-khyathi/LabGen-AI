export default function StatCard({
  title,
  value,
  icon,
  color = "bg-violet-500/20",
}) {
  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 hover:border-violet-500 transition-all">
      <div
        className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center mb-6`}
      >
        {icon}
      </div>

      <h2 className="text-4xl font-bold text-white">{value}</h2>

      <p className="text-slate-400 mt-2">{title}</p>
    </div>
  );
}
