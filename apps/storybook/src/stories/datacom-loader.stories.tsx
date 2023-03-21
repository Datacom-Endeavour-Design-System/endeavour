import React, { useState, useEffect } from 'react';
import { StoryFn } from '@storybook/react';
import { DatacomLoader, DatacomButton } from '@datacom/endeavour-react';
import styled from '@emotion/styled';

type LoaderProps = React.ComponentProps<typeof DatacomLoader>;
type LoadingStatusType = 'default' | 'none' | 'error' | 'success';

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
    loadingStatus: {
      name: 'Loading Status',
      defaultValue: 'default',
      control: 'select',
      description: 'Loading status is default if it is not set',
      options: ['default', 'none', 'error', 'success'],
      type: { name: 'string' },
    },
  },
};

const Template: StoryFn<LoaderProps & { label: string }> = (args) => {
  const { label } = args;

  return <DatacomLoader {...args}>{label}</DatacomLoader>;
};

export const InlineLoader = Template.bind({});

export const WithLoadingStatus = () => {
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatusType>('none');
  const [message, setMessage] = useState('loading..');

  useEffect(() => {
    if (loadingStatus == 'default') {
      setTimeout(() => {
        setLoadingStatus('success');
        setMessage('loading is complete.');
      }, 1000);
    } else if (loadingStatus == 'none') {
      setTimeout(() => {
        setLoadingStatus('default');
        setMessage('loading..');
      }, 2000);
    }
  });

  const ClickHandler = () => {
    setLoadingStatus('default');
    setMessage('loading..');
  };

  const disabled = loadingStatus == 'default';

  const Wrapper = styled.div`
    width: 272px;
  `;
  return (
    <>
      <Wrapper>
        <DatacomLoader loadingStatus={loadingStatus}>{message}</DatacomLoader>
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
