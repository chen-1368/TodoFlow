import { CheckCircle, Circle, Calendar } from "lucide-react";
import type { Task } from "../../types";

interface TaskCardProps {
  task: Task;
  onClick: () => void;
  onComplete: () => void;
  onDelete: () => void;
}

export function TaskCard({
  task,
  onClick,
  onComplete,
  onDelete,
}: TaskCardProps) {
  const priorityStyles = {
    high: "bg-red-100 text-red-600",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-green-100 text-green-700",
  };

  const statusStyles = {
    pending: "bg-gray-100 text-gray-600",
    "in-progress": "bg-blue-100 text-blue-600",
    completed: "bg-green-100 text-green-600",
  };

  const statusLabels = {
    pending: "待处理",
    "in-progress": "进行中",
    completed: "已完成",
  };

  const priorityLabels = {
    high: "高优先级",
    medium: "中优先级",
    low: "低优先级",
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return "今天";
    if (date.toDateString() === tomorrow.toDateString()) return "明天";
    return date.toLocaleDateString("zh-CN", { month: "short", day: "numeric" });
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer group ${
        task.status === "completed" ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onComplete();
          }}
          className="mt-0.5 flex-shrink-0"
        >
          {task.status === "completed" ? (
            <CheckCircle className="w-6 h-6 text-accent-500" />
          ) : (
            <Circle className="w-6 h-6 text-gray-300 hover:text-accent-500 transition-colors" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <h3
            className={`font-medium text-sm ${task.status === "completed" ? "line-through text-gray-400" : "text-gray-900"}`}
          >
            {task.title}
          </h3>

          {task.description && (
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityStyles[task.priority]}`}
            >
              {priorityLabels[task.priority]}
            </span>

            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyles[task.status]}`}
            >
              {statusLabels[task.status]}
            </span>
          </div>

          {task.due_date && (
            <div className="flex items-center gap-1 mt-3 text-xs text-gray-500">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(task.due_date)}
            </div>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="flex-shrink-0 px-3 py-1.5 text-sm text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          删除
        </button>
      </div>
    </div>
  );
}
