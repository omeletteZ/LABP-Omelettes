import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import TaskCard from '../src/components/task/TaskCard';
import AppButton from '../src/components/ui/AppButton';
import AppInput from '../src/components/ui/AppInput';
import EmptyState from '../src/components/ui/EmptyState';
import Screen from '../src/components/ui/Screen';
import { useTheme } from '../src/context/ThemeContext';
import { useTasks } from '../src/hooks/useTasks';
import { radius, spacing } from '../src/theme/spacing';
import { filterTasks, getTaskStats } from '../src/utils/task';

export default function TaskListScreen() {
  const { tasks, toggleTaskStatus, removeTask } = useTasks();
  const { colors } = useTheme();
  const [query, setQuery] = useState('');

  const { total, completed } = getTaskStats(tasks);
  const visibleTasks = filterTasks(tasks, query);
  const isSearching = query.trim() !== '';

  const openTask = (id: string) => router.push({ pathname: '/task/[id]', params: { id } });
  const openNewTask = () => router.push('/task/new');

  return (
    <Screen padded={false}>
      <View style={[styles.header, { backgroundColor: colors.header }]}>
        <Text style={[styles.headerTitle, { color: colors.onHeader }]}>Campus Planner</Text>
        <Text style={[styles.headerStats, { color: colors.onHeader }]}>
          Всего задач: {total} · Выполнено: {completed}
        </Text>
      </View>

      <View style={styles.toolbar}>
        <AppInput
          label="Поиск"
          placeholder="Название или предмет"
          value={query}
          onChangeText={setQuery}
        />
        <View style={styles.buttonRow}>
          <AppButton title="+ Добавить задачу" onPress={openNewTask} style={styles.rowButton} />
          <AppButton
            title="Настройки"
            variant="secondary"
            onPress={() => router.push('/settings')}
            style={styles.rowButton}
          />
        </View>
      </View>

      <FlatList
        data={visibleTasks}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onPress={openTask}
            onToggleStatus={toggleTaskStatus}
            onRemove={removeTask}
          />
        )}
        ListEmptyComponent={
          isSearching ? (
            <EmptyState
              title="Ничего не найдено"
              description="Попробуйте изменить поисковый запрос"
            />
          ) : (
            <EmptyState
              title="Список пока пуст"
              description="Добавьте первую учебную задачу"
              actionLabel="Добавить задачу"
              onAction={openNewTask}
            />
          )
        }
        contentContainerStyle={styles.listContent}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
    marginBottom: spacing.md,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  headerStats: {
    fontSize: 14,
    opacity: 0.75,
    marginTop: spacing.xs,
  },
  toolbar: {
    paddingHorizontal: spacing.md,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  rowButton: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
});