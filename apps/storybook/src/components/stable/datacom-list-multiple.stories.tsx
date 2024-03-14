import React, { ComponentProps } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { DatacomLi, DatacomList } from '@datacom/endeavour-react';

const meta = {
  title: 'List',
  component: DatacomList,
  argTypes: {
    variant: {
      name: 'Variant',
      description: 'List variant. Defaults ordered if not set.',
      control: {
        type: 'select',
        labels: {
          ordered: 'Ordered',
          unordered: 'Unordered',
        },
      },
      defaultValue: 'ordered',
      options: ['ordered', 'unordered'],
      type: { name: 'string' },
    },
    type: {
      name: 'Numbering type',
      control: {
        type: 'select',
        labels: {
          numbers: 'Numbers',
          lowercase: 'Lowercase',
          uppercase: 'Uppercase',
          roman: 'Roman',
        },
      },
      description: 'List type is default numbers if not set',
      options: ['numbers', 'lowercase', 'uppercase', 'roman'],
    },
  },
  args: {
    variant: 'ordered',
  },
  render: ({
    heading,
    ...args
  }: ComponentProps<typeof DatacomList> & { heading?: string }) => (
    <DatacomList {...args}>
      <DatacomLi> List content item 1</DatacomLi>
      <DatacomLi> List content item 2 </DatacomLi>
      <DatacomLi> List content item 3</DatacomLi>
    </DatacomList>
  ),
} satisfies Meta<typeof DatacomList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OrderedList: Story = {
  args: {
    variant: 'ordered',
  },
};

export const UnorderedList: Story = {
  args: {
    variant: 'unordered',
  },
};

export const OrderedListWithNestedItems: Story = {
  argTypes: {
    variant: {
      name: 'Variant',
      table: { disable: true },
    },
    type: {
      table: { disable: true },
    },
  },
  render: () => {
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
  },
};

export const UnorderedListWithNestedItems: Story = {
  argTypes: {
    variant: {
      name: 'Variant',
      table: { disable: true },
    },
    type: {
      table: { disable: true },
    },
  },
  render: () => {
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
  },
};

export const OrderedListWithNestedUnorderedItems: Story = {
  render: (props) => {
    return (
      <div>
        <DatacomList {...props} variant="ordered">
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
  },
};

export const UnorderedListWithNestedOrderedItems: Story = {
  render: (props) => {
    return (
      <div>
        <DatacomList variant="unordered">
          <DatacomLi>List content item</DatacomLi>
          <DatacomLi>
            List content item
            <DatacomList {...props}>
              <DatacomLi>List content item</DatacomLi>
              <DatacomLi>List content item</DatacomLi>
              <DatacomLi>List content item</DatacomLi>
            </DatacomList>
          </DatacomLi>
          <DatacomLi>List content item</DatacomLi>
        </DatacomList>
      </div>
    );
  },
};
