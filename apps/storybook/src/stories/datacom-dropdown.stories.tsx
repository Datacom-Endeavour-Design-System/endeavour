import React from 'react';
import { ComponentStoryFn } from '@storybook/react';
import { DatacomDropdown, DatacomOption } from '@datacom/endeavour-react';

export default {
  title: 'Dropdown List',
  component: DatacomDropdown,
  argTypes: {
    label: {
      name: 'Label',
      defaultValue: 'Option',
      description: 'Dropdown lable',
      type: { label: 'string' },
    },
    multiple: {
      name: 'Multiple',
      description: 'Multiple items may be selected',
      type: { name: 'boolean' },
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
  },
  arg: {
    label: 'Country',
    multiple: false,
  },
};

const Template: ComponentStoryFn<typeof DatacomDropdown> = (args) => (
  <DatacomDropdown {...args} style={{ width: '350px' }}>
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

export const Standard = Template.bind({});
Standard.args = {
  label: 'Country',
  multiple: false,
};
