export type Priority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  task_id: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  user_id: string;
}

export interface Comment {
  id: string;
  content: string;
  task_id: string;
  user_id: string;
  created_at: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  due_date?: string;
  priority: Priority;
  status: TaskStatus;
  user_id: string;
  created_at: string;
  updated_at: string;
  subtasks?: Subtask[];
  tags?: Tag[];
  comments?: Comment[];
}

export interface Filters {
  priority?: Priority;
  status?: TaskStatus;
  tagId?: string;
  search?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
}

export interface TaskStore {
  tasks: Task[];
  selectedTask: Task | null;
  filters: Filters;
  isDarkMode: boolean;
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  selectTask: (task: Task | null) => void;
  setFilters: (filters: Filters) => void;
  toggleDarkMode: () => void;
  toggleSubtask: (taskId: string, subtaskId: string) => void;
}
