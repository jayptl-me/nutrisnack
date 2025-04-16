import { createTheme } from '@/components/layout/theme-provider';

// Define our custom theme
export const nutriSnackTheme = {
  light: {
    background: '0 0% 100%',
    foreground: '240 10% 3.9%',
    primary: '220 70% 50%', // Blue for light mode
    'primary-foreground': '0 0% 98%',
    secondary: '240 4.8% 95.9%',
    'secondary-foreground': '240 5.9% 10%',
    muted: '240 4.8% 95.9%',
    'muted-foreground': '240 3.8% 46.1%',
    accent: '240 4.8% 95.9%',
    'accent-foreground': '240 5.9% 10%',
    border: '240 5.9% 90%'
  },
  dark: {
    background: '240 10% 3.9%',
    foreground: '0 0% 98%',
    primary: '217 91% 60%', // Brighter blue for dark mode
    'primary-foreground': '240 5.9% 10%',
    secondary: '240 3.7% 15.9%',
    'secondary-foreground': '0 0% 98%',
    muted: '240 3.7% 15.9%',
    'muted-foreground': '240 5% 64.9%',
    accent: '240 3.7% 15.9%',
    'accent-foreground': '0 0% 98%',
    border: '240 3.7% 15.9%'
  }
};

// Apply theme to CSS variables
export function applyTheme(theme: 'light' | 'dark') {
  const root = document.documentElement;
  const colors = nutriSnackTheme[theme];
  
  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
}