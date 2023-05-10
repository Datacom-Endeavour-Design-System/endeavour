import React from 'react';
import { ComponentStoryFn, Meta } from '@storybook/react';
import { DatacomNumberInput } from '@datacom/endeavour-react';
import styled from '@emotion/styled';

export default {
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
      defaultValue: 'e.g.000',
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
      description: 'step for increment and decrement',
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
    placeholder: 'e.g.000',
    message: 'Error message',
  },
} as Meta<typeof DatacomNumberInput>;

const Template: ComponentStoryFn<typeof DatacomNumberInput> = (props) => {
  const Panel = styled.div`
    width: 272px;
  `;
  return (
    <Panel>
      <DatacomNumberInput min={1} max={50} step={1} {...props} />
    </Panel>
  );
};

export const Default = Template.bind({});
Default.args = {};
