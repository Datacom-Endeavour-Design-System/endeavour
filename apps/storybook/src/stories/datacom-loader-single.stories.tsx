import React from 'react';
import { StoryFn } from '@storybook/react';
import { DatacomLoader, DatacomButton } from '@datacom/endeavour-react';

type LoaderProps = React.ComponentProps<typeof DatacomLoader>;

export default {
  title: 'Loader',
  component: DatacomLoader,
  argTypes: {
    size: {
      name: 'Size',
      defaultValue: 'small',
      description: 'Loader size is small if it is not set.',
      control: 'select',
      options: ['large', 'small'],
    },
  },
};
const Template: StoryFn<LoaderProps> = (args) => {
  const { size } = args;
  return <DatacomLoader size={size}></DatacomLoader>;
};

export const Loader = Template.bind({});
Loader.args = {};
