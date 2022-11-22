import React from 'react';
import { ComponentStoryFn } from '@storybook/react';
import { DatacomLi, DatacomList } from '@datacom/endeavour-react';
import { color } from '@storybook/theming';

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
    variantItem: {
      name: 'variantItem',
      description: 'List Item style  is default  item if not set',
      defaultValue: 'item',
      options: ['item', 'heading'],
    },
  },
  arg: {
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
export const StandaloneOrderedList = () => {
  return (
    <div style={{ marginTop: '24px' }}>
      <DatacomList variant="ordered">
        <DatacomLi variantItem="heading">List content item</DatacomLi>
        <p
          style={{
            fontFamily: 'Montserrat',
            marginLeft: '8px',
            marginTop: '0px',
            marginBottom: '12px',
          }}>
          Lorem ipsum dolor sit amet
        </p>
        <DatacomLi variantItem="heading">List content item</DatacomLi>
        <p
          style={{
            fontFamily: 'Montserrat',

            marginLeft: '8px',
            marginTop: '0px',
            marginBottom: '12px',
          }}>
          Lorem ipsum dolor sit amet
        </p>
        <DatacomLi variantItem="heading">List content item</DatacomLi>
        <p
          style={{
            fontFamily: 'Montserrat',
            marginLeft: '8px',
            marginTop: '0px',
            marginBottom: '12px',
          }}>
          Lorem ipsum dolor sit amet
        </p>
      </DatacomList>
    </div>
  );
};
export const StandaloneUnorderedList = () => {
  return (
    <div style={{ marginTop: '24px' }}>
      <DatacomList variant="Unordered">
        <DatacomLi variantItem="heading">List content item</DatacomLi>
        <p
          style={{
            fontFamily: 'Montserrat',

            marginLeft: '8px',
            marginTop: '0px',
            marginBottom: '12px',
          }}>
          Lorem ipsum dolor sit amet
        </p>
        <DatacomLi variantItem="heading">List content item</DatacomLi>
        <p
          style={{
            fontFamily: 'Montserrat',
            marginLeft: '8px',
            marginTop: '0px',
            marginBottom: '12px',
          }}>
          Lorem ipsum dolor sit amet
        </p>
        <DatacomLi variantItem="heading">List content item</DatacomLi>
        <p
          style={{
            fontFamily: 'Montserrat',
            marginLeft: '8px',
            marginTop: '0px',
            marginBottom: '12px',
          }}>
          Lorem ipsum dolor sit amet
        </p>
      </DatacomList>
    </div>
  );
};
