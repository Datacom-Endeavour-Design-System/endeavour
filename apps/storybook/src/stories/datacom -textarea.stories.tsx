import React, { useState, useEffect, useRef } from 'react';
import { ComponentStoryFn, Meta } from '@storybook/react';
import { DatacomTextarea, DatacomButton } from '@datacom/endeavour-react';
export default {
  title: 'Text Area',
  component: DatacomTextarea,
  argTypes: {
    label: {
      name: 'Label',
      defaultValue: 'Textarea label',
      description: 'Textarea label',
      type: { name: 'string', required: true },
    },
    name: {
      name: 'Name',
      defaultValue: 'Textarea Name',
      description: 'Textarea Name',
      type: { name: 'string', required: true },
    },
    value: {
      name: 'Value',
      description: 'Prepopulated input',
      type: { name: 'string', required: false },
    },
    placeholder: {
      name: 'Placeholder',
      defaultValue: 'Enter a value',
      description: 'Input placeholder prompt',
      type: { name: 'string', required: false },
    },
    rows: {
      name: 'Rows',
      description: 'rows of textarea ',
      type: { name: 'number' },
    },
    cols: {
      name: 'Cols',
      description: 'columns of textarea ',
      type: { name: 'number' },
    },
    counter: {
      name: 'Character Counter',
      description: 'Charaters counts in the textarea field ',
      type: { name: 'number', required: false },
    },

    message: {
      name: 'Error Message',
      description:
        'Error if validation fails or explicitly set with "valid" property',
      type: { name: 'string', required: false },
    },
    help: {
      name: 'Help text',
      description: 'Assistance instructions below input',
      type: { name: 'string', required: false },
    },
    valid: {
      name: 'Valid',
      description: 'Is the input valid (show error otherwise)',
      type: { name: 'boolean' },
    },
    required: {
      name: 'Required',
      description: 'Is the input required',
      type: { name: 'boolean' },
    },

    minlength: {
      name: 'Min length',
      description: 'Maximum number of characters',
      type: { name: 'number' },
    },
    maxlength: {
      name: 'Max length',
      description: 'Maximum number of characters',
      type: { name: 'number' },
    },
    disabled: {
      name: 'Disabled',
      description: 'Disable button',
      type: { name: 'boolean' },
    },
  },
  args: {
    label: 'Label',
    disabled: false,
    required: true,
    message: 'Fill this.',
    vaild: false,
  },
} as Meta<typeof DatacomTextarea>;
const Template: ComponentStoryFn<typeof DatacomTextarea> = (args) => (
  <div style={{ width: '300px' }}>
    {' '}
    <DatacomTextarea {...args} />
  </div>
);
export const Standard = Template.bind({});
Standard.args = {};
export const HelperText = Template.bind({});
HelperText.args = {
  help: 'Make sure complete this.',
};
export const WithError = Template.bind({});
WithError.args = {
  message: 'Please Complet this field.',
  label: 'Label',
  valid: false,
};
export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled',
  disabled: true,
};
export const FormSubmition = () => {
  const form = useRef<HTMLFormElement>();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: SubmitEvent) => {
    if (form.current.checkValidity()) {
      setSubmitted(true);
      event.preventDefault();
    } else {
      setSubmitted(false);
    }
  };
  return (
    <form method="post" ref={form} onSubmit={handleSubmit}>
      <div style={{ width: '300px' }}>
        <DatacomTextarea
          name="textarea"
          required
          autoValidat
          message="Please enter value">
          {' '}
          Label
        </DatacomTextarea>
      </div>
      <br />
      <div style={{ margin: '24px' }}>
        <DatacomButton variant="primary" type="submit">
          Submit
        </DatacomButton>
      </div>
    </form>
  );
};
