import { TaskCard } from "../components/tasks/TaskCard";
import { useTaskStore } from "../store/tasks";

interface CompletedPageProps {
  onTaskClick: (taskId: string) => void;
  onTaskComplete: (taskId: string) => void;
  onTaskDelete: (taskId: string) => void;
}

export function CompletedPage({
  onTaskClick,
  onTaskComplete,
  onTaskDelete,
}: CompletedPageProps) {
  const tasks = useTaskStore((state) => state.tasks);
  const completedTasks = tasks.filter((t) => t.status === "completed");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">已完成任务</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          共 {completedTasks.length} 个已完成任务
        </span>
      </div>

      {completedTasks.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center border border-gray-200 dark:border-gray-700">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📋</span>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">暂无已完成任务</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {completedTasks.map((task) => (
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
