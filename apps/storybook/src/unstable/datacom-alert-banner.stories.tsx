import React from 'react';
import { StoryFn } from '@storybook/react';
import { DatacomAlertBanner } from '@datacom/endeavour-react';

type AlertBannerProps = React.ComponentProps<typeof DatacomAlertBanner>;

export default {
  title: 'Alert-Banner',
  component: DatacomAlertBanner,
  argTypes: {
    copy: {
      name: 'Message',
      defaultValue: 'A message to our Datacom community about COVID-19 - ',
      description: 'Label content within the content tag.',
      type: { name: 'string' },
    },
    link: {
      name: 'Link Label',
      defaultValue: 'Learn more',
      description: 'Label content within the content tag.',
      type: { name: 'string' },
    },
    url: {
      name: 'Link',
      defaultValue: 'https://datacom.com',
      description:
        'URL that content tag should link to. Omitting a url will change the tag into a non-interactable div element',
      type: { name: 'string' },
    },
  },
};

const Template: StoryFn<AlertBannerProps> = (args) => {
  const { copy, link, url } = args;

  return (
    <DatacomAlertBanner link={link} url={url} copy={copy}></DatacomAlertBanner>
  );
};

export const AlertBanner = Template.bind({});
