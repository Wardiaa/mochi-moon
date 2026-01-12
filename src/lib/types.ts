export interface Task {
  id: number;
  title: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  xp: number;
  createdAt: string;
}

export type TaskInput = Omit<Task, 'id' | 'createdAt'>;