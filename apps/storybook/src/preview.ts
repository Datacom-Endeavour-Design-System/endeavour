// .storybook/preview.ts
import '@datacom-digital/endeavour/dist/endeavour/endeavour.css';
import { Preview } from '@storybook/react';

import { PreviewDecorator, DocsContainer } from './theme/decorators';
import { globals } from './theme/endeavour-theme';

const preview: Preview = {
  decorators: [PreviewDecorator],
  globals,
  parameters: {
    options: {
      storySort: {
        method: 'alphabetical',
      },
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    docs: {
      container: DocsContainer,
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
