import { useContext } from 'react';
import { TasksContext, TasksContextValue } from '../context/TasksContext';

export function useTasks(): TasksContextValue {
  const ctx = useContext(TasksContext);
  if (!ctx) {
    throw new Error('useTasks должен использоваться внутри TasksProvider');
  }
  return ctx;
}