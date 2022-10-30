import React from 'react';
import { ComponentStoryFn, Meta } from '@storybook/react';
import { DatacomRadio } from '@datacom/endeavour-react';

export default {
  title: 'Radio',
  component: DatacomRadio,
  argTypes: {
    label: {
      name: 'Label',
      defaultValue: 'Label',
      description: 'Radio label',
      type: { label: 'string', required: true },
    },
    variant: {
      name: 'Variant',
      description: 'Radios is main Variant',
      control: 'select',
      defaultValue: 'radios',
      options: ['radios', 'buttons'],
      type: { name: 'string', required: true },
    },
    size: {
      name: 'Size',
      description: 'Radio size within variant. Defaults to standard if not set',
      control: 'select',
      defaultValue: 'standard',
      options: ['standard', 'small'],
      type: { label: 'string', required: true },
    },
    checked: {
      name: 'Selected',
      description: 'Checked Radio',
      type: { name: 'boolean' },
    },
    disabled: {
      name: 'Disabled',
      description: 'Disable Radio',
      type: { name: 'boolean' },
    },
    required: {
      name: 'Required',
      description: 'Required Field',
      type: { name: 'boolean' },
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
  },
  args: {
    variant: 'radios',
    label: 'Label',
    size: 'standard',
    required: true,
    disabled: false,
    checked: false,
    'image-position': 'left',
    icon: '',
  },
};

const Template: ComponentStoryFn<typeof DatacomRadio> = (args) => (
  <DatacomRadio {...args} />
);

export const RadioGroup = Template.bind({});
RadioGroup.args = {
  label: ' Radio button Item',
  size: 'standard',
  disabled: false,
  checked: false,
  'image-position': 'left',
};
export const buttonGroup = Template.bind({});
buttonGroup.args = {
  label: 'label',
  size: 'standard',
  disabled: false,
  checked: false,
};
