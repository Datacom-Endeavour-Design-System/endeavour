import React, { useState, useRef } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { DatacomInput, DatacomButton } from '@datacom/endeavour-react';

import styled from '@emotion/styled';

const meta: Meta<typeof DatacomInput> = {
  title: 'Text Input',
  component: DatacomInput,
  argTypes: {
    label: {
      name: 'Label',
      description: 'Input label',
      type: { name: 'string', required: false },
    },
    placeholder: {
      name: 'Placeholder',
      description: 'Input placeholder prompt',
      type: { name: 'string', required: false },
    },
    message: {
      name: 'Error message',
      description:
        'Error if validation fails or explicitly set with "valid" property',
      type: { name: 'string', required: false },
    },
    help: {
      name: 'Help text',
      description: 'Assistance instructions below input',
      type: { name: 'string', required: false },
    },
    value: {
      name: 'Value',
      description: 'Prepopulated input',
      type: { name: 'string', required: false },
    },
    disabled: {
      name: 'Disabled',
      description: 'Disable button',
      type: { name: 'boolean' },
    },
    required: {
      name: 'Required',
      description: 'Is the input required',
      type: { name: 'boolean' },
    },
    isValid: {
      name: 'Is valid',
      description: 'Is the input valid (show error otherwise)',
      type: { name: 'boolean' },
    },
    pattern: {
      name: 'Pattern',
      description: 'Validate the control using regular expression',
      type: { name: 'string', required: false },
    },
    maxlength: {
      name: 'Character limit',
      description: 'Maximum number of characters',
      type: { name: 'number' },
    },
    title: {
      name: 'Tooltip label',
      description: 'Hover title on the edit input',
      type: { name: 'string', required: false },
    },
  },
  args: {
    label: 'Label',
    disabled: false,
    required: true,
    placeholder: 'Example text',
    message: 'Error message',
  },
};

export default meta;

export const FormSubmission: StoryObj<typeof DatacomInput> = {
  render: () => {
    const form = useRef<HTMLFormElement>();
    const [submitted, setSubmitted] = useState(false);

    const Panel = styled.div`
      width: 272px;
      margin-bottom: 30px;
      datacom-input {
        margin-bottom: 12px;
      }
    `;

    return (
      <form
        method="post"
        ref={form}
        onSubmit={(event) => {
          if (form.current.checkValidity()) {
            setSubmitted(true);
            event.preventDefault();
          } else {
            setSubmitted(false);
          }
        }}>
        <Panel>
          <DatacomInput
            label="First name(s)"
            title="You first names (including middle)"
            help="Enter your first names (inc. middle)"
            placeholder="Enter first name(s)"
            required={true}
            message="Please enter your first name"
            indicator="none"
          />
          <DatacomInput
            label="Last name"
            title="Your family or surname"
            placeholder="Enter last name"
            help="Enter your family or surname"
            required={true}
            message="Please enter your surname"
            indicator="none"
          />
          <DatacomInput
            label="Phone number"
            title="Enter a phone number with numbers only"
            help="Enter a contact number using numerical digits only”"
            message="Please enter a valid phone number"
            placeholder="Home or Mobile"
            pattern="^\d*$"
            required={true}
            indicator="none"
          />{' '}
          <br></br>
          <DatacomInput
            label="Email"
            type="email"
            title="Enter a email address"
            help="Enter your email address"
            message="Please enter a valid email"
            placeholder="Enter email address"
            required={true}
            indicator="none"
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
