import { useGlobals } from '@storybook/manager-api';

const THEMES = {
  masterbrand: { title: 'Masterbrand', colour: '#002bfe' },
  datapay: { title: 'Datapay', colour: '#01dbe5' },
  datascape: { title: 'Datascape', colour: '#7827ff' },
  gateway: { title: 'Gateway', colour: '#feb301' },
  timpani: { title: 'Timpani', colour: '#0072ed' },
  connect: { title: 'Connect', colour: '#df2468' },
};

export type ThemeKey = keyof typeof THEMES;

export const themes = Object.entries(THEMES).map(([key, theme]) => ({
  name: key,
  ...theme,
})) as Array<{ name: ThemeKey; title: string; colour: string }>;

export const getLocalThemeMode = () => {
  const theme: unknown =
    typeof localStorage !== 'undefined' && localStorage.theme;

  if (theme === 'light' || theme === 'dark') {
    return theme;
  }
  return 'system';
};

export const inferThemeMode = () => {
  const theme = getLocalThemeMode();

  if (theme !== 'system') {
    return theme;
  }

  if (window?.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

export type EndeavourGlobals = {
  'endeavour-theme-mode'?: 'light' | 'dark' | undefined;
  'endeavour-theme-name'?: ThemeKey | undefined;
};

export const globals: EndeavourGlobals = {
  'endeavour-theme-mode': inferThemeMode(),
  'endeavour-theme-name': 'masterbrand',
};

export const useEndeavourGlobals = (): [
  EndeavourGlobals,
  (args: EndeavourGlobals) => void,
] => useGlobals();
