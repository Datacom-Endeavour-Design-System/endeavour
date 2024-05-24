import React from 'react';
import { StoryObj } from '@storybook/react';
import { DatacomRating } from '@datacom-digital/endeavour-react';

export default {
  title: 'Rating',
  component: DatacomRating,
  argTypes: {
    label: {
      name: 'Label',
      defaultValue: 'Label',
      description: 'Label rendered to right of rating',
      type: { name: 'string' },
    },
    size: {
      name: 'Size',
      description:
        'Size of stars in rating component. Defaults to standard if not set.',
      control: {
        type: 'select',
        labels: { standard: 'Small', large: 'Large' },
      },
      defaultValue: 'standard',
      options: ['standard', 'large'],
      type: { name: 'string' },
    },
    readonly: {
      name: 'Read only',
      description: 'Will only display set rating if set to true.',
      type: { name: 'boolean' },
    },
    ratingValue: {
      name: 'Rating value',
      description:
        'Rating value to be displayed. Only used when readonly property is set to true',
      type: { name: 'number' },
      if: { arg: 'readonly' },
    },
  },
  args: {
    label: '',
    size: 'large',
  },
};

export const Default: StoryObj<typeof DatacomRating> = {
  render: (props) => {
    return <DatacomRating {...props}></DatacomRating>;
  },
};
