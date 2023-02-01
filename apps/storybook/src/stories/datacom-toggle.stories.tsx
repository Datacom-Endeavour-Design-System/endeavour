import React from 'react';
import { ComponentStoryFn } from '@storybook/react';
import { DatacomToggle } from '@datacom/endeavour-react';

export default {
  title: 'Toggle',
  component: DatacomToggle,
  argTypes: {
    label: {
      name: 'Label',
      defaultValue: 'Label',
      description: 'Label for toggle element.',
      type: { label: 'string' },
    },
    variant: {
      name: 'Variant',
      description: "Toggle size variant. Defaults to 'standard' if not set.",
      control: 'select',
      defaultValue: 'standard',
      options: ['standard', 'small'],
      type: { name: 'string', required: true },
    },
    toggled: {
      name: 'Toggled',
      description: 'If true, toggle element will be toggled on initial load.',
      type: { name: 'boolean' },
    },
    labelPosition: {
      name: 'Label Position',
      description:
        'If true, label will be rendered on the left of the toggle element.',
      control: 'select',
      defaultValue: 'right',
      options: ['left', 'right'],
      type: { name: 'string', required: true },
    },
    disabled: {
      name: 'Disabled',
      description: 'If true, disables the toggle element.',
      type: { name: 'boolean' },
    },
  },
};

const Template: ComponentStoryFn<typeof DatacomToggle> = (args) => {
  const { disabled, label, labelPosition, toggled, variant } = args;

  return (
    <DatacomToggle
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
  label: 'Label',
  variant: 'standard',
  toggled: false,
  labelPosition: 'right',
  disabled: false,
};
