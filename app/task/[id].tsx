import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import AppButton from '../../src/components/ui/AppButton';
import EmptyState from '../../src/components/ui/EmptyState';
import Screen from '../../src/components/ui/Screen';
import { useTheme } from '../../src/context/ThemeContext';
import { useTasks } from '../../src/hooks/useTasks';
import { spacing } from '../../src/theme/spacing';
import { TaskRouteParams } from '../../src/types/navigation';
import { isOverdue, PRIORITY_LABELS, STATUS_LABELS } from '../../src/utils/task';

export default function TaskDetailsScreen() {
  const { id } = useLocalSearchParams<TaskRouteParams>();
  const { getTaskById, toggleTaskStatus } = useTasks();
  const { colors } = useTheme();

  const task = getTaskById(id);

  if (!task) {
    return (
      <Screen>
        <EmptyState
          icon="❓"
          title="Задача не найдена"
          description="Возможно, она была удалена"
          actionLabel="Вернуться к списку"
          onAction={() => router.back()}
        />
      </Screen>
    );
  }

  const isCompleted = task.status === 'completed';
  const overdue = isOverdue(task);

  return (
    <Screen>
      <Text style={[styles.title, { color: colors.text }]}>{task.title}</Text>
      <Text style={[styles.field, { color: colors.text }]}>Предмет: {task.subject}</Text>
      <Text style={[styles.field, { color: colors.text }]}>
        Приоритет: {PRIORITY_LABELS[task.priority]}
      </Text>
      <Text style={[styles.field, { color: colors.text }]}>
        Статус: {STATUS_LABELS[task.status]}
      </Text>
      {task.dueDate !== undefined && (
        <Text style={[styles.field, { color: overdue ? colors.danger : colors.text }]}>
          Срок: {task.dueDate}
          {overdue ? ' (просрочено)' : ''}
        </Text>
      )}

      <AppButton
        title={isCompleted ? 'Вернуть в работу' : 'Отметить выполненной'}
        onPress={() => toggleTaskStatus(task.id)}
        style={styles.button}
      />
      <AppButton
        title="Редактировать"
        variant="secondary"
        onPress={() => router.push({ pathname: '/task/edit/[id]', params: { id: task.id } })}
        style={styles.button}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  field: {
    fontSize: 15,
    marginBottom: spacing.sm,
  },
  button: {
    marginTop: spacing.sm + spacing.xs,
  },
});