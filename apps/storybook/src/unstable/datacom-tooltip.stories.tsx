import React from 'react';
import { StoryObj, Meta } from '@storybook/react';
import { DatacomButton, DatacomTooltip } from '@datacom/endeavour-react';

export default {
  title: 'Tooltip',
  component: DatacomTooltip,
  argTypes: {
    position: {
      name: 'Tooltip Position',
      description: 'Sets position of tooltip.',
      control: 'select',
      defaultValue: 'bottom',
      options: [
        'auto',
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
      ],
      type: { name: 'string' },
    },
    text: {
      name: 'Text',
      description: 'Text displayed in tooltip.',
      defaultValue: 'Tooltip text',
      type: { name: 'string' },
    },
    dark: {
      name: 'Dark Theme',
      defaultValue: false,
      type: { name: 'boolean' },
    },
    hideTip: {
      name: 'Hide Tip',
      defaultValue: false,
      type: { name: 'boolean' },
    },
    width: {
      name: 'Width',
      description:
        "Sets width (in pixels) of the tooltip. Only usable when not using position value of 'auto'.",
      type: { name: 'number' },
      if: { arg: 'position', truthy: true },
    },
  },
} as Meta<typeof DatacomTooltip>;

type Story = StoryObj<typeof DatacomTooltip>;

export const Default: Story = {
  render: (args: React.ComponentProps<typeof DatacomTooltip>) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 2rem)',
      }}>
      <DatacomTooltip {...args}>
        <DatacomButton>Hover me!</DatacomButton>
      </DatacomTooltip>
    </div>
  ),
};
