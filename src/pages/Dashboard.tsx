import { ListTodo, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { StatsCard } from '../components/dashboard/StatsCard';
import { TaskCard } from '../components/tasks/TaskCard';
import { useTaskStore } from '../store/tasks';

interface DashboardProps {
  onTaskClick: (taskId: string) => void;
  onTaskComplete: (taskId: string) => void;
  onTaskDelete: (taskId: string) => void;
}

export function Dashboard({ onTaskClick, onTaskComplete, onTaskDelete }: DashboardProps) {
  const tasks = useTaskStore((state) => state.tasks);

  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === 'pending').length,
    inProgress: tasks.filter((t) => t.status === 'in-progress').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
  };

  const recentTasks = tasks.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="总任务数"
          value={stats.total}
          icon={<ListTodo className="w-6 h-6" />}
          color="blue"
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
          icon={<AlertCircle className="w-6 h-6" />}
          color="red"
        />
        <StatsCard
          title="已完成"
          value={stats.completed}
          icon={<CheckCircle2 className="w-6 h-6" />}
          color="green"
          trend="up"
          trendValue="本周 +12%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">最近任务</h2>
            <a href="/tasks" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              查看全部 →
            </a>
          </div>
          <div className="space-y-3">
            {recentTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onClick={() => onTaskClick(task.id)}
                onComplete={() => onTaskComplete(task.id)}
                onDelete={() => onTaskDelete(task.id)}
              />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">任务进度</h2>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">已完成</span>
                <span className="font-medium text-green-600">
                  {Math.round((stats.completed / stats.total) * 100)}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all duration-500"
                  style={{ width: `${(stats.completed / stats.total) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">进行中</span>
                <span className="font-medium text-blue-600">
                  {Math.round((stats.inProgress / stats.total) * 100)}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${(stats.inProgress / stats.total) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">待处理</span>
                <span className="font-medium text-yellow-600">
                  {Math.round((stats.pending / stats.total) * 100)}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-500 rounded-full transition-all duration-500"
                  style={{ width: `${(stats.pending / stats.total) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">本周目标</h3>
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-2">完成所有高优先级任务</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-white rounded-full overflow-hidden">
                  <div className="h-full bg-primary-500 rounded-full" style={{ width: '65%' }} />
                </div>
                <span className="text-xs font-medium text-primary-600">65%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
