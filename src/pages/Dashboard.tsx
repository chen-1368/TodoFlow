import { ListTodo, CheckCircle2, Clock, Play } from "lucide-react";
import { StatsCard } from "../components/dashboard/StatsCard";
import { TaskCard } from "../components/tasks/TaskCard";
import { useTaskStore } from "../store/tasks";

interface DashboardProps {
  onTaskClick: (taskId: string) => void;
  onTaskComplete: (taskId: string) => void;
  onTaskDelete: (taskId: string) => void;
}

export function Dashboard({
  onTaskClick,
  onTaskComplete,
  onTaskDelete,
}: DashboardProps) {
  const tasks = useTaskStore((state) => state.tasks);

  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  };

  const recentTasks = tasks.slice(0, 5);

  const totalHighPriorityTasks = tasks.filter(
    (t) => t.priority === "high",
  ).length;
  const completedHighPriorityTasks = tasks.filter(
    (t) => t.priority === "high" && t.status === "completed",
  ).length;
  const highPriorityProgress =
    totalHighPriorityTasks > 0
      ? Math.round((completedHighPriorityTasks / totalHighPriorityTasks) * 100)
      : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="总任务数"
          value={stats.total}
          icon={<ListTodo className="w-6 h-6" />}
          color="purple"
        />
        <StatsCard
          title="待处理"
          value={stats.pending}
          icon={<Clock className="w-6 h-6" />}
          color="yellow"
        />
        <StatsCard
          title="进行中"
          value={stats.inProgress}
          icon={<Play className="w-6 h-6" />}
          color="blue"
        />
        <StatsCard
          title="已完成"
          value={stats.completed}
          icon={<CheckCircle2 className="w-6 h-6" />}
          color="green"
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">最近任务</h2>
            <a
              href="/tasks"
              className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
            >
              查看全部 →
            </a>
          </div>
          <div className="space-y-3">
            {recentTasks.length > 0 ? (
              recentTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onClick={() => onTaskClick(task.id)}
                  onComplete={() => onTaskComplete(task.id)}
                  onDelete={() => onTaskDelete(task.id)}
                />
              ))
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ListTodo className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                  暂无任务
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  点击左侧开始创建您的第一个任务吧！
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">任务进度</h2>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600 dark:text-gray-400">已完成</span>
                <span className="font-medium text-green-600">
                  {stats.total > 0
                    ? Math.round((stats.completed / stats.total) * 100)
                    : 0}
                  %
                </span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600 dark:text-gray-400">进行中</span>
                <span className="font-medium text-blue-600">
                  {stats.total > 0
                    ? Math.round((stats.inProgress / stats.total) * 100)
                    : 0}
                  %
                </span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${stats.total > 0 ? (stats.inProgress / stats.total) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600 dark:text-gray-400">待处理</span>
                <span className="font-medium text-yellow-600">
                  {stats.total > 0
                    ? Math.round((stats.pending / stats.total) * 100)
                    : 0}
                  %
                </span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${stats.total > 0 ? (stats.pending / stats.total) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">本周目标</h3>
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-xl p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">完成所有高优先级任务</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-white dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-500 rounded-full transition-all duration-500"
                    style={{ width: `${highPriorityProgress}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-primary-600">
                  {highPriorityProgress}%
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                已完成 {completedHighPriorityTasks} / {totalHighPriorityTasks}{" "}
                个高优先级任务
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
