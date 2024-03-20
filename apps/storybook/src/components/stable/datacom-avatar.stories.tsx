import { Meta, StoryObj } from '@storybook/react';
import { DatacomAvatar } from '@datacom/endeavour-react';

const meta: Meta<typeof DatacomAvatar> = {
  title: 'Avatar',
  component: DatacomAvatar,
  argTypes: {
    firstName: {
      name: 'First name',
      type: { name: 'string', required: true },
    },
    lastName: {
      name: 'Last name',
      type: { name: 'string', required: true },
    },
    jobTitle: {
      name: 'Job title',
      type: { name: 'string', required: true },
    },
    companyName: {
      name: 'Company name',
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
    firstName: 'Sally',
    lastName: 'Mei',
    jobTitle: 'UX/UI Designer',
    companyName: 'Datacom',
    url: 'https://www.datacom.com',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const withImage: Story = {
  args: {
    src: '/images/avatar-images/avatar-image.png',
    alt: 'Avatar Image',
  },
};
