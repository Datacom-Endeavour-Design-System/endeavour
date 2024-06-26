import React, { useState, useRef } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import {
  DatacomTextarea,
  DatacomButton,
} from '@datacom-digital/endeavour-react';

import styled from '@emotion/styled';

export default {
  title: 'Text Area',
  component: DatacomTextarea,
  argTypes: {
    name: {
      name: 'Name',
      description: 'Name attribute for text area element',
      type: { name: 'string', required: true },
      table: { disable: true },
    },
    label: {
      name: 'Label',
      description: 'Label for text area element',
      type: { name: 'string', required: false },
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
      name: 'Helper text',
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
      name: 'Character limit',
      description: 'Maximum number of characters',
      type: { name: 'number' },
    },
  },
  args: {
    name: 'Name',
    label: 'Label',
    placeholder: 'Example text',
    message: 'Please complete this field.',
  },
} as Meta<typeof DatacomTextarea>;

const Template: StoryFn<typeof DatacomTextarea> = (args) => {
  const Panel = styled.div`
    width: 272px;
  `;
  return (
    <Panel>
      <DatacomTextarea {...args} />
    </Panel>
  );
};

export const Default = Template.bind({});

export const WithHelperText = Template.bind({});
WithHelperText.args = {
  help: 'Make sure to complete this field.',
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
      <div style={{ width: '272px' }}>
        <DatacomTextarea
          name="textarea"
          required
          autoValidate
          message="This field is mandatory. Please provide the required information to proceed."
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
