import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { DatacomButton } from '@datacom/endeavour-react';

export default {
  title: 'Button',
  component: DatacomButton,
  argTypes: {
    text: {
      name: 'Text',
      description: 'Button text',
      type: { name: 'string', required: true },
    },
    variant: {
      name: 'Variant',
      description: 'Main button variant. Defaults to primary if not set.',
      control: 'select',
      defaultValue: 'primary',
      options: ['primary', 'secondary', 'ghost'],
      type: { name: 'string', required: true },
    },
    size: {
      name: 'Size',
      description:
        'Button size within variant. Defaults to standard if not set',
      control: 'select',
      defaultValue: 'large',
      options: ['large', 'small'],
    },
    'image-position': {
      name: 'Image position',
      description: 'Image or icon position. Defaults to left if not set',
      control: 'select',
      defaultValue: 'left',
      options: ['left', 'right'],
    },
    icon: {
      name: 'Icon',
      description: 'Display image icon from a set of pre-defined images',
      control: 'select',
      options: [
        '',
        'globe',
        'upload',
        'up',
        'settings',
        'search',
        'remove',
        'refresh',
        'menu',
        'information',
        'forward',
        'filter',
        'external-link',
        'download',
        'down',
        'copy',
        'calendar',
        'bookmark',
        'back',
        'back-to-top',
        'add',
        'add-to-cart',
      ],
    },
    disabled: {
      name: 'Disabled',
      description: 'Disable button',
      type: { name: 'boolean' },
    },
    loading: {
      name: 'Loading',
      description: 'Show loading spinner',
      type: { name: 'boolean' },
    },
  },
  args: {
    text: 'Button text',
    variant: 'primary',
    size: 'large',
    'image-position': 'left',
    icon: '',
    loading: false,
    disabled: false,
  },
} as Meta<typeof DatacomButton>;

const Template: StoryFn<typeof DatacomButton> = (args) => (
  <DatacomButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
};

export const Ghost = Template.bind({});
Ghost.args = {
  variant: 'ghost',
};
