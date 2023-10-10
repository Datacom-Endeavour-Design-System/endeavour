import React, { useState, useRef } from 'react';
import { ComponentStoryFn, Meta } from '@storybook/react';
import { DatacomTextarea, DatacomButton } from '@datacom/endeavour-react';

export default {
  title: 'Text Area',
  component: DatacomTextarea,
  argTypes: {
    name: {
      name: 'Name',
      defaultValue: 'Name',
      description: 'Name attribute for text area element',
      type: { name: 'string', required: true },
    },
    label: {
      name: 'Label',
      defaultValue: 'Label',
      description: 'Label for text area element',
      type: { name: 'string', required: true },
    },
    placeholder: {
      name: 'Placeholder',
      defaultValue: 'Example text',
      description:
        'Placeholder text that is displayed when the text area is focused',
      type: { name: 'string' },
    },
    value: {
      name: 'Value',
      description: 'Prepopulated input value',
      type: { name: 'string', required: false },
    },
    message: {
      name: 'Error Message',
      defaultValue: 'Please complete this field.',
      description:
        'Error if validation fails or explicitly set with "valid" property',
      type: { name: 'string', required: false },
    },
    help: {
      name: 'Help Text',
      description: 'Assistance instructions below input',
      type: { name: 'string', required: false },
    },
    isValid: {
      name: 'Is Valid',
      description: 'Is the input valid (show error otherwise)',
      type: { name: 'boolean' },
    },
    maxlength: {
      name: 'Max Character Length',
      description: 'Maximum number of characters',
      type: { name: 'number' },
    },
    disabled: {
      name: 'Disabled',
      defaultValue: false,
      description: 'Disable button',
      type: { name: 'boolean' },
    },
  },
} as Meta<typeof DatacomTextarea>;
const Template: ComponentStoryFn<typeof DatacomTextarea> = (args) => (
  <div style={{ width: '300px' }}>
    {' '}
    <DatacomTextarea {...args} />
  </div>
);

export const Standard = Template.bind({});

export const HelperText = Template.bind({});
HelperText.args = {
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
      {submitted && <p>Form would have been submitted but was prevented</p>}
      <div style={{ marginTop: '24px' }}>
        <DatacomButton variant="primary" type="submit">
          Submit
        </DatacomButton>
      </div>
    </form>
  );
};
