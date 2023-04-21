import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { DatacomAvatar } from '@datacom/endeavour-react';

type AvatarProps = React.ComponentProps<typeof DatacomAvatar>;

export default {
  title: 'Avatar',
  component: DatacomAvatar,
  argTypes: {
    variant: {
      name: 'Variant',
      control: 'select',
      options: ['Simple', 'With Image'],
      type: { name: 'string' },
    },
    firstName: {
      name: 'First Name',
      type: { name: 'string', required: true },
    },
    lastName: {
      name: 'Last Name',
      type: { name: 'string', required: true },
    },
    jobTitle: {
      name: 'Job title',
      type: { name: 'string', required: true },
    },
    companyName: {
      name: 'Company Name',
      type: { name: 'string', required: true },
    },
    url: {
      name: 'URL',
      defaultValue: 'https://datacom.com',
      description:
        'URL that content tag should link to. Omitting a url will change the tag into a non-interactable div element',
      type: { name: 'string' },
    },
  },
  args: {
    variant: 'Simple',
    firstName: 'Sally',
    lastName: 'Mei',
    jobTitle: 'UX/UI Designer',
    companyName: 'Datacom',
    url: 'https://www.datacom.com',
  },
} as Meta<typeof DatacomAvatar>;

const Template: StoryFn<AvatarProps & { variant: string }> = (args) => {
  const props = {
    firstName: args.firstName,
    lastName: args.lastName,
    jobTitle: args.jobTitle,
    companyName: args.companyName,
    url: args.companyName,
    src: '',
    alt: '',
  };

  // Apply image related props when variant storybook control is set with 'With Image'.
  if (args.variant === 'With Image') {
    props.src = '/images/avatar-images/avatar-image.png';
    props.alt = 'Avatar Image';
  }

  return <DatacomAvatar {...props} />;
};

export const Avatar = Template.bind({});
