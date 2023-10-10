// .storybook/preview.ts
import React from 'react';
import '@datacom/endeavour/dist/endeavour/endeavour.css';
import { PropsWithChildren, useEffect } from 'react';
import { Preview } from '@storybook/react';
import { DocsContainer } from '@storybook/addon-docs';
import { DocsContainerProps } from '@storybook/blocks';

import { light, dark } from './theme';

const inferThemeMode = () => {
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

const Container = ({
  children,
  context,
}: PropsWithChildren<DocsContainerProps>) => {
  // https://github.com/storybookjs/storybook/issues/10523
  const isDark =
    context.getStoryContext(context.componentStories()[0]).globals[
      'endeavour-mode'
    ] === 'dark';

  return (
    <DocsContainer context={context} theme={isDark ? dark : light}>
      {children}
    </DocsContainer>
  );
};

const preview: Preview = {
  decorators: [
    (Story, { globals }) => {
      const isDark = globals['endeavour-mode'] === 'dark';

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
      container: Container,
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
