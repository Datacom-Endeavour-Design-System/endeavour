const stories =
  process.env.STORYBOOK_STORIES === 'unstable'
    ? ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)']
    : ['../src/stable/**/*.stories.@(js|jsx|ts|tsx|mdx)'];

module.exports = {
  stories,
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  staticDirs: ['../static'],
};
