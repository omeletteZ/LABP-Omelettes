import React, { createContext, ReactNode, useState } from 'react';
import { CreateTaskInput, Task, UpdateTaskInput } from '../types/task';
import { buildTask, getToggledStatus } from '../utils/task';

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Подготовить доклад',
    subject: 'История',
    priority: 'high',
    status: 'active',
    createdAt: '2026-10-01T09:00:00.000Z',
    dueDate: '2026-10-20',
  },
  {
    id: '2',
    title: 'Решить задачи по матанализу',
    subject: 'Математика',
    priority: 'medium',
    status: 'active',
    createdAt: '2026-10-02T09:00:00.000Z',
  },
  {
    id: '3',
    title: 'Прочитать главу учебника',
    subject: 'Физика',
    priority: 'low',
    status: 'completed',
    createdAt: '2026-10-03T09:00:00.000Z',
  },
  {
    id: '4',
    title: 'Сдать лабораторную работу',
    subject: 'Программирование',
    priority: 'high',
    status: 'active',
    createdAt: '2026-10-04T09:00:00.000Z',
    dueDate: '2026-10-05',
  },
];

export interface TasksContextValue {
  tasks: Task[];
  createTask: (input: CreateTaskInput) => void;
  updateTask: (id: string, input: UpdateTaskInput) => void;
  removeTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
  getTaskById: (id: string) => Task | undefined;
}

export const TasksContext = createContext<TasksContextValue | undefined>(undefined);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const createTask = (input: CreateTaskInput) => {
    setTasks((prev) => [buildTask(input), ...prev]);
  };

  const updateTask = (id: string, input: UpdateTaskInput) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...input } : task))
    );
  };

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTaskStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: getToggledStatus(task.status) } : task
      )
    );
  };

  const getTaskById = (id: string) => tasks.find((task) => task.id === id);

  return (
    <TasksContext.Provider
      value={{ tasks, createTask, updateTask, removeTask, toggleTaskStatus, getTaskById }}
    >
      {children}
    </TasksContext.Provider>
  );
}