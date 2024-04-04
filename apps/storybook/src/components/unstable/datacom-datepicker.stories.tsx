import React, { useRef, useState } from 'react';
import { StoryFn, StoryObj } from '@storybook/react';
import { DatacomDatepicker, DatacomButton } from '@datacom/endeavour-react';

export default {
  title: 'Date Picker',
  component: DatacomDatepicker,
  argTypes: {
    label: {
      name: 'Label',
      description: 'Date picker label',
      type: { name: 'string' },
    },
    placeholder: {
      name: 'Placeholder',
      description: 'Date picker placeholder',
      type: { name: 'string' },
    },
    message: {
      name: 'Error message',
      description:
        'Error if validation fails or explicitly set with "valid" property',
      type: { name: 'string' },
    },
    dateFormat: {
      name: 'Date format',
      description:
        'Date format value of date picker. Reference: https://date-fns.org/v3.6.0/docs/format',
      type: { name: 'string' },
    },
    supportedFormat: {
      name: 'Supported date format',
      description:
        'Supported date format to input in date picker. Reference: https://date-fns.org/v3.6.0/docs/format',
      control: {
        type: 'object',
      },
    },
    disabled: {
      name: 'Disabled',
      description: 'Date picker disabled',
      type: { name: 'boolean' },
    },
    required: {
      name: 'Required',
      description: 'Date picker required',
      type: { name: 'boolean' },
    },
    isValid: {
      name: 'Is valid',
      description: 'Is the input valid (show error otherwise)',
      type: { name: 'boolean' },
    },
  },
  args: {
    label: '',
    placeholder: '',
    message: 'Error message',
    dateFormat: 'dd/MM/yyyy',
    supportedFormat: ['MMMM', 'dd MMMM', 'dd MMMM yyyy', 'ddMM', 'ddMMyyyy'],
    disabled: false,
    required: false,
  },
};

export const SingleDate: StoryObj<typeof DatacomDatepicker> = {
  args: {
    label: 'Enter date',
    placeholder: 'DD/MM/YYYY',
  },
  render: (props) => {
    return (
      <div style={{ width: '272px' }}>
        <DatacomDatepicker {...props} />
      </div>
    );
  },
};

export const DateRange: StoryObj<typeof DatacomDatepicker> = {
  args: {
    label: 'Enter dates',
    placeholder: 'Start - End',
  },
  render: (props) => {
    return (
      <div style={{ width: '272px' }}>
        <DatacomDatepicker {...props} range={true} />
      </div>
    );
  },
};

export const FormSubmission: StoryFn<typeof DatacomDatepicker> = () => {
  const form = useRef<HTMLFormElement>();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [startDate, setStartDate] = useState<Date>();
  const [endaDate, setEndDate] = useState<Date>();
  const [submitted, setSubmitted] = useState(false);

  const handleOnChanged = (event: CustomEvent): void => {
    setSubmitted(false);
    if (event.detail instanceof Array) {
      const [newStartDate, newEndDate] = event.detail as Date[];
      setStartDate(newStartDate);
      setEndDate(newEndDate);
    }
    if (event.detail instanceof Date) {
      setSelectedDate(event.detail);
    }
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (form.current.checkValidity()) {
      setSubmitted(true);
    } else {
      setSubmitted(false);
    }
  };

  return (
    <form method="post" ref={form} onSubmit={handleOnSubmit}>
      <div style={{ width: '272px', marginBottom: '30px' }}>
        <DatacomDatepicker
          label="Enter date"
          placeholder="DD/MM/YYYY"
          message="Please enter a valid date"
          required={true}
          selectedDate={selectedDate}
          onChanged={handleOnChanged}
          style={{ marginBottom: '12px' }}
        />
        <DatacomDatepicker
          label="Enter dates"
          placeholder="Start - End"
          message="Please enter a valid date range"
          range={true}
          required={true}
          startDate={startDate}
          endDate={endaDate}
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
};
