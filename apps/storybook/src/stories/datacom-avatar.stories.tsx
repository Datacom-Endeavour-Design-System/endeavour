import React from 'react';
import { ComponentStoryFn, Meta } from '@storybook/react';
import { DatacomAvataravatar } from '@datacom/endeavour-react';

export default {
  title: 'Avatar',
  component: DatacomAvataravatar,
  argTypes: {
    firstName: {
      name: 'First Name',
      defaultValue: 'First Name',
      description: 'Button text',
      type: { name: 'string', required: true },
    },
    lastName: {
      name: 'Last Name',
      defaultValue: 'Button text',
      description: 'Button text',
      type: { name: 'string', required: true },
    },
    src: {
      name: 'Image Source',
      defaultValue: 'Button text',
      description: 'Button text',
      type: { name: 'string', required: true },
    },
    jobTitle: {
      name: 'Job title',
      defaultValue: 'Button text',
      description: 'Button text',
      type: { name: 'string', required: true },
    },
    companyName: {
      name: 'Company Name',
      defaultValue: 'Button text',
      description: 'Button text',
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
} as Meta<typeof DatacomAvataravatar>;

const Template: ComponentStoryFn<typeof DatacomAvataravatar> = (args) => (
  <DatacomAvataravatar {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  firstName: 'Yukti',
  lastName: 'Dogra',
  jobTitle: 'Teachinal Lead',
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
