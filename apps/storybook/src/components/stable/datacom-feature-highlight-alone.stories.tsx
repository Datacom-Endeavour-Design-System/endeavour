import React from 'react';
import { StoryFn } from '@storybook/react';
import { DatacomFeatureHighlight } from '@datacom-digital/endeavour-react';

type FeatureHighlightProps = React.ComponentProps<
  typeof DatacomFeatureHighlight
>;

export default {
  title: 'Feature Highlight',
  component: DatacomFeatureHighlight,
  argTypes: {
    icon: {
      name: 'Variant',
      description: 'Display image or icon from a set of pre-defined images',
      control: {
        type: 'select',
        labels: {
          globe: 'Icon',
          '': 'Image',
        },
      },
      options: ['', 'globe'],
      defaultValue: '',
    },
    featureTitle: {
      name: 'Title',
      description: 'Text of title displayed.',
      type: { name: 'string' },
    },
    description: {
      name: 'Description',
      description: 'Description of display feature',
      type: { name: 'string' },
    },
    ctaText: {
      name: 'CTA label',
      description: 'Text within the CTA element',
      type: { name: 'string' },
    },
    url: {
      name: 'CTA URL',
      description: 'URL that  should link to.',
      type: { name: 'string' },
    },
    imageUrl: {
      name: 'Image URL',
      description: 'Image URL to be displayed at top of feature.',
      type: { name: 'string' },
    },
  },
  args: {
    icon: '',
    featureTitle: 'Title',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    ctaText: 'Learn more',
    url: 'https://datacom.com',
    imageUrl:
      'https://images.pexels.com/photos/15638791/pexels-photo-15638791.jpeg',
  },
};
let key = 0;
let previousDesc = '';

export const Default: StoryFn<
  FeatureHighlightProps & { description: string }
> = (args) => {
  const { description } = args;
  if (description !== previousDesc) {
    previousDesc = description;
    key++;
  }
  return (
    <div style={{ maxWidth: 386 }}>
      <DatacomFeatureHighlight key={key} {...args}>
        {description && <span slot="description">{description}</span>}
      </DatacomFeatureHighlight>
    </div>
  );
};
