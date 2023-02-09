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
    src: {
      name: 'Image Source',
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
  },
  args: {
    firstName: 'First Name',
    lastName: 'Last Name',
    src: 'Src',
    jobTitle: 'Job title',
    companyName: 'Datacom',
  },
} as Meta<typeof DatacomAvatar>;

const Template: ComponentStoryFn<typeof DatacomAvatar> = (args) => (
  <DatacomAvatar {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  firstName: 'Sally',
  lastName: 'Mei',
  jobTitle: 'UX/UI Designer',
  companyName: 'Datacom',
  src: 'https://datacom.com/content/dam/images/datacom-people/datacom-employees-formal/PeterNelson_Portrait_1500x1000px.jpg/_jcr_content/renditions/cq5dam.thumbnail.319.319.png',
};

export const Secondary = Template.bind({});
Secondary.args = {
  firstName: 'Taylor',
  lastName: 'Newton',
  jobTitle: 'Lead UX',
  companyName: 'Datacom',
  src: '',
};
