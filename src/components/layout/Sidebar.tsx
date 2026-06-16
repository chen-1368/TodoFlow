import {
  LayoutDashboard,
  ListTodo,
  PlusCircle,
  CheckCircle2,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
  onCreateTask: () => void;
}

export function Sidebar({ isOpen, isMobile, onClose, onCreateTask }: SidebarProps) {
  const navItems = [
    { icon: LayoutDashboard, label: "仪表盘", path: "/" },
    { icon: ListTodo, label: "任务列表", path: "/tasks" },
    { icon: CheckCircle2, label: "已完成", path: "/completed" },
  ];

  const handleCreateTask = () => {
    onCreateTask();
    if (isMobile) onClose();
  };

  return (
    <aside
      className={`
        w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
        flex flex-col h-screen fixed left-0 top-0 z-40
        transition-transform duration-300 ease-in-out
        ${isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}
      `}
    >
      {/* 顶部标题栏 */}
      <div className="p-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-primary-600 dark:text-primary-400 flex items-center gap-2">
          <img src="/logo.svg" alt="Logo" className="w-6 h-6" />
          TodoFlow
        </h1>
        {isMobile && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* 创建任务按钮 */}
      <button
        onClick={handleCreateTask}
        className="m-4 px-4 py-3 bg-primary-600 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-primary-700 transition-colors shadow-sm hover:shadow-md"
      >
        <PlusCircle className="w-5 h-5" />
        创建任务
      </button>

      {/* 导航链接 */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={isMobile ? onClose : undefined}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400"
                  : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700"
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
