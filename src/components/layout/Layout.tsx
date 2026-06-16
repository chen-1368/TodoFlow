import { useEffect, useState, useCallback, type ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useTaskStore } from "../../store/tasks";

const MOBILE_BREAKPOINT = 900;

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
  const [sidebarOpen, setSidebarOpen] = useState(
    () => window.innerWidth >= MOBILE_BREAKPOINT
  );
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth < MOBILE_BREAKPOINT
  );

  // 监听窗口尺寸变化
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 暗黑模式同步
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  // 移动端打开侧栏时锁定 body 滚动
  useEffect(() => {
    if (isMobile && sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, sidebarOpen]);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Sidebar
        isOpen={sidebarOpen}
        isMobile={isMobile}
        onClose={closeSidebar}
        onCreateTask={onCreateTask}
      />

      {/* 移动端遮罩层 */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={closeSidebar}
        />
      )}

      {/* 主内容区域：桌面端有左边距，移动端无边距 */}
      <div className={`${isMobile ? "ml-0" : "ml-64"} transition-[margin] duration-300`}>
        <div className="sticky top-0 z-10 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <Header
            title={title}
            onSearch={onSearch}
            onToggleSidebar={toggleSidebar}
            isMobile={isMobile}
          />
        </div>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
