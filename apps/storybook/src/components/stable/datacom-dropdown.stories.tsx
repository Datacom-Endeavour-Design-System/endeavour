import React, { useRef, useState } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import {
  DatacomButton,
  DatacomDropdown,
  DatacomOption,
} from '@datacom-digital/endeavour-react';
type DatacomDropdownProps = React.ComponentProps<typeof DatacomDropdown>;
const meta: Meta<typeof DatacomDropdown> = {
  title: 'Dropdown',
  component: DatacomDropdown,
  argTypes: {
    label: {
      name: 'Label',
      description: 'Dropdown label',
      type: { name: 'string' },
    },
    variant: {
      name: 'Variant',
      description: 'Dropdown variant. Defaults to standard if not set.',
      control: {
        type: 'select',
        labels: {
          standard: 'Default',
          multi: 'Multi-select',
          combobox: 'Combobox',
        },
      },
      options: ['standard', 'multi', 'combobox'],
      type: { name: 'string', required: true },
    },
    message: {
      name: 'Error message',
      description: 'Error message displayed in error state.',
      type: { name: 'string' },
    },
    placeholder: {
      name: 'Placeholder (multi + combobox)',
      description:
        'Placeholder text placed in search field of combobox & multi variant.',
      type: { name: 'string' },
    },
    disabled: {
      name: 'Disabled',
      description: 'Controls disable state of dropdown',
      type: { name: 'boolean' },
    },
    isValid: {
      name: 'Is valid',
      description: "Controls whether component is in it's error state.",
      type: { name: 'boolean' },
    },
  },
  args: {
    label: 'Label',
    variant: 'standard',
  },
};
export default meta;

const StandardTemplate: StoryFn<DatacomDropdownProps> = (args) => (
  <div style={{ maxWidth: 272 }}>
    <DatacomDropdown {...args}>
      <DatacomOption value="1" label="Option 1"></DatacomOption>
      <DatacomOption value="2" label="Option 2"></DatacomOption>
      <DatacomOption value="3" label="Option 3"></DatacomOption>
      <DatacomOption value="4" label="Option 4"></DatacomOption>
      <DatacomOption value="5" label="Option 5"></DatacomOption>
    </DatacomDropdown>
  </div>
);

export const Default = StandardTemplate.bind({});
Default.args = {
  label: 'Label',
  message: 'Please select an option',
  placeholder: 'Placeholder',
  variant: 'standard',
};

export const MultiSelect: StoryObj<typeof DatacomDropdown> = {
  args: {
    label: 'Label',
    variant: 'multi',
    message: 'Please select an option',
    placeholder: 'Select item(s)',
  },
  render: (props) => {
    return (
      <div style={{ maxWidth: 272 }}>
        <DatacomDropdown {...props}>
          <DatacomOption value="1" label="Option 1"></DatacomOption>
          <DatacomOption value="2" label="Option 2"></DatacomOption>
          <DatacomOption value="3" label="Option 3"></DatacomOption>
          <DatacomOption value="4" label="Option 4"></DatacomOption>
          <DatacomOption value="5" label="Option 5"></DatacomOption>
        </DatacomDropdown>
      </div>
    );
  },
};

export const Combobox: StoryObj<typeof DatacomDropdown> = {
  args: {
    label: 'Label',
    variant: 'combobox',
    message: 'Please select an option',
    placeholder: 'Search...',
  },
  render: (props) => {
    return (
      <div style={{ maxWidth: 272 }}>
        <DatacomDropdown {...props}>
          <DatacomOption value="1" label="Option 1"></DatacomOption>
          <DatacomOption value="2" label="Option 2"></DatacomOption>
          <DatacomOption value="3" label="Option 3"></DatacomOption>
          <DatacomOption value="4" label="Option 4"></DatacomOption>
          <DatacomOption value="5" label="Option 5"></DatacomOption>
        </DatacomDropdown>
      </div>
    );
  },
};

const CountryTemplate: StoryFn<DatacomDropdownProps> = (args) => (
  <div style={{ maxWidth: 272 }}>
    <DatacomDropdown {...args}>
      <DatacomOption
        src="/images/dropdown-example-flags/new-zealand.png"
        value="NZ"
        label="New Zealand"
      />
      <DatacomOption
        src="/images/dropdown-example-flags/australia.png"
        value="AU"
        label="Australia"
      />
      <DatacomOption
        src="/images/dropdown-example-flags/kiribati.png"
        value="KI"
        label="Independent and Sovereign Republic of Kiribati"
      />
      <DatacomOption
        src="/images/dropdown-example-flags/great-britain.png"
        search="Great Britain | England | Wales | Scotland"
        value="GB"
        label="Great Britain"
      />
      <DatacomOption
        src="/images/dropdown-example-flags/france.png"
        value="FR"
        label="France"
      />
      <DatacomOption
        src="/images/dropdown-example-flags/italy.png"
        value="IT"
        label="Italy"
      />
      <DatacomOption
        src="/images/dropdown-example-flags/spain.png"
        value="ES"
        label="Spain"
      />
      <DatacomOption
        src="/images/dropdown-example-flags/ukraine.png"
        value="UA"
        label="Ukraine"
      />
    </DatacomDropdown>
  </div>
);

export const WithImages = CountryTemplate.bind({});
WithImages.args = {
  label: 'Country',
  message: 'Please select a country',
  placeholder: 'Select your country',
};

export const FormSubmission: StoryObj<DatacomDropdownProps> = {
  render: () => {
    const formRef = useRef<HTMLFormElement>();
    const dropdownRef = useRef<HTMLDatacomDropdownElement>();
    const [submitted, setSubmitted] = useState(false);
    const [selectedValue, setSelectedValue] = useState([]);
    const [hasError, setHasError] = useState(false);

    const onDropdownChange = (event: CustomEvent) => {
      const value = event.detail as string[];
      setSelectedValue(value);
      setHasError(value.length === 0);
    };
    return (
      <form
        method="post"
        ref={formRef}
        onSubmit={(event) => {
          event.preventDefault();

          if (selectedValue.length > 0) {
            setHasError(false);
            setSubmitted(true);
          } else {
            setHasError(true);
            setSubmitted(false);
          }
        }}
        style={{ maxWidth: 272 }}>
        <DatacomDropdown
          ref={dropdownRef}
          onChanged={onDropdownChange}
          isValid={!hasError}
          label="Country"
          message="Please select a country"
          placeholder="Select your country">
          <DatacomOption
            src="/images/dropdown-example-flags/new-zealand.png"
            value="NZ"
            label="New Zealand"
          />
          <DatacomOption
            src="/images/dropdown-example-flags/australia.png"
            value="AU"
            label="Australia"
          />
          <DatacomOption
            src="/images/dropdown-example-flags/kiribati.png"
            value="KI"
            label="Independent and Sovereign Republic of Kiribati"
          />
          <DatacomOption
            src="/images/dropdown-example-flags/great-britain.png"
            search="Great Britain | England | Wales | Scotland"
            value="GB"
            label="Great Britain"
          />
          <DatacomOption
            src="/images/dropdown-example-flags/france.png"
            value="FR"
            label="France"
          />
          <DatacomOption
            src="/images/dropdown-example-flags/italy.png"
            value="IT"
            label="Italy"
          />
          <DatacomOption
            src="/images/dropdown-example-flags/spain.png"
            value="ES"
            label="Spain"
          />
          <DatacomOption
            src="/images/dropdown-example-flags/ukraine.png"
            value="UA"
            label="Ukraine"
          />
        </DatacomDropdown>
        <br />
        {submitted && (
          <p style={{ color: 'var(--dc-primary-text-color)' }}>
            Form would have been submitted but was prevented
          </p>
        )}
        <DatacomButton
          variant="primary"
          type="submit"
          style={{ marginTop: '24px' }}>
          Submit
        </DatacomButton>
      </form>
    );
  },
};
