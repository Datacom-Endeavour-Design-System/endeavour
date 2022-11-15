import React, { useRef, useState } from 'react';
import { ComponentStoryFn } from '@storybook/react';
import {
  DatacomCheckbox,
  DatacomCheckboxGroup,
  DatacomButton,
} from '@datacom/endeavour-react';

export default {
  title: 'Checkbox',
  component: DatacomCheckbox,
  argTypes: {
    label: {
      name: 'Label',
      defaultValue: 'Checkbox Item',
      description: 'checkbox label',
      type: { label: 'string' },
    },
    size: {
      name: 'Size',
      description:
        'checkbox size within variant. Defaults to standard if not set',
      control: 'select',
      defaultValue: 'standard',
      options: ['standard', 'small'],
      type: { label: 'string' },
    },
    checked: {
      name: 'Selected',
      description: 'Checked Checkbox',
      type: { name: 'boolean' },
    },
    unknown: {
      name: 'Unknown',
      description: 'Show the field in an unknown state',
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
  arg: {
    label: 'Checkbox',
    size: 'standard',
    required: false,
    disabled: false,
    checked: false,
  },
};

const Template: ComponentStoryFn<typeof DatacomCheckbox> = (args) => (
  <DatacomCheckbox {...args} />
);

export const Standard = Template.bind({});
Standard.args = {
  label: 'Checkbox Item',
  size: 'standard',
  checked: false,
};

export const Small = Template.bind({});
Small.args = {
  label: 'Checkbox Item',
  size: 'small',
  checked: false,
};

export const GroupedStandard = () => {
  return (
    <div>
      <DatacomCheckboxGroup>
        <DatacomCheckbox>Parent checkbox</DatacomCheckbox>
        <DatacomCheckbox>Child option 1</DatacomCheckbox>
        <DatacomCheckbox>Child option 2</DatacomCheckbox>
        <DatacomCheckbox>Child option 3</DatacomCheckbox>
        <DatacomCheckbox>Child option 4</DatacomCheckbox>
      </DatacomCheckboxGroup>
    </div>
  );
};

export const GroupedSmall = () => {
  return (
    <div>
      <DatacomCheckboxGroup>
        <DatacomCheckbox size="small">Parent checkbox</DatacomCheckbox>
        <DatacomCheckbox size="small">Child option 1</DatacomCheckbox>
        <DatacomCheckbox size="small">Child option 2</DatacomCheckbox>
        <DatacomCheckbox size="small">Child option 3</DatacomCheckbox>
        <DatacomCheckbox size="small">Child option 4</DatacomCheckbox>
      </DatacomCheckboxGroup>
    </div>
  );
};

export const FormValidation = () => {
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
      <div>
        <DatacomCheckbox required={true} message="Please agree to the terms">
          I agree to terms and conditions
        </DatacomCheckbox>

        {submitted && <p>Form would have been submitted but was prevented</p>}
      </div>

      <div>
        <DatacomButton type="submit">Submit</DatacomButton>
      </div>
    </form>
  );
};
