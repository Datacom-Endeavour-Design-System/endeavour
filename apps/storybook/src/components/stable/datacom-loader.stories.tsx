import React, { useEffect, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { DatacomButton, DatacomLoader } from '@datacom/endeavour-react';
import styled from '@emotion/styled';

type LoadingStatusType = 'default' | 'error' | 'success';

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
      name: 'Loading status',
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

export const WithLoadingStatus = () => {
  const [loadingStatus, setLoadingStatus] =
    useState<LoadingStatusType>('default');
  const [message, setMessage] = useState('loading..');

  useEffect(() => {
    if (loadingStatus == 'default') {
      setTimeout(() => {
        setLoadingStatus('success');
        setMessage('loading is complete.');
      }, 1000);
    } else if (loadingStatus == null) {
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

  const ButtonPanel = styled.div`
    margin-top: 24px;
  `;

  return (
    <>
      <DatacomLoader loadingStatus={loadingStatus}>{message}</DatacomLoader>
      <ButtonPanel>
        <DatacomButton
          disabled={disabled}
          variant="primary"
          onClick={ClickHandler}>
          Start loading
        </DatacomButton>
      </ButtonPanel>
    </>
  );
};
