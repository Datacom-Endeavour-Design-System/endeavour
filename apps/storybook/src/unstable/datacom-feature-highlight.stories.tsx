import React from 'react';
import { StoryFn } from '@storybook/react';
import {
  DatacomFeatureHighlight,
  DatacomFeatureHighlightGroup,
} from '@datacom/endeavour-react';

type FeatureHighlightProps = React.ComponentProps<
  typeof DatacomFeatureHighlight
>;

export default {
  title: 'Feature Highlight',
  component: DatacomFeatureHighlight,
  argTypes: {
    icon: {
      name: 'Variant',
      description: 'Display image icon from a set of pre-defined images',
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
      defaultValue: 'Title',
      description: 'Text of title displayed.',
      type: { name: 'string', required: 'true' },
    },
    description: {
      name: 'Description',
      defaultValue:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore etdolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.',
      description: 'Description of display feature',
      type: { name: 'string' },
    },
    ctaText: {
      name: 'CTA Label',
      defaultValue: 'Learn more',
      type: { name: 'string' },
    },
    url: {
      name: 'CTA URL',
      defaultValue: 'https://datacom.com',
      description: 'URL that  should link to.',
      type: { name: 'string' },
    },
  },
};
let key = 0;
let previousDesc = '';

const Template: StoryFn<FeatureHighlightProps & { description: string }> = (
  args
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

export const FeatureHighlightGroup = (
  args: FeatureHighlightProps & { description: string }
) => {
  const { description, ctaText, featureTitle, icon } = args;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: 600 }}>
      <div style={{ maxWidth: 1254, width: '100%' }}>
        <DatacomFeatureHighlightGroup>
          <DatacomFeatureHighlight
            featureTitle={featureTitle}
            imageUrl="https://images.pexels.com/photos/15638791/pexels-photo-15638791.jpeg"
            ctaText={ctaText}
            icon={icon}
            url="#">
            <span slot="description">{description}</span>
          </DatacomFeatureHighlight>
          <DatacomFeatureHighlight
            featureTitle={featureTitle}
            icon={icon}
            imageUrl="https://images.pexels.com/photos/15638791/pexels-photo-15638791.jpeg"
            ctaText="Learn more"
            url="#">
            <span slot="description">{description}</span>
          </DatacomFeatureHighlight>
          <DatacomFeatureHighlight
            featureTitle={featureTitle}
            imageUrl="https://images.pexels.com/photos/15638791/pexels-photo-15638791.jpeg"
            ctaText="Learn more"
            icon={icon}
            url="#">
            <span slot="description">{description}</span>
          </DatacomFeatureHighlight>
          <DatacomFeatureHighlight
            featureTitle={featureTitle}
            icon={icon}
            imageUrl="https://images.pexels.com/photos/15638791/pexels-photo-15638791.jpeg"
            ctaText="Learn more"
            url="#">
            <span slot="description">{description}</span>
          </DatacomFeatureHighlight>
        </DatacomFeatureHighlightGroup>
      </div>
    </div>
  );
};
