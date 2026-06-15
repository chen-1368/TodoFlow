import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

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
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar onCreateTask={onCreateTask} />
      <div className="ml-64">
        <div className="sticky top-0 z-10 bg-gray-50/80 backdrop-blur-sm">
          <Header title={title} onSearch={onSearch} />
        </div>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
