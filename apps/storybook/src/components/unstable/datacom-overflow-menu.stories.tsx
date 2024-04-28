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
    size: {
      name: 'Size',
      description:
        'OverflowMenu and dropdown options size within variant. Defaults to small if not set',
      control: {
        type: 'select',
        labels: { standard: 'Large', small: 'Small' },
      },
      options: ['standard', 'small'],
      type: { name: 'string' },
    },
    label: {
      name: 'Tooltip label',
      description: 'Text displayed in tooltip.',
      type: { name: 'string' },
    },
    position: {
      name: 'Overflow options placement',
      description: 'Sets position of overflow menu dropdown options.',
      control: {
        type: 'select',
        labels: {
          center: 'Center',
          left: 'Left',
          right: 'Right',
        },
      },
      options: ['center', 'left', 'right'],
      type: { name: 'string' },
    },
  },
  args: {
    variant: 'horizontal',
    size: 'small',
    label: 'More options',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props) => {
    return (
      <div
        style={{
          width: '272px',
          display: 'block',
          paddingTop: '50px',
          paddingLeft: '400px',
          height: 'calc(100vh - 8rem)',
        }}>
        <DatacomOverflowMenu {...props}>
          <DatacomMenuItems
            itemUrl="https://www.datacom.com/nz/en"
            icon="globe"
            size={props.size}>
            Option
          </DatacomMenuItems>
          <DatacomMenuItems
            itemText="Option"
            icon="globe"
            size={props.size}
            disabled></DatacomMenuItems>
          <DatacomMenuItems
            itemUrl="https://www.datacom.com/nz/en"
            icon="globe"
            size={props.size}>
            Option
          </DatacomMenuItems>
        </DatacomOverflowMenu>
      </div>
    );
  },
};
