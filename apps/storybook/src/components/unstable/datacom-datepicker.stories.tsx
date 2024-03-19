import React from 'react';
import { StoryObj } from '@storybook/react';
import { DatacomDatepicker } from '@datacom/endeavour-react';

const currentDate = new Date();
export default {
  title: 'Datepicker',
  component: DatacomDatepicker,
  argTypes: {
    label: {
      name: 'Label',
      description: 'Datepicker label',
      type: { name: 'string' },
    },
    placeholder: {
      name: 'Placeholder',
      description: 'Datepicker placeholder',
      type: { name: 'string' },
    },
    dateFormat: {
      name: 'Date format',
      description: 'Date format. Default is "dd/MM/yyyy"',
      type: { name: 'string' },
    },
    required: {
      name: 'Required',
      description: 'Datepicker required',
      type: { name: 'boolean' },
    },
    disabled: {
      name: 'Disabled',
      description: 'Datepicker disabled',
      type: { name: 'boolean' },
    },
    message: {
      name: 'Error message',
      description:
        'Error if validation fails or explicitly set with "valid" property',
      type: { name: 'string' },
    },
  },
  args: {
    label: '',
    placeholder: '',
    dateFormat: 'dd/MM/yyyy',
    disabled: false,
    required: false,
    message: 'Error message',
  },
};

export const SingleDate: StoryObj<typeof DatacomDatepicker> = {
  args: {
    label: 'Select a date',
    placeholder: 'DD/MM/YYYY',
  },
  render: (props) => {
    return (
      <div style={{ width: '272px' }}>
        <DatacomDatepicker {...props} selectedDate={currentDate} />
      </div>
    );
  },
};

export const DateRange: StoryObj<typeof DatacomDatepicker> = {
  args: {
    label: 'Select dates',
    placeholder: 'DD/MM/YYYY - DD/MM/YYYY',
  },
  render: (props) => {
    return (
      <div style={{ width: '400px' }}>
        <DatacomDatepicker
          {...props}
          range={true}
          startDate={currentDate}
          endDate={currentDate}
        />
      </div>
    );
  },
};
