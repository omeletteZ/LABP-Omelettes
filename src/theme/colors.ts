import { TaskPriority } from '../types/task';

export type ThemeName = 'light' | 'dark';

export interface ThemeColors {
  background: string;
  surface: string;
  onSurface: string;
  text: string;
  textMuted: string;
  header: string;
  onHeader: string;
  primary: string;
  onPrimary: string;
  action: string;
  onAction: string;
  danger: string;
  border: string;
  inputBackground: string;
  inputText: string;
  placeholder: string;
  priority: Record<TaskPriority, string>;
  onPriority: string;
}

const palette = {
  brown900: '#2b211d',
  brown600: '#6b5a52',
  brown400: '#8a7468',
  cream50: '#fffaf5',
  cream100: '#f3ece4',
  sand200: '#e4d3c4',
  sand300: '#d9b6a3',
  sand400: '#b89a8a',
  blue300: '#a9c0c6',
  blue400: '#819fa7',
  red300: '#e07a6e',
  red400: '#d9776c',
  red600: '#ad453a',
} as const;

export const darkColors: ThemeColors = {
  background: palette.brown900,
  surface: palette.blue400,
  onSurface: palette.brown900,
  text: palette.cream100,
  textMuted: palette.sand300,
  header: palette.sand300,
  onHeader: palette.brown900,
  primary: palette.cream100,
  onPrimary: palette.brown900,
  action: palette.brown900,
  onAction: palette.cream100,
  danger: palette.red300,
  border: palette.brown600,
  inputBackground: palette.brown900,
  inputText: palette.cream100,
  placeholder: palette.sand300,
  priority: {
    low: palette.cream100,
    medium: palette.blue400,
    high: palette.red600,
  },
  onPriority: palette.brown900,
};

export const lightColors: ThemeColors = {
  background: palette.cream100,
  surface: palette.sand300,
  onSurface: palette.brown900,
  text: palette.brown900,
  textMuted: palette.brown600,
  header: palette.blue400,
  onHeader: palette.brown900,
  primary: palette.brown900,
  onPrimary: palette.cream100,
  action: palette.brown900,
  onAction: palette.cream100,
  danger: palette.red600,
  border: palette.sand400,
  inputBackground: palette.cream50,
  inputText: palette.brown900,
  placeholder: palette.brown400,
  priority: {
    low: palette.sand200,
    medium: palette.blue300,
    high: palette.red400,
  },
  onPriority: palette.brown900,
};

export const themes: Record<ThemeName, ThemeColors> = {
  dark: darkColors,
  light: lightColors,
};