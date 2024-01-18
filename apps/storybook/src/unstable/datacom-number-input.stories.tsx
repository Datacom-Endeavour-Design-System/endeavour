import React from 'react';
import { StoryObj, Meta } from '@storybook/react';
import { DatacomNumberInput } from '@datacom/endeavour-react';

const meta: Meta<typeof DatacomNumberInput> = {
  title: 'Number Input',
  component: DatacomNumberInput,
  argTypes: {
    label: {
      name: 'Label',
      defaultValue: 'Input label',
      description: 'Input label',
      type: { name: 'string', required: true },
    },
    value: {
      name: 'Value',
      description: 'Pre-populated input',
      type: { name: 'number', required: false },
    },
    placeholder: {
      name: 'Placeholder',
      defaultValue: 'e.g. 000',
      description: 'Input placeholder prompt',
      type: { name: 'string', required: false },
    },
    message: {
      name: 'Error Message',
      description: 'Error if validation fails',
      type: { name: 'string', required: false },
    },
    help: {
      name: 'Help text',
      description: 'Assistance instructions below input',
      type: { name: 'string', required: false },
    },
    required: {
      name: 'Required',
      description: 'Is the number input required',
      type: { name: 'boolean' },
    },
    min: {
      name: 'Min Number',
      description: 'Minium Number',
      type: { name: 'number' },
    },
    max: {
      name: 'Max Number',
      description: 'Maximum Number',
      type: { name: 'number' },
    },
    step: {
      name: 'Step',
      description: 'Step for increment and decrement',
      type: { name: 'number' },
    },
    disabled: {
      name: 'Disabled',
      description: 'Disable number Input',
      type: { name: 'boolean' },
    },
  },
  args: {
    label: 'Label',
    disabled: false,
    required: true,
    placeholder: 'e.g. 000',
    message: 'Error message',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: (args: React.ComponentProps<typeof DatacomNumberInput>) => (
    <div style={{ width: '272px' }}>
      {' '}
      <DatacomNumberInput min={0} max={100} step={1} {...args} />
    </div>
  ),
};
