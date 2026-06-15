import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface LayoutProps {
  children: ReactNode;
  title: string;
  onCreateTask: () => void;
  onSearch: (query: string) => void;
}

export function Layout({ children, title, onCreateTask, onSearch }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar onCreateTask={onCreateTask} />
      <div className="ml-64">
        <Header title={title} onSearch={onSearch} />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
