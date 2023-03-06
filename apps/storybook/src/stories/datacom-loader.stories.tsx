import React from 'react';
import { StoryFn } from '@storybook/react';
import { DatacomLoader, DatacomButton } from '@datacom/endeavour-react';

type LoaderProps = React.ComponentProps<typeof DatacomLoader>;
export default {
  title: 'Loader',
  component: DatacomLoader,

  argTypes: {
    label: {
      name: 'Label',
      defaultValue: 'Loading message',
      description: 'Label for loading status.',
      type: { name: 'string' },
    },

    loading: {
      name: 'Loading',
      defaultValue: 'default',
      control: 'select',
      description: 'Loading status is default if it is not set',
      options: ['default', 'error', 'success'],
    },

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
  const { loading, size } = args;
  return <DatacomLoader loading="default" size={size}></DatacomLoader>;
};

export const Loader = Template.bind({});
Loader.args = {
  loading: 'default',
};
export const InlineLoader = (args) => {
  return <DatacomLoader {...args}> Loading message</DatacomLoader>;
};

export const InButton = (args) => {
  return (
    <DatacomButton type="submit" size="small">
      <DatacomLoader primary {...args} loading="default" />
    </DatacomButton>
  );
};
