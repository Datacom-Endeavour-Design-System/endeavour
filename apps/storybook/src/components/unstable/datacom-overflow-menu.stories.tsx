import React from 'react';
import { StoryObj, Meta } from '@storybook/react';
import {
  DatacomOverflowMenu,
  DatacomMenuItems,
} from '@datacom/endeavour-react';

const meta: Meta<typeof DatacomOverflowMenu> = {
  title: 'Overflow Menu',
  component: DatacomOverflowMenu,
  argTypes: {
    variant: {
      name: 'Variant',
      description: 'Main  variant. Defaults to horizontal if not set.',
      control: {
        type: 'select',
        labels: {
          horizontal: 'Horizontal',
          vertical: 'Vertical',
        },
      },
      options: ['horizontal', 'vertical'],
      type: { name: 'string' },
    },
    label: {
      name: 'Tooltip label',
      description: 'Text displayed in tooltip.',
      type: { name: 'string' },
    },
  },
  args: {
    label: 'More options',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props) => {
    return (
      <div style={{ maxWidth: '272px' }}>
        <DatacomOverflowMenu {...props}>
          <DatacomMenuItems
            itemUrl="https://www.datacom.com/nz/en"
            icon="globe">
            Option
          </DatacomMenuItems>
          <DatacomMenuItems itemText="Option" icon="globe"></DatacomMenuItems>
          <DatacomMenuItems
            itemUrl="https://www.datacom.com/nz/en"
            icon="globe">
            Option
          </DatacomMenuItems>
        </DatacomOverflowMenu>
      </div>
    );
  },
};
