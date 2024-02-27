import React, { useState, useEffect } from 'react';
import { StoryObj, Meta } from '@storybook/react';
import { DatacomInput, DatacomButton } from '@datacom/endeavour-react';
import styled from '@emotion/styled';

type InputProps = React.ComponentProps<typeof DatacomInput>;

type IndicatorType = 'none' | 'working' | 'done';

const meta: Meta<InputProps> = {
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
};

export default meta;
const Panel = styled.div`
  width: 272px;
`;

export const Standard: StoryObj<InputProps> = {
  render: (props) => {
    return (
      <Panel>
        <DatacomInput {...props} type="email" />
      </Panel>
    );
  },
};
export const WithHelperText: StoryObj<InputProps> = {
  render: (props) => {
    return (
      <Panel>
        <DatacomInput
          {...props}
          type="email"
          help="Make sure to complete this field."
        />
      </Panel>
    );
  },
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
