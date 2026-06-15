import { CheckCircle, Circle, Calendar, Tag, MessageSquare, Plus, Trash2, Edit3 } from 'lucide-react';
import type { Task, Priority, TaskStatus } from '../../types';
import { Button } from '../ui/Button';
import { useState } from 'react';

interface TaskDetailProps {
  task: Task;
  onClose: () => void;
  onComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onUpdate: (taskId: string, updates: Partial<Task>) => void;
  onToggleSubtask: (taskId: string, subtaskId: string) => void;
  onEdit: () => void;
}

export function TaskDetail({ task, onClose, onComplete, onDelete, onUpdate, onToggleSubtask, onEdit }: TaskDetailProps) {
  const [newComment, setNewComment] = useState('');

  const priorityStyles = {
    high: 'bg-red-100 text-red-600',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-green-100 text-green-700',
  };

  const statusStyles = {
    pending: 'bg-gray-100 text-gray-600',
    'in-progress': 'bg-blue-100 text-blue-600',
    completed: 'bg-green-100 text-green-600',
  };

  const statusLabels = {
    pending: '待处理',
    'in-progress': '进行中',
    completed: '已完成',
  };

  const priorityLabels = {
    high: '高优先级',
    medium: '中优先级',
    low: '低优先级',
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '未设置';
    return new Date(dateStr).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const updatedComments = [...(task.comments || []), {
        id: `comment-${Date.now()}`,
        content: newComment.trim(),
        task_id: task.id,
        user_id: 'user-1',
        created_at: new Date().toISOString(),
      }];
      onUpdate(task.id, { comments: updatedComments });
      setNewComment('');
    }
  };

  const subtaskProgress = task.subtasks?.length
    ? Math.round((task.subtasks.filter((s) => s.completed).length / task.subtasks.length) * 100)
    : 0;

  return (
    <div className="fixed inset-y-0 right-0 w-[480px] bg-white border-l border-gray-200 shadow-xl z-40 flex flex-col animate-slide-in">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">任务详情</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
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
            {task.status === 'completed' ? (
              <CheckCircle className="w-6 h-6 text-accent-500" />
            ) : (
              <Circle className="w-6 h-6 text-gray-300 hover:text-accent-500 transition-colors" />
            )}
          </button>

          <div className="flex-1">
            <h3 className={`text-xl font-semibold ${task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-900'}`}>
              {task.title}
            </h3>

            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${priorityStyles[task.priority as Priority]}`}>
                {priorityLabels[task.priority as Priority]}
              </span>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[task.status as TaskStatus]}`}>
                {statusLabels[task.status as TaskStatus]}
              </span>
            </div>
          </div>
        </div>

        {task.description && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">描述</h4>
            <p className="text-sm text-gray-600">{task.description}</p>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">截止日期: {formatDate(task.due_date)}</span>
        </div>

        {task.tags && task.tags.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <Tag className="w-4 h-4" />
              标签
            </h4>
            <div className="flex flex-wrap gap-2">
              {task.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium"
                  style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {task.subtasks && task.subtasks.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-700">子任务</h4>
              <span className="text-xs text-gray-500">{task.subtasks.filter((s) => s.completed).length}/{task.subtasks.length}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-accent-500 rounded-full transition-all duration-300"
                style={{ width: `${subtaskProgress}%` }}
              />
            </div>
            <div className="space-y-2">
              {task.subtasks.map((subtask) => (
                <div
                  key={subtask.id}
                  onClick={() => onToggleSubtask(task.id, subtask.id)}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  {subtask.completed ? (
                    <CheckCircle className="w-5 h-5 text-accent-500" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300" />
                  )}
                  <span className={`text-sm ${subtask.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                    {subtask.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {task.comments && task.comments.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              备注 ({task.comments.length})
            </h4>
            <div className="space-y-3">
              {task.comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700">{comment.content}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(comment.created_at).toLocaleString('zh-CN')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-gray-200 pt-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="添加备注..."
              onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <Button size="sm" onClick={handleAddComment}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 border-t border-gray-200 flex gap-3">
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
  );
}
