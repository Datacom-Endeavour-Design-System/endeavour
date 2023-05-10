import React from 'react';
import { ComponentStoryFn } from '@storybook/react';
import { DatacomPagination } from '@datacom/endeavour-react';
export default {
  title: 'Pagination',
  component: DatacomPagination,
  argTypes: {
    itemsPerPage: {
      name: 'Items Per Page',
      defaultValue: 10,
      type: { name: 'number' },
    },
    totalItems: {
      name: 'Total Items',
      defaultValue: 200,
      type: { name: 'number' },
    },
  },
};
const Template: ComponentStoryFn<typeof DatacomPagination> = (args) => (
  <DatacomPagination {...args} />
);

export const Default = Template.bind({});
Default.args;
