import React, { useState, useEffect, useRef } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { DatacomInput, DatacomButton } from '@datacom/endeavour-react';
import styled from '@emotion/styled';

type IndicatorType = 'none' | 'working' | 'done';

export default {
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
    valid: {
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
      name: 'Max length',
      description: 'Maximum number of characters',
      type: { name: 'number' },
    },
    indicator: {
      table: { disable: false },
      name: 'Indicator',
      description: 'Feedback indicator in edit mode',
      control: 'select',
      options: ['none', 'working', 'done'],
      type: { name: 'string', required: false },
    },
    title: {
      name: 'Title',
      description: 'Hover title on the edit input',
      type: { name: 'string', required: false },
    },
    size: {
      name: 'Size',
      description: 'Size of input control (characters)',
      type: { name: 'number' },
    },
  },
  args: {
    label: 'Label',
    disabled: false,
    required: true,
    placeholder: 'Example text',
    message: 'Error message',
  },
} as Meta<typeof DatacomInput>;

const Template: StoryFn<typeof DatacomInput> = (props) => {
  const Panel = styled.div`
    width: 272px;
  `;
  return (
    <Panel>
      <DatacomInput {...props} type="email" />
    </Panel>
  );
};

export const Standard = Template.bind({});
Standard.args = {};

export const WithHelperText = Template.bind({});
WithHelperText.args = {
  help: 'Make sure to complete this field.',
};

export const WithIndicators = () => {
  const [indicator, setIndicator] = useState<IndicatorType>('none');
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

  const Panel = styled.div`
    width: 272px;
  `;

  return (
    <>
      <Panel>
        <DatacomInput
          label="Email address"
          title="You email address"
          placeholder="Enter Email address"
          required={true}
          value="example@email.com"
          indicator={indicator}
          message="Please enter valid email"
        />
      </Panel>

      <div>
        {iterations > 3 && (
          <small style={{ color: 'var(--dc-primary-text-color)' }}>
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

export const FormSubmission = () => {
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
          placeholder="First names"
          required={true}
          message="Please enter your first name"
          indicator="none"
        />

        <DatacomInput
          label="Surname"
          title="Your family or surname"
          placeholder="Surname"
          help="Enter your family or surname"
          required={true}
          message="Please enter your surname"
          indicator="none"
        />

        <DatacomInput
          label="Telephone"
          title="Enter a phone number with numbers only"
          help="Enter a phone number with numbers only"
          message="Please enter a valid phone number"
          placeholder="Home or Mobile"
          pattern="^\d*$"
          required={true}
          indicator="none"
        />

        <DatacomInput
          label="Email"
          type="email"
          title="Enter a email address"
          help="Enter email address"
          message="Please enter a valid email"
          placeholder="Email address"
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
};
