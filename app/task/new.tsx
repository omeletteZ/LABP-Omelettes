import React from 'react';
import { router } from 'expo-router';
import TaskForm from '../../src/components/task/TaskForm';
import Screen from '../../src/components/ui/Screen';
import { useTasks } from '../../src/hooks/useTasks';
import { CreateTaskInput } from '../../src/types/task';

export default function NewTaskScreen() {
  const { createTask } = useTasks();

  const handleSubmit = (input: CreateTaskInput) => {
    createTask(input);
    router.back();
  };

  return (
    <Screen>
      <TaskForm mode="create" onSubmit={handleSubmit} />
    </Screen>
  );
}