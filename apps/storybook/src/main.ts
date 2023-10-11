import type { StorybookConfig } from '@storybook/react-vite';

import { dirname, join } from 'path';

function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, 'package.json')));
}

const stories =
  process.env.STORYBOOK_STORIES === 'unstable'
    ? ['./**/*.stories.@(js|jsx|ts|tsx|mdx)']
    : ['./**/stable/**/*.stories.@(js|jsx|ts|tsx|mdx)'];

const config: StorybookConfig = {
  stories,

  addons: [
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-interactions'),
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  staticDirs: ['./public'],

  docs: {
    autodocs: true,
  },
};

export default config;
