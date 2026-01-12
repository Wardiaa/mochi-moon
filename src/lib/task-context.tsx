import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Task } from './types';

interface TaskContextType {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => Promise<void>;
  updateTask: (id: number, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  refreshTasks: () => Promise<void>;
}

// Single global declaration for electronAPI
declare global {
  interface Window {
    electronAPI?: {
      // Window controls
      closeApp: () => void;
      minimizeApp: () => void;
      maximizeApp: () => void;
      
      // File I/O operations
      readTasks: () => Promise<any[]>;
      writeTasks: (tasks: any[]) => Promise<boolean>;
    };
  }
}

const isElectron = typeof window !== 'undefined' && window.electronAPI;

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load tasks from local JSON file
  const loadTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      let loadedTasks: Task[] = [];
      
      if (isElectron && window.electronAPI) {
        // Use Electron's file system
        loadedTasks = await window.electronAPI!.readTasks();
      } else {
        // Fallback to localStorage for web preview
        const saved = localStorage.getItem('mochi-tasks');
        loadedTasks = saved ? JSON.parse(saved) : [];
      }
      
      setTasks(loadedTasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tasks');
      console.error('Error loading tasks:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save tasks to local JSON file
  const saveTasks = useCallback(async (newTasks: Task[]) => {
    try {
      if (isElectron && window.electronAPI) {
        // Use Electron's file system
        await window.electronAPI!.writeTasks(newTasks);
      } else {
        // Fallback to localStorage for web preview
        localStorage.setItem('mochi-tasks', JSON.stringify(newTasks));
      }
    } catch (err) {
      console.error('Error saving tasks:', err);
      throw err;
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const addTask = useCallback(async (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      const newTask: Task = {
        ...taskData,
        id: Date.now(), // Simple ID generation
        createdAt: new Date().toISOString(),
      };
      
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      await saveTasks(updatedTasks);
    } catch (err) {
      console.error('Error adding task:', err);
      throw err;
    }
  }, [tasks, saveTasks]);

  const updateTask = useCallback(async (id: number, updates: Partial<Task>) => {
    try {
      const updatedTasks = tasks.map(task => 
        task.id === id ? { ...task, ...updates } : task
      );
      setTasks(updatedTasks);
      await saveTasks(updatedTasks);
    } catch (err) {
      console.error('Error updating task:', err);
      throw err;
    }
  }, [tasks, saveTasks]);

  const deleteTask = useCallback(async (id: number) => {
    try {
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);
      await saveTasks(updatedTasks);
    } catch (err) {
      console.error('Error deleting task:', err);
      throw err;
    }
  }, [tasks, saveTasks]);

  const refreshTasks = useCallback(async () => {
    await loadTasks();
  }, [loadTasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        isLoading,
        error,
        addTask,
        updateTask,
        deleteTask,
        refreshTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}