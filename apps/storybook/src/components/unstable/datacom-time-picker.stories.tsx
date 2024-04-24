import React from 'react';
import { StoryObj } from '@storybook/react';
import { DatacomTimePicker } from '@datacom/endeavour-react';

export default {
  title: 'Time Picker',
  component: DatacomTimePicker,
  argTypes: {
    label: {
      name: 'Label',
      description: 'Time picker label',
      type: { name: 'string' },
    },
    placeholder: {
      name: 'Placeholder',
      description: 'Time picker placeholder',
      type: { name: 'string' },
    },
    message: {
      name: 'Error message',
      description:
        'Error if validation fails or explicitly set with "valid" property',
      type: { name: 'string' },
    },
    minuteInterval: {
      name: 'Minute interval',
      description: 'Minute interval. Defaults to interval of 1.',
      control: {
        type: 'select',
      },
      options: [1, 5, 10, 15, 20, 30],
      type: { name: 'number' },
    },
    disabled: {
      name: 'Disabled',
      description: 'Controls disable state of time picker',
      type: { name: 'boolean' },
    },
    required: {
      name: 'Required',
      description: 'Time picker required',
      type: { name: 'boolean' },
    },
    isValid: {
      name: 'Is valid',
      description: 'Is the input valid (show error otherwise)',
      type: { name: 'boolean' },
    },
  },
  args: {
    label: 'Enter time',
    placeholder: '00:00 AM',
    message: 'Error message',
    minuteInterval: 10,
    disabled: false,
    required: false,
  },
};

export const Default: StoryObj<typeof DatacomTimePicker> = {
  render: (props) => {
    return (
      <div style={{ width: '272px' }}>
        <DatacomTimePicker {...props} />
      </div>
    );
  },
};
