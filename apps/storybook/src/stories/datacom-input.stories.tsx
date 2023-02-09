import React, { useState, useEffect, useRef } from 'react';
import { ComponentStoryFn, Meta } from '@storybook/react';
import { DatacomInput, DatacomButton } from '@datacom/endeavour-react';
import styled from '@emotion/styled';

export default {
  title: 'Text Input',
  component: DatacomInput,
  argTypes: {
    label: {
      name: 'Label',
      defaultValue: 'Input label',
      description: 'Input label',
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
    pattern: {
      name: 'Pattern',
      description: 'Validate the control using regular expression',
      type: { name: 'string', required: false },
    },
    title: {
      name: 'Title',
      description: 'Hover title on the edit input',
      type: { name: 'string', required: false },
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
      name: 'Is Valid',
      description: 'Is the input valid (show error otherwise)',
      type: { name: 'boolean' },
    },
    required: {
      name: 'Required',
      description: 'Is the input required',
      type: { name: 'boolean' },
    },
    size: {
      name: 'Size',
      description: 'Size of input control (characters)',
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
    indicator: {
      name: 'Indicator',
      description: 'Feedback indicator in edit mode',
      control: 'select',
      defaultValue: 'none',
      options: ['none', 'working', 'done'],
      type: { name: 'string', required: false },
    },
  },
  args: {
    label: 'First name',
    disabled: false,
    required: true,
    placeholder: 'Enter your first name',
    message: 'First name is required',
  },
} as Meta<typeof DatacomInput>;

const Template: ComponentStoryFn<typeof DatacomInput> = (props) => {
  const Panel = styled.div`
    width: 300px;
  `;

  return (
    <Panel>
      <DatacomInput {...props} />
    </Panel>
  );
};

export const TextInput = Template.bind({});
TextInput.args = {};

export const WithIndicators = () => {
  const [indicator, setIndicator] = useState('none');
  const [iterations, setIterations] = useState(0);

  useEffect(() => {
    if (indicator == 'none') {
      setTimeout(() => setIndicator('working'), 1000);
    } else if (indicator == 'working') {
      setTimeout(() => {
        setIndicator('done');
        setIterations(iterations + 1);
      }, 3000);
    }
  });

  const disabled = indicator == 'none' || indicator == 'working';

  return (
    <>
      <DatacomInput
        label="First name"
        title="You first names (including middle)"
        placeholder="First names"
        required={true}
        value="William"
        indicator={indicator}
        message="Please enter your first name"
      />

      <div>
        {iterations > 3 && (
          <small>
            {iterations} clicks and counting. Keep going for a high score.
          </small>
        )}
        {iterations > 0 && (
          <DatacomButton
            disabled={disabled}
            variant="primary"
            onClick={() => setIndicator('none')}>
            Again...
          </DatacomButton>
        )}
      </div>
    </>
  );
};

export const VerticalForm = () => {
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

  const Panel = styled.div`
    width: 300px;
    margin-bottom: 30px;
    datacom-input {
      margin-bottom: 12px;
    }
  `;

  return (
    <form method="post" ref={form} onSubmit={handleSubmit}>
      <Panel>
        <DatacomInput
          label="First name(s)"
          title="You first names (including middle)"
          help="Enter your first names (inc. middle)"
          placeholder="First names"
          required={true}
          message="Please enter your first name"
        />

        <DatacomInput
          label="Surname"
          title="Your family or surname"
          placeholder="Surname"
          help="Enter your family or surname"
          required={true}
          message="Please enter your surname"
        />

        <DatacomInput
          label="Telephone"
          title="Enter a phone number with numbers only"
          help="Enter a phone number with numbers only"
          message="Please enter a valid phone number"
          placeholder="Home or Mobile"
          pattern="^\d*$"
          required={true}
        />

        <DatacomInput
          label="Email"
          type="email"
          title="Enter a email address"
          help="Enter email address"
          message="Please enter a valid email"
          placeholder="Email address"
          required={true}
        />

        {submitted && <p>Form would have been submitted but was prevented</p>}
      </Panel>

      <div>
        <DatacomButton variant="primary" type="submit">
          Submit
        </DatacomButton>
      </div>
    </form>
  );
};
