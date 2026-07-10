import {
  LayoutDashboard,
  FlaskConical,
  Bot,
  History,
  Notebook,
  FolderOpen,
  User,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const links = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    name: "Lab Generator",
    icon: FlaskConical,
    path: "/lab-generator",
  },
  {
    name: "AI Assistant",
    icon: Bot,
    path: "/chat",
  },
  {
    name: "Manual History",
    icon: History,
    path: "/history",
  },
  {
    name: "Notes",
    icon: Notebook,
    path: "/notes",
  },
  {
    name: "Resources",
    icon: FolderOpen,
    path: "/resources",
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`
    ${collapsed ? "w-20" : "w-64"}
    transition-all
    duration-300
    h-screen
    bg-slate-950
    border-r
    border-slate-800
    flex
    flex-col
    relative
  `}
    >
      <div className="h-20 flex items-center px-6 border-b border-slate-800">
        <div className="h-10 w-10 rounded-xl bg-violet-600 flex items-center justify-center text-white text-xl">
          🧪
        </div>

        {!collapsed && (
          <h1 className="ml-3 text-2xl font-bold text-white">LabGen AI</h1>
        )}
      </div>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className={`
absolute
top-24
-right-4
w-8
h-8
rounded-full
bg-slate-800
border
border-slate-700
flex
items-center
justify-center
hover:bg-violet-600
transition-all
`}
      >
        {collapsed ? (
          <ChevronRight size={18} className="text-white" />
        ) : (
          <ChevronLeft size={18} className="text-white" />
        )}
      </button>

      <nav className="flex-1 px-4 py-8 space-y-2">
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all
                ${
                  isActive
                    ? "bg-violet-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />

              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-5">
        <NavLink
          to="/profile"
          className="flex items-center gap-4 text-slate-300 mb-4 hover:text-white"
        >
          <User size={20} />
          {!collapsed && "Profile"}
        </NavLink>

        <NavLink
          to="/settings"
          className="flex items-center gap-4 text-slate-300 hover:text-white"
        >
          <Settings size={20} />
          {!collapsed && "Settings"}
        </NavLink>
      </div>
      <div className="border-t border-slate-800 p-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold">
            K
          </div>

          {!collapsed && (
            <div className="flex-1">
              <p className="text-white font-semibold">Khyathi</p>

              <p className="text-slate-400 text-sm">B.Tech IT</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
