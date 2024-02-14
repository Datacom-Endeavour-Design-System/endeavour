import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { DatacomLoader } from '@datacom/endeavour-react';

const meta: Meta<typeof DatacomLoader> = {
  title: 'Loader',
  component: DatacomLoader,
  argTypes: {
    size: {
      name: 'Size',
      description: 'Loader size. Default to small if not set',
      options: ['small', 'large'],
      defaultValue: 'small',
      control: 'select',
      type: { name: 'string' },
    },
    loadingStatus: {
      name: 'Loading Status',
      description: 'Loading status is default if it is not set',
      options: ['default', 'error', 'success'],
      defaultValue: 'default',
      control: 'select',
      type: { name: 'string' },
    },
  },
  args: {
    size: 'small',
    loadingStatus: 'default',
  },
};

export default meta;
export const Loader: StoryObj<typeof DatacomLoader> = {};

export const InlineLoader: StoryObj<typeof DatacomLoader> = {
  render: (props) => {
    if (props.loadingStatus === 'error') {
      return <DatacomLoader {...props}>Error message</DatacomLoader>;
    }
    if (props.loadingStatus === 'success') {
      return <DatacomLoader {...props}>Success message</DatacomLoader>;
    }
    return <DatacomLoader {...props}>Loading message</DatacomLoader>;
  },
};
