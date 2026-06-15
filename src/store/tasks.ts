import { create } from 'zustand';
import type { Task, TaskStore } from '../types';

// Mock data for development
const mockTasks: Task[] = [
  {
    id: '1',
    title: '完成项目文档',
    description: '编写技术文档和API文档',
    due_date: '2026-06-20',
    priority: 'high',
    status: 'in-progress',
    user_id: 'user-1',
    created_at: '2026-06-10T10:00:00Z',
    updated_at: '2026-06-14T15:30:00Z',
  },
  {
    id: '2',
    title: '代码审查',
    description: '审查团队成员提交的PR',
    due_date: '2026-06-18',
    priority: 'medium',
    status: 'pending',
    user_id: 'user-1',
    created_at: '2026-06-12T09:00:00Z',
    updated_at: '2026-06-12T09:00:00Z',
  },
  {
    id: '3',
    title: '团队周会',
    description: '准备本周团队周会的演示材料',
    due_date: '2026-06-17',
    priority: 'low',
    status: 'pending',
    user_id: 'user-1',
    created_at: '2026-06-13T14:00:00Z',
    updated_at: '2026-06-13T14:00:00Z',
  },
  {
    id: '4',
    title: '修复登录bug',
    description: '修复用户反馈的登录页面bug',
    due_date: '2026-06-16',
    priority: 'high',
    status: 'completed',
    user_id: 'user-1',
    created_at: '2026-06-14T08:00:00Z',
    updated_at: '2026-06-15T10:30:00Z',
  },
  {
    id: '5',
    title: '更新依赖版本',
    description: '更新项目依赖到最新版本',
    priority: 'low',
    status: 'pending',
    user_id: 'user-1',
    created_at: '2026-06-15T11:00:00Z',
    updated_at: '2026-06-15T11:00:00Z',
  },
];

// 按创建时间倒序排序（最新的在前）
const sortTasksByCreatedAtDesc = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
};

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: sortTasksByCreatedAtDesc(mockTasks),
  selectedTask: null,
  filters: {},
  isDarkMode: false,

  setTasks: (tasks) => set({ tasks: sortTasksByCreatedAtDesc(tasks) }),

  addTask: (taskData) => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      comments: [],
    };
    set((state) => ({
      tasks: sortTasksByCreatedAtDesc([...state.tasks, newTask]),
    }));
  },

  updateTask: (id, updates) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? { ...task, ...updates, updated_at: new Date().toISOString() }
          : task
      ),
    }));
    // Update selectedTask if it matches
    const { selectedTask } = get();
    if (selectedTask?.id === id) {
      set({
        selectedTask: { ...selectedTask, ...updates, updated_at: new Date().toISOString() },
      });
    }
  },

  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
      selectedTask: state.selectedTask?.id === id ? null : state.selectedTask,
    }));
  },

  selectTask: (task) => set({ selectedTask: task }),

  setFilters: (filters) => set({ filters }),

  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

  toggleSubtask: (taskId) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task
            }
          : task
      ),
    }));
    // Update selectedTask if it matches
    const { selectedTask } = get();
    if (selectedTask?.id === taskId) {
      set({
        selectedTask: {
          ...selectedTask
        },
      });
    }
  },
}));
