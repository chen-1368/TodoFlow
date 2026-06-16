import { useMemo } from "react";
import { TaskCard } from "../components/tasks/TaskCard";
import { useTaskStore } from "../store/tasks";
import { Select } from "../components/ui/Select";
import type { Priority } from "../types";

interface TaskListPageProps {
  onTaskClick: (taskId: string) => void;
  onTaskComplete: (taskId: string) => void;
  onTaskDelete: (taskId: string) => void;
}

export function TaskListPage({
  onTaskClick,
  onTaskComplete,
  onTaskDelete,
}: TaskListPageProps) {
  const tasks = useTaskStore((state) => state.tasks);
  const filters = useTaskStore((state) => state.filters);
  const setFilters = useTaskStore((state) => state.setFilters);

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    if (filters.status) {
      result = result.filter((task) => task.status === filters.status);
    }

    if (filters.priority) {
      result = result.filter((task) => task.priority === filters.priority);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(searchLower) ||
          task.description?.toLowerCase().includes(searchLower),
      );
    }

    return result;
  }, [tasks, filters]);

  const statusCounts = {
    pending: tasks.filter((t) => t.status === "pending").length,
    "in-progress": tasks.filter((t) => t.status === "in-progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-center flex-wrap">
        <div className="flex items-center gap-4 mr-4">
          <button
            onClick={() => setFilters({ ...filters, status: undefined })}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              !filters.status
                ? "bg-primary-600 border border-transparent text-white"
                : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
            }`}
          >
            全部 ({tasks.length})
          </button>
          <button
            onClick={() => setFilters({ ...filters, status: "pending" })}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filters.status === "pending"
                ? "bg-yellow-100 border border-transparent text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
            }`}
          >
            待处理 ({statusCounts.pending})
          </button>
          <button
            onClick={() => setFilters({ ...filters, status: "in-progress" })}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filters.status === "in-progress"
                ? "bg-blue-100 border border-transparent text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
            }`}
          >
            进行中 ({statusCounts["in-progress"]})
          </button>
          <button
            onClick={() => setFilters({ ...filters, status: "completed" })}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filters.status === "completed"
                ? "bg-green-100 border border-transparent text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
            }`}
          >
            已完成 ({statusCounts.completed})
          </button>
        </div>

        <div className="flex items-center gap-3">
          <Select
            value={filters.priority || ""}
            onChange={(value) =>
              setFilters({
                ...filters,
                priority: (value as Priority) || undefined,
              })
            }
            options={[
              { value: "", label: "所有优先级" },
              { value: "high", label: "高优先级" },
              { value: "medium", label: "中优先级" },
              { value: "low", label: "低优先级" },
            ]}
            placeholder="优先级"
          />
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center border border-gray-200 dark:border-gray-700">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📋</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">暂无任务</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {filters.search
              ? "没有找到匹配的任务"
              : "点击左侧按钮创建第一个任务"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() => onTaskClick(task.id)}
              onComplete={() => onTaskComplete(task.id)}
              onDelete={() => onTaskDelete(task.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
