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
    type: {
      name: 'Numbering type',
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
    type: {
      name: 'Numbering type',
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
  argTypes: {
    type: {
      name: 'Numbering type',
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
  argTypes: {
    type: {
      name: 'Numbering type',
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
  },
};

export const StandaloneOrderedList: Story = {
  argTypes: {
    heading: {
      name: 'Heading',
      description: 'List variant. Defaults ordered if not set.',
    },
  },

  render: (args: ComponentProps<typeof DatacomList> & { heading?: string }) => {
    const { heading } = args;

    return (
      <div>
        <DatacomList {...args}>
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
  },
};
export const StandaloneUnorderedList: Story = {
  args: {
    heading: 'List content item',
    variant: 'unordered',
  },
  render: (args: ComponentProps<typeof DatacomList> & { heading?: string }) => {
    const { heading } = args;
    return (
      <div>
        <DatacomList {...args}>
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
  },
};
