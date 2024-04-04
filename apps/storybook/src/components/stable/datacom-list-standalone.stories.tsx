import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { DatacomLi, DatacomList } from '@datacom/endeavour-react';

type ListProps = React.ComponentProps<typeof DatacomList>;
type List = {
  name: string;
  description: string;
  type: { name: string };
};
type ListArgType = {
  [key: string]: List;
};
type ListArg = {
  [key: string]: string | boolean;
};

const meta: Meta<ListProps> = {
  title: 'List',
  component: DatacomList,
};

export default meta;

const lists = [
  'List content item 1',
  'List content item 2',
  'List content item 3',
];
const listsArgTypes: ListArgType = {};
const listsArgs: ListArg = {};
lists.forEach((list, i) => {
  const listNumber = i + 1;
  listsArgTypes[`List${listNumber}heading`] = {
    name: `Heading ${listNumber}`,
    description: `List${listNumber}`,
    type: { name: 'string' },
  };
  listsArgTypes[`List${listNumber}Description`] = {
    name: ` Description ${listNumber}`,
    description: `List${listNumber} label`,
    type: { name: 'string' },
  };
  listsArgs[`List${listNumber}heading`] = list;
  listsArgs[`List${listNumber}Description`] = list;
});

export const StandaloneOrderedList: StoryObj = {
  argTypes: listsArgTypes,
  args: listsArgs,
  render: (props) => {
    const newProps = { ...props } as ListArg;

    return (
      <div>
        {' '}
        <DatacomList variant="ordered">
          {lists.map((_list, i) => {
            const listNumber = i + 1;
            const description = newProps[
              `List${listNumber}Description`
            ] as string;
            const heading = newProps[`List${listNumber}heading`] as string;
            return <DatacomLi heading={heading}>{description}</DatacomLi>;
          })}
        </DatacomList>
      </div>
    );
  },
};

export const StandaloneUnorderedList: StoryObj = {
  argTypes: listsArgTypes,
  args: listsArgs,
  render: (props) => {
    const newProps = { ...props } as ListArg;

    return (
      <div>
        {' '}
        <DatacomList variant="unordered">
          {lists.map((_list, i) => {
            const listNumber = i + 1;
            const description = newProps[
              `List${listNumber}Description`
            ] as string;
            const heading = newProps[`List${listNumber}heading`] as string;
            return <DatacomLi heading={heading}>{description}</DatacomLi>;
          })}
        </DatacomList>
      </div>
    );
  },
};
