import {
  CreateTaskInput,
  StatusFilter,
  Task,
  TaskPriority,
  TaskStatus,
} from '../types/task';

export const TASK_PRIORITIES: readonly TaskPriority[] = ['low', 'medium', 'high'];

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
};

export const STATUS_LABELS: Record<TaskStatus, string> = {
  active: 'Не выполнено',
  completed: 'Выполнено',
};

export interface TaskStats {
  total: number;
  active: number;
  completed: number;
}

export function getTaskStats(tasks: readonly Task[]): TaskStats {
  const completed = tasks.filter((task) => task.status === 'completed').length;
  return {
    total: tasks.length,
    active: tasks.length - completed,
    completed,
  };
}

const PRIORITY_WEIGHT: Record<TaskPriority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

export function sortByPriority(tasks: readonly Task[]): Task[] {
  return [...tasks].sort(
    (a, b) => PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority]
  );
}

export function filterByStatus(tasks: readonly Task[], filter: StatusFilter): Task[] {
  if (filter === 'all') {
    return [...tasks];
  }
  return tasks.filter((task) => task.status === filter);
}

export function filterTasks(tasks: readonly Task[], query: string): Task[] {
  const normalized = query.trim().toLowerCase();
  if (normalized === '') {
    return [...tasks];
  }
  return tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(normalized) ||
      task.subject.toLowerCase().includes(normalized)
  );
}

function parseDueDate(value: string): Date {
  const isDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(value);
  return new Date(isDateOnly ? `${value}T23:59:59` : value);
}

export function isOverdue(task: Task, now: Date = new Date()): boolean {
  if (task.dueDate === undefined || task.status === 'completed') {
    return false;
  }
  const due = parseDueDate(task.dueDate);
  if (Number.isNaN(due.getTime())) {
    return false;
  }
  return due.getTime() < now.getTime();
}

export function isValidDueDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }
  return !Number.isNaN(new Date(`${value}T00:00:00`).getTime());
}

export function getToggledStatus(status: TaskStatus): TaskStatus {
  return status === 'active' ? 'completed' : 'active';
}

export function buildTask(input: CreateTaskInput, now: Date = new Date()): Task {
  return {
    ...input,
    id: String(now.getTime()),
    status: 'active',
    createdAt: now.toISOString(),
  };
}