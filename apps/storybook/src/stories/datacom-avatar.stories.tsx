import React from 'react';
import { ComponentStoryFn, Meta } from '@storybook/react';
import { DatacomAvatar } from '@datacom/endeavour-react';

export default {
  title: 'Avatar',
  component: DatacomAvatar,
  argTypes: {
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
    src: {
      name: 'Image Source',
      type: { name: 'string', required: false },
    },
    alt: {
      name: 'Alt Text for Image',
      type: { name: 'string', required: false },
      if: { arg: 'src', truthy: true },
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
    firstName: 'First Name',
    lastName: 'Last Name',
    jobTitle: 'Job title',
    companyName: 'Datacom',
    src: '',
    alt: 'Alternate Texts',
    url: 'https://datacom.com',
  },
} as Meta<typeof DatacomAvatar>;

const Template: ComponentStoryFn<typeof DatacomAvatar> = (args) => (
  <DatacomAvatar {...args} />
);

export const Avatar = Template.bind({});
Avatar.args = {
  firstName: 'Sally',
  lastName: 'Mei',
  jobTitle: 'UX/UI Designer',
  companyName: 'Datacom',
  src: 'https://www.w3schools.com/howto/img_avatar2.png',
};
