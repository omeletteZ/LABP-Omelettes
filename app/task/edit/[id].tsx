import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import TaskForm from '../../../src/components/task/TaskForm';
import EmptyState from '../../../src/components/ui/EmptyState';
import Screen from '../../../src/components/ui/Screen';
import { useTasks } from '../../../src/hooks/useTasks';
import { TaskRouteParams } from '../../../src/types/navigation';
import { CreateTaskInput } from '../../../src/types/task';

export default function EditTaskScreen() {
  const { id } = useLocalSearchParams<TaskRouteParams>();
  const { getTaskById, updateTask } = useTasks();

  const task = getTaskById(id);

  if (!task) {
    return (
      <Screen>
        <EmptyState
          title="Задача не найдена"
          description="Возможно, она была удалена"
          actionLabel="Вернуться к списку"
          onAction={() => router.back()}
        />
      </Screen>
    );
  }

  const handleSubmit = (input: CreateTaskInput) => {
    updateTask(task.id, input);
    router.back();
  };

  return (
    <Screen>
      <TaskForm mode="edit" initialValues={task} onSubmit={handleSubmit} />
    </Screen>
  );
}