import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { radius, spacing } from '../../theme/spacing';
import { Task } from '../../types/task';
import { isOverdue, PRIORITY_LABELS, STATUS_LABELS } from '../../utils/task';

interface TaskCardProps {
  task: Task;
  onPress: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function TaskCard({ task, onPress, onToggleStatus, onRemove }: TaskCardProps) {
  const { colors } = useTheme();
  const isCompleted = task.status === 'completed';
  const overdue = isOverdue(task);

  return (
    <Pressable onPress={() => onPress(task.id)}>
      <View
        style={[
          styles.card,
          { backgroundColor: colors.priority[task.priority] },
          isCompleted && styles.cardCompleted,
        ]}
      >
        <View style={styles.info}>
          <Text
            style={[
              styles.title,
              { color: colors.onPriority },
              isCompleted && styles.titleCompleted,
            ]}
          >
            {task.title}
          </Text>
          <Text style={[styles.meta, { color: colors.onPriority }]}>{task.subject}</Text>
          <Text style={[styles.meta, { color: colors.onPriority }]}>
            Приоритет: {PRIORITY_LABELS[task.priority]}
          </Text>
          <Text style={[styles.meta, { color: colors.onPriority }]}>
            {STATUS_LABELS[task.status]}
          </Text>
          {task.dueDate !== undefined && (
            <Text style={[styles.meta, { color: colors.onPriority }, overdue && styles.overdue]}>
              Срок: {task.dueDate}
              {overdue ? ' · просрочено' : ''}
            </Text>
          )}
        </View>

        <View style={styles.actions}>
          <Pressable
            style={[styles.actionButton, { backgroundColor: colors.action }]}
            onPress={(e) => {
              e.stopPropagation();
              onToggleStatus(task.id);
            }}
          >
            <Text style={[styles.actionText, { color: colors.onAction }]}>
              {isCompleted ? 'Вернуть' : 'Выполнено'}
            </Text>
          </Pressable>
          <Pressable
            style={[styles.actionButton, { backgroundColor: colors.action }]}
            onPress={(e) => {
              e.stopPropagation();
              onRemove(task.id);
            }}
          >
            <Text style={[styles.actionText, { color: colors.danger }]}>Удалить</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    padding: spacing.md,
    marginVertical: spacing.sm - 1,
  },
  cardCompleted: {
    opacity: 0.5,
  },
  info: {
    marginBottom: spacing.sm + spacing.xs,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
  },
  meta: {
    fontSize: 13,
    opacity: 0.75,
    marginTop: 3,
  },
  overdue: {
    fontWeight: '700',
    opacity: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    paddingVertical: 7,
    paddingHorizontal: spacing.md - 2,
    borderRadius: radius.sm + 2,
    marginLeft: spacing.sm,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
  },
});