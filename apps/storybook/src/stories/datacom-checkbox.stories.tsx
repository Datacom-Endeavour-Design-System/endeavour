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
    variant: {
      name: 'Variant',
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
    label: 'Checkbox Item',
    variant: 'standard',
    required: false,
    disabled: false,
    checked: false,
  },
};

const Template: ComponentStoryFn<typeof DatacomCheckbox> = (args) => (
  <DatacomCheckbox {...args} />
);

export const Single = Template.bind({});
Single.args = {
  label: 'Checkbox Item',
  variant: 'standard',
  checked: false,
};

export const Grouped = (props) => {
  delete props.label;

  return (
    <div>
      <DatacomCheckboxGroup>
        <DatacomCheckbox {...props}>Parent checkbox</DatacomCheckbox>
        <DatacomCheckbox {...props}>Child option 1</DatacomCheckbox>
        <DatacomCheckbox {...props}>Child option 2</DatacomCheckbox>
        <DatacomCheckbox {...props}>Child option 3</DatacomCheckbox>
        <DatacomCheckbox {...props}>Child option 4</DatacomCheckbox>
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

      <div style={{ 'margin-top': '24px' }}>
        <DatacomButton type="submit">Submit</DatacomButton>
      </div>
    </form>
  );
};
