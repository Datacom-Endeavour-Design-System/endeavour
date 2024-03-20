import React, { useRef, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import {
  DatacomCheckbox,
  DatacomCheckboxGroup,
  DatacomButton,
} from '@datacom/endeavour-react';
import styled from '@emotion/styled';

const meta: Meta<typeof DatacomCheckbox> = {
  title: 'Checkbox',
  component: DatacomCheckbox,
  argTypes: {
    label: {
      name: 'Label',
      defaultValue: 'Checkbox Item',
      description: 'checkbox label',
      type: { name: 'string' },
    },
    variant: {
      name: 'Size',
      description:
        'checkbox size within variant. Defaults to standard if not set',
      control: {
        type: 'select',
        labels: {
          standard: 'Standard',
          small: 'Small',
        },
      },
      defaultValue: 'standard',
      options: ['standard', 'small'],
      type: { name: 'string' },
    },
    checked: {
      name: 'Selected',
      description: 'Checked Checkbox',
      type: { name: 'boolean' },
    },
    indeterminate: {
      name: 'Indeterminate',
      description: 'Show the field in an indeterminate state',
      type: { name: 'boolean' },
    },
    disabled: {
      name: 'Disabled',
      description: 'Disable Checkbox',
      type: { name: 'boolean' },
    },
    required: {
      name: 'Required',
      description: 'Required Field',
      type: { name: 'boolean' },
    },
  },
  args: {
    label: 'Checkbox Item',
    variant: 'standard',
    required: false,
    disabled: false,
    checked: false,
  },
};

export default meta;

export const Default: StoryObj<typeof DatacomCheckbox> = {
  args: {
    label: 'Checkbox Item',
    variant: 'standard',
    checked: false,
  },
};

export const CheckboxGrouping: StoryObj<typeof DatacomCheckbox> = {
  render: (props) => {
    const custom = (({ label, ...object }) => object)(props);

    return (
      <div>
        <DatacomCheckboxGroup>
          <DatacomCheckbox {...custom}>Parent checkbox</DatacomCheckbox>
          <DatacomCheckbox {...custom}>Child option 1</DatacomCheckbox>
          <DatacomCheckbox {...custom}>Child option 2</DatacomCheckbox>
          <DatacomCheckbox {...custom}>Child option 3</DatacomCheckbox>
          <DatacomCheckbox {...custom}>Child option 4</DatacomCheckbox>
        </DatacomCheckboxGroup>
      </div>
    );
  },
};

export const FormValidation: StoryObj<typeof DatacomCheckbox> = {
  args: {
    label: 'I agree to terms and conditions',
    required: true,
    message: 'Please agree to the terms',
  },
  render: (props) => {
    const form = useRef<HTMLFormElement>();
    const [submitted, setSubmitted] = useState(false);

    const ButtonPanel = styled.div`
      margin-top: 24px;
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
        <div>
          <DatacomCheckbox {...props} />
          {submitted && (
            <p style={{ color: 'var(--dc-primary-text-color)' }}>
              Form would have been submitted but was prevented
            </p>
          )}
        </div>
        <ButtonPanel>
          <DatacomButton type="submit">Submit</DatacomButton>
        </ButtonPanel>
      </form>
    );
  },
};
