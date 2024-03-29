import React from 'react';
import { addons, types } from '@storybook/manager-api';
import { ThemeSwitcher } from './theme/theme-switcher';

addons.register('endeavour', () => {
  addons.add('endeavour/theme', {
    title: 'Endeavour Theme Switcher',
    //👇 Sets the type of UI element in Storybook
    type: types.TOOL,
    //👇 Shows the Toolbar UI element if either the Canvas or Docs tab is active
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: () => <ThemeSwitcher />,
  });
});

addons.setConfig({
  toolbar: {
    'storybook/background': { hidden: true },
  },
});
