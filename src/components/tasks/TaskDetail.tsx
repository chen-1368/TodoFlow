import {
  CheckCircle,
  Circle,
  Calendar,
  MessageSquare,
  Plus,
  Trash2,
  Edit3,
} from "lucide-react";
import type { Task, Priority, TaskStatus } from "../../types";
import { Button } from "../ui/Button";
import { useState } from "react";

interface TaskDetailProps {
  task: Task;
  onClose: () => void;
  onComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onUpdate: (taskId: string, updates: Partial<Task>) => void;
  onToggleSubtask: (taskId: string, subtaskId: string) => void;
  onEdit: () => void;
}

export function TaskDetail({
  task,
  onClose,
  onComplete,
  onDelete,
  onUpdate,
  onEdit,
}: TaskDetailProps) {
  const [newComment, setNewComment] = useState("");

  const priorityStyles = {
    high: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
    medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    low: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  };

  const statusStyles = {
    pending: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400",
    "in-progress": "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    completed: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
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
    if (!dateStr) return "未设置";
    return new Date(dateStr).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const updatedComments = [
        ...(task.comments || []),
        {
          id: `comment-${Date.now()}`,
          content: newComment.trim(),
          task_id: task.id,
          user_id: "user-1",
          created_at: new Date().toISOString(),
        },
      ];
      onUpdate(task.id, { comments: updatedComments });
      setNewComment("");
    }
  };

  return (
    <div className="fixed inset-0 z-40">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute right-0 top-0 bottom-0 w-[480px] bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 shadow-xl flex flex-col animate-slide-in">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">任务详情</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex items-start gap-3">
            <button
              onClick={() => onComplete(task.id)}
              className="mt-0.5 flex-shrink-0"
            >
              {task.status === "completed" ? (
                <CheckCircle className="w-6 h-6 text-accent-500" />
              ) : (
                <Circle className="w-6 h-6 text-gray-300 dark:text-gray-600 hover:text-accent-500 dark:hover:text-accent-400 transition-colors" />
              )}
            </button>

            <div className="flex-1">
              <h3
                className={`text-xl font-semibold ${task.status === "completed" ? "line-through text-gray-400 dark:text-gray-500" : "text-gray-900 dark:text-gray-100"}`}
              >
                {task.title}
              </h3>

              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${priorityStyles[task.priority as Priority]}`}
                >
                  {priorityLabels[task.priority as Priority]}
                </span>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[task.status as TaskStatus]}`}
                >
                  {statusLabels[task.status as TaskStatus]}
                </span>
              </div>
            </div>
          </div>

          {task.description && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">描述</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{task.description}</p>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              截止日期: {formatDate(task.due_date)}
            </span>
          </div>

          {task.comments && task.comments.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                备注 ({task.comments.length})
              </h4>
              <div className="space-y-3">
                {task.comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300">{comment.content}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {new Date(comment.created_at).toLocaleString("zh-CN")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="添加备注..."
                onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Button size="sm" onClick={handleAddComment}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex gap-3">
          <Button variant="outline" onClick={onEdit}>
            <Edit3 className="w-4 h-4 mr-1" />
            编辑
          </Button>
          <Button variant="danger" onClick={() => onDelete(task.id)}>
            <Trash2 className="w-4 h-4 mr-1" />
            删除
          </Button>
        </div>
      </div>
    </div>
  );
}
