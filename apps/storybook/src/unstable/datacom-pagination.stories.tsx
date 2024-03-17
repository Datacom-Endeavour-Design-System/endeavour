import { Meta, StoryObj } from '@storybook/react';
import { DatacomPagination } from '@datacom/endeavour-react';

const meta: Meta<typeof DatacomPagination> = {
  title: 'Pagination',
  component: DatacomPagination,
  argTypes: {
    itemsPerPage: {
      name: 'Items per page',
      description: 'Set number of items /elements to show per page',
      type: { name: 'number' },
    },
    totalItems: {
      name: 'Total items',
      description:
        ' Total number of elements or items used to calculate page displays',
      type: { name: 'number' },
    },
    currentPage: {
      name: 'Current page',
      description: 'Index of the page',
      table: { disable: true },
      type: { name: 'number' },
    },
  },
  args: {
    itemsPerPage: 10,
    totalItems: 200,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 200,
  },
};
