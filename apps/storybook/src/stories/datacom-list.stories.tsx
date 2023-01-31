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
      control: 'select',
      defaultValue: 'numbers',
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
    <DatacomLi> List item 1</DatacomLi>
    <DatacomLi> List item 2 </DatacomLi>
    <DatacomLi> List item 3</DatacomLi>
  </DatacomList>
);
export const Simple = Template.bind({});
Simple.args = {
  variant: 'ordered',
};

export const Nested = (args) => {
  return (
    <div>
      <DatacomList {...args}>
        <DatacomLi>List item 1</DatacomLi>
        <DatacomLi>
          List item 2
          <DatacomList {...args}>
            <DatacomLi>Nested item 1</DatacomLi>
            <DatacomLi>Nested item 2</DatacomLi>
            <DatacomLi>Nested item 3</DatacomLi>
          </DatacomList>
        </DatacomLi>
        <DatacomLi>List item 3</DatacomLi>
      </DatacomList>
    </div>
  );
};

export const WithContent = (args) => {
  return (
    <DatacomList {...args}>
      <DatacomLi variantItem="heading">List content item</DatacomLi>
      <p>Lorem ipsum dolor sit amet</p>

      <DatacomLi variantItem="heading">List content item</DatacomLi>
      <p>Lorem ipsum dolor sit amet</p>

      <DatacomLi variantItem="heading">List content item</DatacomLi>
      <p>Lorem ipsum dolor sit amet</p>
    </DatacomList>
  );
};
