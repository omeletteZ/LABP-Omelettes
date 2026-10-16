import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { radius, spacing } from '../../theme/spacing';
import { CreateTaskInput, TaskPriority } from '../../types/task';
import { isValidDueDate, PRIORITY_LABELS, TASK_PRIORITIES } from '../../utils/task';
import AppButton from '../ui/AppButton';
import AppInput from '../ui/AppInput';

type TaskFormMode = 'create' | 'edit';

interface TaskFormProps {
  mode: TaskFormMode;
  initialValues?: CreateTaskInput;
  onSubmit: (input: CreateTaskInput) => void;
}

interface FormErrors {
  title?: string;
  subject?: string;
  dueDate?: string;
}

export default function TaskForm({ mode, initialValues, onSubmit }: TaskFormProps) {
  const { colors } = useTheme();

  const [title, setTitle] = useState(initialValues?.title ?? '');
  const [subject, setSubject] = useState(initialValues?.subject ?? '');
  const [priority, setPriority] = useState<TaskPriority>(initialValues?.priority ?? 'medium');
  const [dueDate, setDueDate] = useState(initialValues?.dueDate ?? '');
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = () => {
    const trimmedTitle = title.trim();
    const trimmedSubject = subject.trim();
    const trimmedDueDate = dueDate.trim();

    const nextErrors: FormErrors = {};
    if (trimmedTitle === '') {
      nextErrors.title = 'Введите название задачи';
    }
    if (trimmedSubject === '') {
      nextErrors.subject = 'Введите предмет';
    }
    if (trimmedDueDate !== '' && !isValidDueDate(trimmedDueDate)) {
      nextErrors.dueDate = 'Формат даты: ГГГГ-ММ-ДД';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSubmit({
      title: trimmedTitle,
      subject: trimmedSubject,
      priority,
      dueDate: trimmedDueDate === '' ? undefined : trimmedDueDate,
    });

    if (mode === 'create') {
      setTitle('');
      setSubject('');
      setPriority('medium');
      setDueDate('');
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
      <AppInput
        label="Название"
        placeholder="Например: подготовить доклад"
        value={title}
        onChangeText={setTitle}
        error={errors.title}
      />
      <AppInput
        label="Предмет"
        placeholder="Например: История"
        value={subject}
        onChangeText={setSubject}
        error={errors.subject}
      />
      <AppInput
        label="Срок сдачи (необязательно)"
        placeholder="ГГГГ-ММ-ДД"
        value={dueDate}
        onChangeText={setDueDate}
        error={errors.dueDate}
        autoCapitalize="none"
        keyboardType="numbers-and-punctuation"
      />

      <Text style={[styles.label, { color: colors.text }]}>Приоритет</Text>
      <View style={styles.priorityRow}>
        {TASK_PRIORITIES.map((p) => {
          const isActive = priority === p;
          return (
            <Pressable
              key={p}
              style={[
                styles.priorityButton,
                {
                  backgroundColor: isActive ? colors.priority[p] : colors.inputBackground,
                  borderColor: isActive ? colors.priority[p] : colors.border,
                },
              ]}
              onPress={() => setPriority(p)}
            >
              <Text
                style={[
                  styles.priorityText,
                  { color: isActive ? colors.onPriority : colors.textMuted },
                  isActive && styles.priorityTextActive,
                ]}
              >
                {PRIORITY_LABELS[p]}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <AppButton title={mode === 'create' ? 'Добавить' : 'Сохранить'} onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  priorityRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: spacing.sm + 1,
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: 'center',
  },
  priorityText: {
    fontSize: 13,
    fontWeight: '500',
  },
  priorityTextActive: {
    fontWeight: '700',
  },
});