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
      type: { label: 'string' },
    },
    variant: {
      name: 'Variant',
      description: 'Dropdown variant. Defaults to single if not set.',
      control: 'select',
      defaultValue: 'single',
      options: ['single', 'combo'],
      type: { name: 'string', required: true },
    },
    disabled: {
      name: 'Disabled',
      description: 'Disable Dropdown',
      type: { name: 'boolean' },
    },
    required: {
      name: 'Required',
      description: 'Required Field',
      type: { name: 'boolean' },
    },
    message: {
      name: 'Message',
      defaultValue: 'Please select an option',
      description: 'Hover instruction text',
      type: { label: 'string' },
    },
  },
};

const CountryTemplate: ComponentStoryFn<typeof DatacomDropdown> = (args) => (
  <DatacomDropdown {...args}>
    <DatacomOption
      src="https://flagcdn.com/nz.svg"
      value="NZ"
      label="New Zealand"
    />
    <DatacomOption
      src="https://flagcdn.com/au.svg"
      value="AU"
      label="Australia"
    />
    <DatacomOption
      src="https://flagcdn.com/ki.svg"
      value="KI"
      label="Independent and Sovereign Republic of Kiribati"
    />
    <DatacomOption
      src="https://flagcdn.com/gb.svg"
      search="Great Britan | England | Wales | Scotland"
      value="GB"
      label="Great Britan"
    />
    <DatacomOption src="https://flagcdn.com/fr.svg" value="FR" label="France" />
    <DatacomOption src="https://flagcdn.com/it.svg" value="IT" label="Italy" />
    <DatacomOption src="https://flagcdn.com/es.svg" value="ES" label="Spain" />
    <DatacomOption
      src="https://flagcdn.com/ua.svg"
      value="EA"
      label="Ukraine"
    />
  </DatacomDropdown>
);

export const WithImages = CountryTemplate.bind({});
WithImages.args = {
  label: 'Country',
  message: 'Please select a country',
};

const SimpleTemplate: ComponentStoryFn<typeof DatacomDropdown> = (args) => (
  <DatacomDropdown {...args}>
    <DatacomOption value="1" label="Option 1"></DatacomOption>
    <DatacomOption value="2" label="Option 2"></DatacomOption>
    <DatacomOption value="3" label="Option 3"></DatacomOption>
    <DatacomOption value="4" label="Option 4"></DatacomOption>
    <DatacomOption value="5" label="Option 5"></DatacomOption>
  </DatacomDropdown>
);

export const Simple = SimpleTemplate.bind({});
