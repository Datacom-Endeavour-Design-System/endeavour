import React from 'react';
import { StoryObj, Meta } from '@storybook/react';
import {
  DatacomButton,
  DatacomTooltip,
} from '@datacom-digital/endeavour-react';

export default {
  title: 'Tooltip',
  component: DatacomTooltip,
  argTypes: {
    position: {
      name: 'Tooltip position',
      description: 'Sets position of tooltip.',
      control: {
        type: 'select',
        labels: {
          auto: 'Auto',
          top: 'Top',
          'top-start': 'Top-start',
          'top-end': 'Top-end',
          bottom: 'Bottom',
          'bottom-start': 'Bottom-start',
          'bottom-end': 'Bottom-end',
          left: 'Left',
          'left-start': 'Left-start',
          'left-end': 'Left-end',
          right: 'Right',
          'right-start': 'Right-start',
          'right-end': 'Right-end',
        },
      },
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
    label: {
      name: 'Label',
      description: 'Text displayed in tooltip.',
      defaultValue: 'Tooltip text',
      type: { name: 'string' },
    },
    hideArrow: {
      name: 'Hide arrow',
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
  args: {
    label: 'Tooltip text',
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
        <DatacomButton>Hover over me</DatacomButton>
      </DatacomTooltip>
    </div>
  ),
};
