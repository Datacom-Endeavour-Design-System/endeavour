import React from 'react';
import { ComponentStoryFn } from '@storybook/react';
import { DatacomLi, DatacomList } from '@datacom/endeavour-react';
import styled from '@emotion/styled';
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
      options: ['numbers', 'lowercase', 'uppercase', 'roman'],
    },
    heading: {
      name: 'Heading',
      description: 'For heading style of list inside paragraph',
      type: { name: 'boolean' },
    },
  },
  args: {
    variant: 'ordered',
    heading: false,
  },
};
const P = styled.p`
  font-family: Montserrat;
  font-size: 16px;
  weight: 400;
  color: #0a1839;
  padding-bottom: 12px;
  padding-left: 8px;
  margin: 0;
`;

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
  return (
    <div>
      <DatacomList variant="ordered" {...args}>
        <DatacomLi {...args} heading={true}>
          List content item
        </DatacomLi>
        <P>Lorem ipsum dolor sit amet</P>
        <DatacomLi {...args} heading={true}>
          List content item
        </DatacomLi>
        <P>Lorem ipsum dolor sit amet</P>
        <DatacomLi {...args} heading={true}>
          List content item
        </DatacomLi>
        <P>Lorem ipsum dolor sit amet</P>
      </DatacomList>
    </div>
  );
};
export const StandaloneUnorderedList = (args) => {
  return (
    <div>
      <DatacomList {...args} variant="Unordered">
        <DatacomLi {...args} heading={true}>
          List content item
        </DatacomLi>
        <P>Lorem ipsum dolor sit amet</P>
        <DatacomLi {...args} heading={true}>
          List content item
        </DatacomLi>
        <P>Lorem ipsum dolor sit amet</P>
        <DatacomLi {...args} heading={true}>
          List content item
        </DatacomLi>
        <P>Lorem ipsum dolor sit amet</P>
      </DatacomList>
    </div>
  );
};
