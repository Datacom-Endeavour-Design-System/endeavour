import React, { useEffect, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { DatacomButton, DatacomLoader } from '@datacom/endeavour-react';
import styled from '@emotion/styled';

type LoaderProps = React.ComponentProps<typeof DatacomLoader>;
type LoadingStatusType = 'default' | 'error' | 'success';

const meta: Meta<LoaderProps> = {
  title: 'Loader',
  component: DatacomLoader,
};

export default meta;

export const Loader: StoryObj<LoaderProps> = {
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

export const InlineLoader: StoryObj<LoaderProps & { label: string }> = {
  argTypes: {
    loadingStatus: {
      name: 'Loading status',
      description: 'Loading status is default if it is not set',
      options: ['default', 'error', 'success'],
      defaultValue: 'default',
      control: 'select',
      type: { name: 'string' },
    },
    label: {
      name: 'Label',
      description: 'Label for loading status.',
      defaultValue: 'Loader status message',
      type: { name: 'string' },
    },
  },
  args: {
    loadingStatus: 'default',
    label: 'Loader status message',
  },
  render: (props) => {
    return <DatacomLoader {...props}>{props.label}</DatacomLoader>;
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
