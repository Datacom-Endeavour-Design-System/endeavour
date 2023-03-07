import React, { useState, useEffect, useRef } from 'react';
import { StoryFn } from '@storybook/react';
import { DatacomLoader, DatacomButton } from '@datacom/endeavour-react';
import styled from '@emotion/styled';

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
      options: ['default', 'none', 'error', 'success'],
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
export const WithLoadingStatus = () => {
  const [loading, setLoading] = useState('none');
  const [message, setMessage] = useState('loading..');

  useEffect(() => {
    if (loading == 'default') {
      setTimeout(() => {
        setLoading('success');
        setMessage('loading is complete.');
      }, 1000);
    } else if (loading == 'none') {
      setTimeout(() => {
        setLoading('default');
        setMessage('loading..');
      }, 2000);
    }
  });

  const ClickHandler = () => {
    setLoading('default');
    setMessage('loading..');
  };
  const disabled = loading == 'default';
  const Wrapper = styled.div`
    width: 272px;
  `;
  return (
    <>
      <Wrapper>
        <DatacomLoader loading={loading}> {message}</DatacomLoader>
      </Wrapper>
      <div>
        <br></br>
        <DatacomButton
          disabled={disabled}
          variant="primary"
          onClick={ClickHandler}>
          Start loading
        </DatacomButton>
      </div>
    </>
  );
};
