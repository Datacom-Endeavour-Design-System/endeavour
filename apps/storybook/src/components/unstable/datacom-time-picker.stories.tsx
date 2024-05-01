import React, { useRef, useState } from 'react';
import { StoryObj } from '@storybook/react';
import { DatacomTimePicker, DatacomButton } from '@datacom/endeavour-react';

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
    militaryTime: {
      name: '24 hour format',
      description: '24 hour format time picker',
      type: { name: 'boolean' },
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
    militaryTime: false,
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

export const FormSubmission: StoryObj<typeof DatacomTimePicker> = {
  render: () => {
    const formRef = useRef<HTMLFormElement>();
    const [selectedValue, setSelectedValue] = useState<string>('');
    const [submitted, setSubmitted] = useState(false);

    const handleOnChanged = (event: CustomEvent): void => {
      const value = event.detail as string;
      setSelectedValue(value);
      setSubmitted(false);
    };

    const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
      if (formRef.current.checkValidity()) {
        setSubmitted(true);
      } else {
        setSubmitted(false);
      }
    };

    return (
      <form method="post" ref={formRef} onSubmit={handleOnSubmit}>
        <div style={{ width: '272px', marginBottom: '30px' }}>
          <DatacomTimePicker
            label="Enter time"
            placeholder="00:00 AM"
            message="Please enter a valid time"
            minuteInterval={10}
            militaryTime={false}
            required={true}
            value={selectedValue}
            onChanged={handleOnChanged}
          />
          {submitted && (
            <p style={{ color: 'var(--dc-primary-text-color)' }}>
              Form would have been submitted but was prevented
            </p>
          )}
        </div>
        <DatacomButton variant="primary" type="submit">
          Submit
        </DatacomButton>
      </form>
    );
  },
};
