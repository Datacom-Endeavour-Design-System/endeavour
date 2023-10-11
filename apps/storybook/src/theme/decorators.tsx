import React, { PropsWithChildren, useEffect } from 'react';
import { DocsContainer as StorybookDocsContainer } from '@storybook/addon-docs';
import { DocsContainerProps } from '@storybook/blocks';
import { Preview } from '@storybook/react';

import { EndeavourGlobals } from '.';
import { dark, light } from './storybook-theme';

const ApplyTheme = ({
  theme,
}: {
  theme: EndeavourGlobals['endeavour-theme-name'];
}) => {
  return (
    <link
      rel="stylesheet"
      href={`/${theme || 'masterbrand'}-colour-tokens.css`}
    />
  );
};

export const PreviewDecorator: Preview['decorators'][number] = (
  Story,
  { globals }: { globals: EndeavourGlobals },
) => {
  const isDark = globals['endeavour-theme-mode'] === 'dark';
  const mode = globals['endeavour-theme-mode'];

  if (mode === undefined) {
    console.log('blarg');
  }

  if (mode === null) {
    console.log('blarg');
  }

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    document.body.style.background = 'var(--dc-background-colour)';
  }, [isDark]);

  return (
    <>
      <ApplyTheme theme={globals['endeavour-theme-name']} />
      <Story />
    </>
  );
};

export const DocsContainer = ({
  children,
  context,
}: PropsWithChildren<DocsContainerProps>) => {
  // https://github.com/storybookjs/storybook/issues/10523
  const globals = context.getStoryContext(context.componentStories()[0])
    .globals as EndeavourGlobals;
  const isDark = globals['endeavour-theme-mode'] === 'dark';

  return (
    <StorybookDocsContainer context={context} theme={isDark ? dark : light}>
      {children}
    </StorybookDocsContainer>
  );
};
