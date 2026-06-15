import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { TaskListPage } from './pages/TaskListPage';
import { CompletedPage } from './pages/CompletedPage';
import { SettingsPage } from './pages/SettingsPage';
import { TaskForm } from './components/tasks/TaskForm';
import { TaskDetail } from './components/tasks/TaskDetail';
import { useTaskStore } from './store/tasks';
import type { Task } from './types';

function AppContent() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const tasks = useTaskStore((state) => state.tasks);
  const selectedTask = useTaskStore((state) => state.selectedTask);
  const addTask = useTaskStore((state) => state.addTask);
  const updateTask = useTaskStore((state) => state.updateTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const selectTask = useTaskStore((state) => state.selectTask);
  const setFilters = useTaskStore((state) => state.setFilters);
  const toggleSubtask = useTaskStore((state) => state.toggleSubtask);

  const handleCreateTask = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleSubmitTask = (data: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => {
    if (editingTask) {
      updateTask(editingTask.id, data);
    } else {
      addTask(data);
    }
  };

  const handleTaskClick = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      selectTask(task);
    }
  };

  const handleTaskComplete = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      const newStatus = task.status === 'completed' ? 'pending' : 'completed';
      updateTask(taskId, { status: newStatus });
    }
  };

  const handleTaskDelete = (taskId: string) => {
    if (confirm('确定要删除这个任务吗？')) {
      deleteTask(taskId);
    }
  };

  const handleSearch = (query: string) => {
    setFilters({ search: query });
  };

  return (
    <Layout
      title="仪表盘"
      onCreateTask={handleCreateTask}
      onSearch={handleSearch}
    >
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              onTaskClick={handleTaskClick}
              onTaskComplete={handleTaskComplete}
              onTaskDelete={handleTaskDelete}
            />
          }
        />
        <Route
          path="/tasks"
          element={
            <TaskListPage
              onTaskClick={handleTaskClick}
              onTaskComplete={handleTaskComplete}
              onTaskDelete={handleTaskDelete}
            />
          }
        />
        <Route
          path="/completed"
          element={
            <CompletedPage
              onTaskClick={handleTaskClick}
              onTaskComplete={handleTaskComplete}
              onTaskDelete={handleTaskDelete}
            />
          }
        />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>

      {selectedTask && (
        <TaskDetail
          task={selectedTask}
          onClose={() => selectTask(null)}
          onComplete={handleTaskComplete}
          onDelete={handleTaskDelete}
          onUpdate={updateTask}
          onToggleSubtask={toggleSubtask}
          onEdit={() => {
            handleEditTask(selectedTask);
            selectTask(null);
          }}
        />
      )}

      <TaskForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleSubmitTask}
        task={editingTask}
      />
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
