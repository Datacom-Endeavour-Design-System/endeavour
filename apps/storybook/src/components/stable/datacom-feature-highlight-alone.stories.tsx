import React from 'react';
import { StoryFn } from '@storybook/react';
import { DatacomFeatureHighlight } from '@datacom/endeavour-react';

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
      type: { name: 'string', required: 'true' },
    },
    description: {
      name: 'Description',
      description: 'Description of display feature',
      type: { name: 'string' },
    },
    ctaText: {
      name: 'CTA Label',
      type: { name: 'string' },
    },
    url: {
      name: 'CTA URL',
      description: 'URL that  should link to.',
      type: { name: 'string' },
    },
  },
  args: {
    featureTitle: 'Title',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.',
    ctaText: 'Learn more',
    url: 'https://datacom.com',
    imageUrl:
      'https://images.pexels.com/photos/15638791/pexels-photo-15638791.jpeg',
  },
};
let key = 0;
let previousDesc = '';

const Template: StoryFn<FeatureHighlightProps & { description: string }> = (
  args,
) => {
  const { description, ctaText, featureTitle, url, icon } = args;
  if (description !== previousDesc) {
    previousDesc = description;
    key++;
  }
  return (
    <div style={{ maxWidth: 386 }}>
      <DatacomFeatureHighlight
        key={key}
        imageUrl="https://images.pexels.com/photos/15638791/pexels-photo-15638791.jpeg"
        featureTitle={featureTitle}
        icon={icon}
        url={url}
        ctaText={ctaText}>
        {description && <span slot="description">{description}</span>}
      </DatacomFeatureHighlight>
    </div>
  );
};

export const FeatureHighlight = Template.bind({});
FeatureHighlight.args = {};
