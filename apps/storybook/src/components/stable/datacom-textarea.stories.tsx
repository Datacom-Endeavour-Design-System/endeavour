import React, { useState, useRef } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { DatacomTextarea, DatacomButton } from '@datacom/endeavour-react';

export default {
  title: 'Text Area',
  component: DatacomTextarea,
  argTypes: {
    name: {
      name: 'Name',
      description: 'Name attribute for text area element',
      type: { name: 'string', required: true },
    },
    label: {
      name: 'Label',
      description: 'Label for text area element',
      type: { name: 'string', required: true },
    },
    placeholder: {
      name: 'Placeholder',
      description:
        'Placeholder text that is displayed when the text area is focused',
      type: { name: 'string' },
    },
    message: {
      name: 'Error message',
      defaultValue: 'Please complete this field.',
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
      description: 'Prepopulated input value',
      type: { name: 'string', required: false },
    },
    disabled: {
      name: 'Disabled',
      defaultValue: false,
      description: 'Disable button',
      type: { name: 'boolean' },
    },
    isValid: {
      name: 'Is valid',
      description: 'Is the input valid (show error otherwise)',
      type: { name: 'boolean' },
    },
    maxlength: {
      name: 'Max character length',
      description: 'Maximum number of characters',
      type: { name: 'number' },
    },
  },
  args: {
    name: 'Name',
    label: 'Label',
    placeholder: 'Example text',
    message: 'Please complete this field.',
    disabled: false,
  },
} as Meta<typeof DatacomTextarea>;

const Template: StoryFn<typeof DatacomTextarea> = (args) => (
  <div style={{ width: '300px' }}>
    {' '}
    <DatacomTextarea {...args} />
  </div>
);

export const Standard = Template.bind({});

export const WithHelperText = Template.bind({});
WithHelperText.args = {
  help: 'Make sure to complete this field.',
};

export const WithError = Template.bind({});
WithError.args = {
  isValid: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Label',
  disabled: true,
};

export const FormSubmission = () => {
  const form = useRef<HTMLFormElement>();
  const [submitted, setSubmitted] = useState(false);

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
      <div style={{ width: '300px' }}>
        <DatacomTextarea
          name="textarea"
          required
          autoValidate
          message="Please enter value"
          placeholder="Example text"
          label="Label"></DatacomTextarea>
      </div>
      <br />
      {submitted && (
        <p style={{ color: 'var(--dc-primary-text-color)' }}>
          Form would have been submitted but was prevented
        </p>
      )}
      <div style={{ marginTop: '24px' }}>
        <DatacomButton variant="primary" type="submit">
          Submit
        </DatacomButton>
      </div>
    </form>
  );
};
