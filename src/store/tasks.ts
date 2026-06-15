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
    subtasks: [
      { id: 's1', title: '技术架构文档', completed: true, task_id: '1' },
      { id: 's2', title: 'API文档', completed: false, task_id: '1' },
      { id: 's3', title: '用户手册', completed: false, task_id: '1' },
    ],
    tags: [
      { id: 't1', name: '文档', color: '#3b82f6', user_id: 'user-1' },
      { id: 't2', name: '重要', color: '#ef4444', user_id: 'user-1' },
    ],
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
    subtasks: [
      { id: 's4', title: '前端代码审查', completed: false, task_id: '2' },
      { id: 's5', title: '后端代码审查', completed: false, task_id: '2' },
    ],
    tags: [
      { id: 't3', name: '审查', color: '#f59e0b', user_id: 'user-1' },
    ],
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
    tags: [
      { id: 't4', name: '会议', color: '#8b5cf6', user_id: 'user-1' },
    ],
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
    tags: [
      { id: 't5', name: 'bug', color: '#ef4444', user_id: 'user-1' },
    ],
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
    tags: [
      { id: 't6', name: '维护', color: '#10b981', user_id: 'user-1' },
    ],
  },
];

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: mockTasks,
  selectedTask: null,
  filters: {},
  isDarkMode: false,

  setTasks: (tasks) => set({ tasks }),

  addTask: (taskData) => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      subtasks: [],
      tags: [],
      comments: [],
    };
    set((state) => ({ tasks: [...state.tasks, newTask] }));
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

  toggleSubtask: (taskId, subtaskId) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks?.map((subtask) =>
                subtask.id === subtaskId
                  ? { ...subtask, completed: !subtask.completed }
                  : subtask
              ),
            }
          : task
      ),
    }));
    // Update selectedTask if it matches
    const { selectedTask } = get();
    if (selectedTask?.id === taskId) {
      set({
        selectedTask: {
          ...selectedTask,
          subtasks: selectedTask.subtasks?.map((subtask) =>
            subtask.id === subtaskId
              ? { ...subtask, completed: !subtask.completed }
              : subtask
          ),
        },
      });
    }
  },
}));
