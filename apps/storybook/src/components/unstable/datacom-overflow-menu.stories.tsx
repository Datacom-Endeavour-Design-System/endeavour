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
    // itemText: {
    //   name: ' tooltip Text',
    //   defaultValue: 'Button text',
    //   description: 'Button text',
    //   type: { name: 'string' },
    // },
    variant: {
      name: 'Variant',
      description: 'Main button variant. Defaults to primary if not set.',
      control: {
        type: 'select',
        // labels: {
        //   primary: 'Primary',
        //   secondary: 'Secondary',
        //   tertiary: 'Tertiary',
        // },
      },
      options: ['horizontal', 'vertical'],
      type: { name: 'string' },
    },
  },
  // args: {
  //   itemText: 'Button',
  // },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (props) => {
    return (
      <div style={{ maxWidth: 272 }}>
        <DatacomOverflowMenu {...props}>
          <DatacomMenuItems itemUrl="#">text1</DatacomMenuItems>
          <DatacomMenuItems itemText="text">jjj</DatacomMenuItems>
        </DatacomOverflowMenu>
      </div>
    );
  },
};
