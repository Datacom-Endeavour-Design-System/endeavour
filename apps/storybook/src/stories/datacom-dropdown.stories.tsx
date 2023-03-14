import React from 'react';
import { ComponentStoryFn } from '@storybook/react';
import { DatacomDropdown, DatacomOption } from '@datacom/endeavour-react';

export default {
  title: 'Dropdown List',
  component: DatacomDropdown,
  argTypes: {
    label: {
      name: 'Label',
      defaultValue: 'Options',
      description: 'Dropdown label',
      type: { name: 'string' },
    },
    variant: {
      name: 'Variant',
      description: 'Dropdown variant. Defaults to standard if not set.',
      control: 'select',
      defaultValue: 'standard',
      options: ['standard', 'multi', 'combobox'],
      type: { name: 'string', required: true },
    },
    placeholder: {
      name: 'Placeholder',
      description:
        'Placeholder text placed in search field of combobox variant.',
      defaultValue: 'Placeholder',
      type: { name: 'string' },
    },
    disabled: {
      name: 'Disabled',
      description: 'Disable Dropdown',
      type: { name: 'boolean' },
    },
    isValid: {
      name: 'Is Valid',
      description: "Controls whether component is in it's error state.",
      type: { name: 'boolean' },
    },
    message: {
      name: 'Message',
      description: 'Hover instruction text',
      type: { name: 'string' },
    },
  },
};

const CountryTemplate: ComponentStoryFn<typeof DatacomDropdown> = (args) => (
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
  placeholder: 'Select Item(s)',
};

const SimpleTemplate: ComponentStoryFn<typeof DatacomDropdown> = (args) => (
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

export const Simple = SimpleTemplate.bind({});
Simple.args = {
  label: 'Label',
  message: 'Please select an option',
  placeholder: 'Placeholder',
};
