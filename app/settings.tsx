import React from 'react';
import { StyleSheet, Text } from 'react-native';
import AppButton from '../src/components/ui/AppButton';
import Screen from '../src/components/ui/Screen';
import { useTheme } from '../src/context/ThemeContext';
import { spacing } from '../src/theme/spacing';
import { ThemeName } from '../src/theme/colors';

const THEME_OPTIONS: { name: ThemeName; label: string }[] = [
  { name: 'light', label: 'Светлая' },
  { name: 'dark', label: 'Тёмная' },
];

export default function SettingsScreen() {
  const { themeName, colors, setThemeName } = useTheme();

  return (
    <Screen>
      <Text style={[styles.title, { color: colors.text }]}>Тема оформления</Text>
      {THEME_OPTIONS.map((option) => (
        <AppButton
          key={option.name}
          title={option.label}
          variant={themeName === option.name ? 'primary' : 'secondary'}
          onPress={() => setThemeName(option.name)}
          style={styles.option}
        />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: spacing.lg,
  },
  option: {
    marginBottom: spacing.sm + spacing.xs,
  },
});