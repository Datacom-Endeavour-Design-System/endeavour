// .storybook/preview.ts
import '@datacom/endeavour/dist/endeavour/endeavour.css';
import React, { useEffect } from 'react';
import { Preview } from '@storybook/react';
import { DocsContainer } from '@storybook/addon-docs';

import { light, dark } from './theme';

const inferThemeMode = () => {
  console.log('infered!');
  if (typeof localStorage !== 'undefined' && localStorage.theme === 'dark') {
    return 'dark';
  }
  if (typeof localStorage !== 'undefined' && localStorage.theme === 'light') {
    return 'light';
  }
  if (window?.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const isDark = context.globals['endeavour-mode'] === 'dark';
      useEffect(() => {
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        document.body.style.background = 'var(--dc-background-colour)';
      }, [isDark]);

      return <Story />;
    },
  ],
  globals: {
    'endeavour-mode': inferThemeMode(),
  },
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    docs: {
      container: ({ children, context }) => (
        <DocsContainer
          context={context}
          theme={
            context.store.globals.globals['endeavour-mode'] === 'dark'
              ? dark
              : light
          }>
          {children}
        </DocsContainer>
      ),
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
