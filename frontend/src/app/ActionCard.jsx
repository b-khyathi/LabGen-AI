import { NavLink } from "react-router-dom";

export default function ActionCard({
  icon,
  title,
  subtitle,
  color = "bg-violet-500",
  path,
}) {
  return (
    <NavLink
      to={path}
      className="block bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-violet-500 hover:-translate-y-1 transition-all cursor-pointer"
    >
      <div
        className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center mx-auto mb-5`}
      >
        {icon}
      </div>

      <h2 className="text-white text-2xl font-semibold text-center">{title}</h2>

      <p className="text-slate-400 text-center mt-2">{subtitle}</p>
    </NavLink>
  );
}