import { useTasks } from "./task-context";

// This is a compatibility layer that mimics the original useTasks API
export function useTasksLocal() {
  const context = useTasks();
  
  return {
    data: context.tasks,
    isLoading: context.isLoading,
    error: context.error,
    refetch: context.refreshTasks,
  };
}

export function useCreateTaskLocal() {
  const { addTask } = useTasks();
  
  return {
    mutateAsync: addTask,
    isPending: false,
  };
}

export function useUpdateTaskLocal() {
  const { updateTask } = useTasks();
  
  return {
    mutateAsync: async (data: { id: number } & any) => {
      const { id, ...updates } = data;
      return updateTask(id, updates);
    },
    isPending: false,
  };
}

export function useDeleteTaskLocal() {
  const { deleteTask } = useTasks();
  
  return {
    mutateAsync: deleteTask,
    isPending: false,
  };
}