import React, { useRef, useState } from 'react';
import { StoryObj } from '@storybook/react';
import { DatacomDatepicker, DatacomButton } from '@datacom/endeavour-react';
import styled from '@emotion/styled';

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
      description:
        'Acceptable date format. Default to "dd/MM/yyyy". Reference: https://date-fns.org/v3.6.0/docs/format',
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
        'Error message if validation fails. Validate required and date format',
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

export const FormSubmission: StoryObj<typeof DatacomDatepicker> = {
  render: () => {
    const form = useRef<HTMLFormElement>();
    const [submitted, setSubmitted] = useState(false);

    const Panel = styled.div`
      width: 272px;
      margin-bottom: 30px;
      datacom-datepicker {
        margin-bottom: 12px;
      }
    `;

    return (
      <form
        method="post"
        ref={form}
        onSubmit={(event) => {
          event.preventDefault();
          if (form.current.checkValidity()) {
            setSubmitted(true);
          } else {
            setSubmitted(false);
          }
        }}>
        <Panel>
          <DatacomDatepicker
            label="Select a date"
            placeholder="DD/MM/YYYY"
            message="Please enter a valid date"
            dateFormat="dd/MM/yyyy"
            required
          />
          <DatacomDatepicker
            label="Select dates"
            placeholder="DD/MM/YYYY - DD/MM/YYYY"
            message="Please enter a valid date"
            dateFormat="dd/MM/yyyy"
            range
            required
          />
          {submitted && (
            <p style={{ color: 'var(--dc-primary-text-color)' }}>
              Form would have been submitted but was prevented
            </p>
          )}
        </Panel>
        <div>
          <DatacomButton variant="primary" type="submit">
            Submit
          </DatacomButton>
        </div>
      </form>
    );
  },
};
