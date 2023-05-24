import React from 'react';
import { StoryFn } from '@storybook/react';
import { DatacomAlertBanner } from '@datacom/endeavour-react';

type AlertBannerProps = React.ComponentProps<typeof DatacomAlertBanner>;

export default {
  title: 'Alert Banner',
  component: DatacomAlertBanner,
  argTypes: {
    variant: {
      name: 'Variant',
      description: "Alert banner variant. Defaults to 'dark-blue' if not set.",
      control: {
        type: 'select',
        labels: {
          'dark-blue': 'Dark-blue',
          blue: 'Datacom-blue',
          'light-blue': 'Light-blue',
          'primary-pink': 'Primary-accent-pink',
        },
      },
      defaultValue: 'dark-blue',
      options: ['blue', 'dark-blue', 'light-blue', 'primary-pink'],
      type: { name: 'string' },
    },
    message: {
      name: 'Message',
      defaultValue: 'A message to our Datacom community about COVID-19 ',
      type: { name: 'string' },
    },
    ctaText: {
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

const Template: StoryFn<AlertBannerProps & { message: string }> = (args) => {
  const { message } = args;
  return (
    <DatacomAlertBanner {...args}>
      <span slot="message">{message}</span>
    </DatacomAlertBanner>
  );
};

export const Default = Template.bind({});
Default.args;
