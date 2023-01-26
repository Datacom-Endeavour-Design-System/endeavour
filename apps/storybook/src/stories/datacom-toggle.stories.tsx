import React from 'react';
import { ComponentStoryFn } from '@storybook/react';
import { DatacomToggle } from '@datacom/endeavour-react';

export default {
  title: 'Toggle',
  component: DatacomToggle,
  argTypes: {
    disabled: {
      name: 'Disabled',
      description: 'If true, disables the toggle element.',
      type: { name: 'boolean' },
    },
    labelOnLeft: {
      name: 'Label on left',
      description:
        'If true, label will be rendered on the left of the toggle element.',
      type: { name: 'boolean' },
    },
    toggled: {
      name: 'Toggled',
      description: 'If true, toggle element will be toggled on initial load.',
      type: { name: 'boolean' },
    },
    label: {
      name: 'Label',
      defaultValue: 'Section Label',
      description: 'Label for accordion section.',
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
  },
};

const Template: ComponentStoryFn<typeof DatacomToggle> = (args) => {
  const { disabled, label, labelOnLeft, toggled, variant } = args;

  return (
    <DatacomToggle
      label={label}
      disabled={disabled}
      toggled={toggled}
      labelOnLeft={labelOnLeft}
      variant={variant}
    />
  );
};

export const Toggle = Template.bind({});
Toggle.args = {
  disabled: false,
  label: 'Label',
  labelOnLeft: false,
  toggled: false,
};
