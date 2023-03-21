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
      control: 'select',
      description: 'List type  is default  numbers if not set',
      options: ['numbers', 'lowercase', 'uppercase', 'roman'],
    },
    heading: {
      name: 'Heading',
      description: 'For heading style of list inside paragraph',
      defaultValue: 'List content item',
      type: { name: 'string' },
    },
  },
  args: {
    variant: 'ordered',
  },
};

const Template: ComponentStoryFn<typeof DatacomList> = (args) => (
  <DatacomList {...args}>
    <DatacomLi> List content item 1</DatacomLi>
    <DatacomLi> List content item 2 </DatacomLi>
    <DatacomLi> List content item 3</DatacomLi>
  </DatacomList>
);
export const OrderedList = Template.bind({});
OrderedList.args = {
  variant: 'ordered',
};

export const UnorderedList = Template.bind({});
UnorderedList.args = {
  variant: 'unordered',
};

export const OrderedListWithNestedItems = () => {
  return (
    <div>
      <DatacomList>
        <DatacomLi>List content item</DatacomLi>
        <DatacomLi>
          List content item
          <DatacomList type="lowercase">
            <DatacomLi>List content item</DatacomLi>
            <DatacomLi>List content item</DatacomLi>
            <DatacomLi>List content item</DatacomLi>
          </DatacomList>
        </DatacomLi>
        <DatacomLi>List content item</DatacomLi>
      </DatacomList>
    </div>
  );
};

export const UnorderedListWithNestedItems = () => {
  return (
    <div>
      <DatacomList variant="unordered">
        <DatacomLi>List content item</DatacomLi>
        <DatacomLi>
          List content item
          <DatacomList variant="unordered">
            <DatacomLi>List content item</DatacomLi>
            <DatacomLi>List content item</DatacomLi>
            <DatacomLi>List content item</DatacomLi>
          </DatacomList>
        </DatacomLi>
        <DatacomLi>List content item</DatacomLi>
      </DatacomList>
    </div>
  );
};

export const OrderedListWithNestedUnorderedItems = () => {
  return (
    <div>
      <DatacomList>
        <DatacomLi>List content item</DatacomLi>
        <DatacomLi>
          List content item
          <DatacomList variant="unordered">
            <DatacomLi>List content item</DatacomLi>
            <DatacomLi>List content item</DatacomLi>
            <DatacomLi>List content item</DatacomLi>
          </DatacomList>
        </DatacomLi>
        <DatacomLi>List content item</DatacomLi>
      </DatacomList>
    </div>
  );
};

export const UnorderedListWithNestedOrderedItems = () => {
  return (
    <div>
      <DatacomList variant="unordered">
        <DatacomLi>List content item</DatacomLi>
        <DatacomLi>
          List content item
          <DatacomList>
            <DatacomLi>List content item</DatacomLi>
            <DatacomLi>List content item</DatacomLi>
            <DatacomLi>List content item</DatacomLi>
          </DatacomList>
        </DatacomLi>
        <DatacomLi>List content item</DatacomLi>
      </DatacomList>
    </div>
  );
};

export const StandaloneOrderedList = (args) => {
  const { heading } = args;
  return (
    <div>
      <DatacomList variant="ordered" {...args}>
        <DatacomLi {...args} heading={heading}>
          Lorem ipsum dolor sit amet
        </DatacomLi>
        <DatacomLi {...args} heading={heading}>
          Lorem ipsum dolor sit amet
        </DatacomLi>
        <DatacomLi {...args} heading={heading}>
          Lorem ipsum dolor sit amet
        </DatacomLi>
      </DatacomList>
    </div>
  );
};
export const StandaloneUnorderedList = (args) => {
  const { heading } = args;
  return (
    <div>
      <DatacomList {...args} variant="Unordered">
        <DatacomLi {...args} heading={heading}>
          Lorem ipsum dolor sit ame
        </DatacomLi>
        <DatacomLi {...args} heading={heading}>
          Lorem ipsum dolor sit amet
        </DatacomLi>
        <DatacomLi {...args} heading={heading}>
          Lorem ipsum dolor sit amet
        </DatacomLi>
      </DatacomList>
    </div>
  );
};
