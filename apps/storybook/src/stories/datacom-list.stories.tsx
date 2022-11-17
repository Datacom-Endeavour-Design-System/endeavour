import React from 'react';
import { ComponentStoryFn } from '@storybook/react';
import { DatacomLi, DatacomList } from '@datacom/endeavour-react';

export default {
  title: 'List',
  component: DatacomList,

  argTypes: {
    variant: {
      name: 'Variant',
      description: 'List variant. Defaults ordered if not set.',
      control: 'select',
      defaultValue: 'ordered',
      options: ['ordered', 'unordered'],
      type: { name: 'string', required: true },
    },
    type: {
      name: 'Type',
      description: 'List type  is default  numbers if not set',
      options: ['numbers', 'lowercase', 'upercase', 'roman'],
    },
  },
  arg: {
    variant: 'ordered',
  },
};
const Template: ComponentStoryFn<typeof DatacomList> = (args) => (
  <DatacomList {...args}>
    <DatacomLi> List Content Item 1</DatacomLi>
    <DatacomLi> List Content Item 2 </DatacomLi>
    <DatacomLi> List Content Item 3</DatacomLi>
  </DatacomList>
);
export const StandardOrdered = Template.bind({});
StandardOrdered.args = {
  variant: 'ordered',
};
export const NestedOrdered = () => {
  return (
    <div>
      <DatacomList>
        <DatacomLi>List Content Item</DatacomLi>
        <DatacomLi>
          List Content Item
          <DatacomList type="lowercase">
            <DatacomLi>List Content Item</DatacomLi>
            <DatacomLi>List Content Item</DatacomLi>
            <DatacomLi>List Content Item</DatacomLi>
          </DatacomList>
        </DatacomLi>
        <DatacomLi>List Content Item</DatacomLi>
      </DatacomList>
    </div>
  );
};
export const NestedUnordered = () => {
  return (
    <div>
      <DatacomList variant="unordered">
        <DatacomLi>List Content Item</DatacomLi>
        <DatacomLi>
          List Content Item
          <DatacomList variant="unordered">
            <DatacomLi>List Content Item</DatacomLi>
            <DatacomLi>List Content Item</DatacomLi>
            <DatacomLi>List Content Item</DatacomLi>
          </DatacomList>
        </DatacomLi>
        <DatacomLi>List Content Item</DatacomLi>
      </DatacomList>
    </div>
  );
};
export const NestedOrderedUnordered = () => {
  return (
    <div>
      <DatacomList>
        <DatacomLi>List Content Item</DatacomLi>
        <DatacomLi>
          List Content Item
          <DatacomList variant="unordered">
            <DatacomLi>List Content Item</DatacomLi>
            <DatacomLi>List Content Item</DatacomLi>
            <DatacomLi>List Content Item</DatacomLi>
          </DatacomList>
        </DatacomLi>
        <DatacomLi>List Content Item</DatacomLi>
      </DatacomList>
    </div>
  );
};
