import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { radius, spacing } from '../../theme/spacing';

interface AppInputProps extends TextInputProps {
  label: string;
  error?: string;
}

export default function AppInput({ label, error, style, ...inputProps }: AppInputProps) {
  const { colors } = useTheme();
  const hasError = error !== undefined && error !== '';

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <TextInput
        placeholderTextColor={colors.placeholder}
        {...inputProps}
        style={[
          styles.input,
          {
            backgroundColor: colors.inputBackground,
            color: colors.inputText,
            borderColor: hasError ? colors.danger : colors.border,
          },
          style,
        ]}
      />
      {hasError && <Text style={[styles.error, { color: colors.danger }]}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    fontSize: 14,
  },
  error: {
    fontSize: 13,
    marginTop: spacing.xs,
  },
});