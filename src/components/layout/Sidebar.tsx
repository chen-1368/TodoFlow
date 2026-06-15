import {
  LayoutDashboard,
  ListTodo,
  PlusCircle,
  CheckCircle2,
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  onCreateTask: () => void;
}

export function Sidebar({ onCreateTask }: SidebarProps) {
  const navItems = [
    { icon: LayoutDashboard, label: "仪表盘", path: "/" },
    { icon: ListTodo, label: "任务列表", path: "/tasks" },
    { icon: CheckCircle2, label: "已完成", path: "/completed" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-xl font-bold text-primary-600 flex items-center gap-2">
          <ListTodo className="w-6 h-6" />
          TodoFlow
        </h1>
      </div>

      <button
        onClick={onCreateTask}
        className="m-4 px-4 py-3 bg-primary-600 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-primary-700 transition-colors shadow-sm hover:shadow-md"
      >
        <PlusCircle className="w-5 h-5" />
        创建任务
      </button>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary-50 text-primary-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
