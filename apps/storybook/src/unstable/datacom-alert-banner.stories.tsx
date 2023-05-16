import React from 'react';
import { StoryFn } from '@storybook/react';
import { DatacomAlertBanner } from '@datacom/endeavour-react';

type AlertBannerProps = React.ComponentProps<typeof DatacomAlertBanner>;

export default {
  title: 'Alert Banner',
  component: DatacomAlertBanner,
  argTypes: {
    message: {
      name: 'Message',
      defaultValue: 'A message to our Datacom community about COVID-19 -',
      type: { name: 'string' },
    },
    label: {
      name: 'CTA Label',
      defaultValue: 'Learn more',
      type: { name: 'string' },
    },
    url: {
      name: 'CTA URL',
      defaultValue: 'https://datacom.com',
      type: { name: 'string' },
    },
  },
};

const Template: StoryFn<AlertBannerProps> = (args) => {
  const { message, label, url } = args;
  return (
    <DatacomAlertBanner
      label={label}
      url={url}
      message={message}></DatacomAlertBanner>
  );
};

export const Default = Template.bind({});
Default.args;
