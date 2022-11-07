import React, { useState, useEffect } from 'react';
import { ComponentStoryFn, Meta } from '@storybook/react';
import { DatacomInput, DatacomButton } from '@datacom/endeavour-react';

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
      name: 'Valid',
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
    message: 'Please enter a value',
  },
} as Meta<typeof DatacomInput>;

const Template: ComponentStoryFn<typeof DatacomInput> = (args) => (
  <DatacomInput {...args} />
);

export const Simple = Template.bind({});
Simple.args = {};

export const DisabledNoContent = Template.bind({});
DisabledNoContent.args = {
  label: 'First name',
  disabled: true,
};

export const DisabledWithContent = Template.bind({});
DisabledWithContent.args = {
  label: 'First name',
  value: 'James',
  disabled: true,
};

export const Overflow = Template.bind({});
Overflow.args = {
  label: 'First name',
  title: 'Enter more than 15 characters and tab out to see scroll to start',
  value: 'This is a really big name and does not fit into view',
  size: 15,
  maxlength: 50,
};

export const WithValue = Template.bind({});
WithValue.args = {
  title: 'This input already has a value',
  label: 'First name',
  value: 'James',
};

export const AlreadyInError = Template.bind({});
AlreadyInError.args = {
  message: 'Please enter your first name',
  label: 'First name',
  valid: false,
};

export const PatternWithHelp = Template.bind({});
PatternWithHelp.args = {
  label: 'Phone number',
  pattern: '^d*$',
  size: 15,
  maxlength: 12,
  placeholder: 'Mobile or Home number',
  title: 'A phone number may only contain numbers (no spaces)',
  help: 'Enter a phone number with numbers only',
  message: 'Please enter a valid phone number',
};

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
  return (
    <form>
      <div style={{ width: '400px', marginBottom: '20px' }}>
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
          pattern="^d*$"
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
      </div>

      <DatacomButton variant="primary" type="submit">
        Submit
      </DatacomButton>
    </form>
  );
};
