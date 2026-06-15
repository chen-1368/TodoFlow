import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Task, TaskStore } from '../types';

// 按创建时间倒序排序（最新的在前）
const sortTasksByCreatedAtDesc = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
};

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
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
                  ...task,
                }
              : task
          ),
        }));
        const { selectedTask } = get();
        if (selectedTask?.id === taskId) {
          set({
            selectedTask: {
              ...selectedTask,
            },
          });
        }
      },
    }),
    {
      name: 'todoflow-storage',
      partialize: (state) => ({
        tasks: state.tasks,
        filters: state.filters,
        isDarkMode: state.isDarkMode,
      }),
    }
  )
);
