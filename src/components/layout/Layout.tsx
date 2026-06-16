import { useEffect, type ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useTaskStore } from "../../store/tasks";

interface LayoutProps {
  children: ReactNode;
  title: string;
  onCreateTask: () => void;
  onSearch: (query: string) => void;
}

export function Layout({
  children,
  title,
  onCreateTask,
  onSearch,
}: LayoutProps) {
  const isDarkMode = useTaskStore((state) => state.isDarkMode);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Sidebar onCreateTask={onCreateTask} />
      <div className="ml-64">
        <div className="sticky top-0 z-10 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <Header title={title} onSearch={onSearch} />
        </div>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
