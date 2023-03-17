import React from 'react';
import { ComponentStoryFn } from '@storybook/react';
import { DatacomRating } from '@datacom/endeavour-react';

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
      control: 'select',
      defaultValue: 'standard',
      options: ['standard', 'large'],
      type: { name: 'string' },
    },
    readonly: {
      name: 'Read Only',
      description: 'Will only display set rating if set to true.',
      type: { name: 'boolean' },
    },
    ratingValue: {
      name: 'Rating Value',
      description:
        'Rating value to be displayed. Only used when readonly property is set to true',
      type: { name: 'number' },
    },
  },
};

const SimpleTemplate: ComponentStoryFn<typeof DatacomRating> = (args) => (
  <DatacomRating {...args}></DatacomRating>
);

export const Simple = SimpleTemplate.bind({});
