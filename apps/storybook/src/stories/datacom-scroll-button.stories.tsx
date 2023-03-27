import React from 'react';
import { ComponentStoryFn } from '@storybook/react';
import { DatacomScrollButton } from '@datacom/endeavour-react';

export default {
  title: 'Scroll Button',
  component: DatacomScrollButton,
  argTypes: {
    url: {
      name: 'URL',
      defaultValue: '#',
      description: 'URL that link to specific point in the current page.',
      type: { name: 'string' },
    },
    ctaTitle: {
      name: 'Title',
      defaultValue: 'Scroll down',
      type: { name: 'string' },
    },
  },
};

const Template: ComponentStoryFn<typeof DatacomScrollButton> = (args) => (
  <DatacomScrollButton {...args} />
);

export const ScrollButton = Template.bind({});
