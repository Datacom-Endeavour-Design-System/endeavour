import { dirname, join } from 'path';
const stories =
  process.env.STORYBOOK_STORIES === 'unstable'
    ? ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)']
    : ['../src/stable/**/*.stories.@(js|jsx|ts|tsx|mdx)'];

module.exports = {
  stories,

  addons: [
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-interactions'),
  ],
  core: {
    builder: getAbsolutePath('@storybook/builder-vite'), // 👈 The builder enabled here.
  },

  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },

  staticDirs: ['../static'],

  docs: {
    autodocs: true,
  },
};

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')));
}
