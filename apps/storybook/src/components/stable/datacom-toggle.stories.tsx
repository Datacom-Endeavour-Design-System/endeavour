import React from 'react';
import { StoryFn } from '@storybook/react';
import { DatacomToggle } from '@datacom/endeavour-react';

export default {
  title: 'Toggle',
  component: DatacomToggle,
  argTypes: {
    name: {
      name: 'Name',
      description: 'HTML "name" attribute for toggle element.',
      type: { name: 'string' },
      table: { disable: true },
    },
    label: {
      name: 'Label',
      description: 'Label for toggle element.',
      type: { name: 'string' },
    },
    labelPosition: {
      name: 'Label position',
      description:
        'If true, label will be rendered on the left of the toggle element.',
      control: { type: 'select', labels: { left: 'Left', right: 'Right' } },
      options: ['left', 'right'],
      type: { name: 'string' },
    },
    variant: {
      name: 'Size',
      description: "Toggle size variant. Defaults to 'standard' if not set.",
      control: {
        type: 'select',
        labels: { standard: ' Standard', small: 'Small' },
      },
      defaultValue: 'standard',
      options: ['standard', 'small'],
      type: { name: 'string' },
    },
    toggled: {
      name: 'Toggled',
      description: 'If true, toggle element will be toggled on initial load.',
      type: { name: 'boolean' },
    },
    disabled: {
      name: 'Disabled',
      description: 'If true, disables the toggle element.',
      type: { name: 'boolean' },
    },
  },
};

const Template: StoryFn<typeof DatacomToggle> = (args) => {
  const { disabled, label, labelPosition, name, toggled, variant } = args;

  return (
    <DatacomToggle
      name={name}
      label={label}
      labelPosition={labelPosition}
      disabled={disabled}
      toggled={toggled}
      variant={variant}
    />
  );
};

export const Toggle = Template.bind({});
Toggle.args = {
  label: 'Label',
  labelPosition: 'right',
  variant: 'standard',
  toggled: false,
  disabled: false,
};
