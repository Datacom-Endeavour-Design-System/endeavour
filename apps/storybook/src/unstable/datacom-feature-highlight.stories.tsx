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
      name: 'URL',
      defaultValue: 'https://datacom.com',
      description: 'URL that  should link to.',
      type: { name: 'string' },
    },
    readonly: {
      name: 'Variant Only',
      description: 'Will only display set rating if set to true.',
      type: { name: 'boolean' },
    },
    variant: {
      name: 'Variant',
      description: 'icon is default variant',
      control: {
        type: 'select',
        labels: { icon: 'Icon', image: 'Image' },
      },
      options: ['icon', 'image'],
      defaultValue: 'icon',
      if: { arg: 'readonly' },
    },
  },
};
let key = 0;
let previousDesc = '';

const Template: StoryFn<FeatureHighlightProps & { description: string }> = (
  args
) => {
  const { description, ctaText, featureTitle, url, variant } = args;
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
        icon="globe"
        variant={variant}
        readonly
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
  const { ctaText, featureTitle, variant } = args;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: 600 }}>
      <div style={{ maxWidth: 1254, width: '100%' }}>
        <DatacomFeatureHighlightGroup>
          <DatacomFeatureHighlight
            variant={variant}
            readonly
            featureTitle={featureTitle}
            imageUrl="https://images.pexels.com/photos/15638791/pexels-photo-15638791.jpeg"
            ctaText={ctaText}
            icon="globe"
            url="#">
            <span slot="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi.
            </span>
          </DatacomFeatureHighlight>
          <DatacomFeatureHighlight
            variant={variant}
            readonly
            featureTitle={featureTitle}
            icon="globe"
            imageUrl="https://images.pexels.com/photos/15638791/pexels-photo-15638791.jpeg"
            ctaText="Learn more"
            url="#">
            <span slot="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi.
            </span>
          </DatacomFeatureHighlight>
          <DatacomFeatureHighlight
            variant={variant}
            readonly
            featureTitle={featureTitle}
            icon="globe"
            imageUrl="https://images.pexels.com/photos/15638791/pexels-photo-15638791.jpeg"
            ctaText="Learn more"
            url="#">
            <span slot="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi.
            </span>
          </DatacomFeatureHighlight>
          <DatacomFeatureHighlight
            variant={variant}
            readonly
            featureTitle={featureTitle}
            icon="globe"
            imageUrl="https://images.pexels.com/photos/15638791/pexels-photo-15638791.jpeg"
            ctaText="Learn more"
            url="#">
            <span slot="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi.
            </span>
          </DatacomFeatureHighlight>
        </DatacomFeatureHighlightGroup>
      </div>
    </div>
  );
};
