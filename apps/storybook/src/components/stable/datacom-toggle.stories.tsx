import React from 'react';
import { StoryFn } from '@storybook/react';
import { DatacomToggle } from '@datacom/endeavour-react';

export default {
  title: 'Toggle',
  component: DatacomToggle,
  argTypes: {
    name: {
      name: 'Name',
      defaultValue: 'Toggle',
      description: 'HTML "name" attribute for toggle element.',
      type: { name: 'string' },
      table: { disable: true },
    },
    label: {
      name: 'Label',
      defaultValue: 'Label',
      description: 'Label for toggle element.',
      type: { name: 'string' },
    },
    variant: {
      name: 'Variant',
      description: "Toggle size variant. Defaults to 'standard' if not set.",
      control: 'select',
      defaultValue: 'standard',
      options: ['standard', 'small'],
      type: { name: 'string' },
    },
    toggled: {
      name: 'Toggled',
      description: 'If true, toggle element will be toggled on initial load.',
      type: { name: 'boolean' },
    },
    labelPosition: {
      name: 'Label position',
      description:
        'If true, label will be rendered on the left of the toggle element.',
      control: 'select',
      defaultValue: 'right',
      options: ['left', 'right'],
      type: { name: 'string' },
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
      disabled={disabled}
      toggled={toggled}
      labelPosition={labelPosition}
      variant={variant}
    />
  );
};

export const Toggle = Template.bind({});
Toggle.args = {
  name: 'Toggle',
  label: 'Label',
  variant: 'standard',
  toggled: false,
  labelPosition: 'right',
  disabled: false,
};
