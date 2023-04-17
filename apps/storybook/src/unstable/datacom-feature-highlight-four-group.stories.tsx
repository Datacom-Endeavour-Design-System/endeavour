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
    itemsPerRow: {
      Name: 'ItemsPerRow',
      control: 'select',
      defaultValue: 4,
      options: [3, 4],
    },
  },
};

const GroupStoriesTemplate: StoryFn<FeatureHighlightProps> = (args) => (
  <div style={{ display: 'flex', justifyContent: 'center', height: 600 }}>
    <div style={{ maxWidth: 1254, width: '100%' }}>
      <DatacomFeatureHighlightGroup {...args}>
        <DatacomFeatureHighlight
          featureTitle="Title"
          imageUrl="https://images.pexels.com/photos/15638791/pexels-photo-15638791.jpeg"
          ctaText="Learn more"
          url="#">
          <span slot="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore etdolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
          </span>
        </DatacomFeatureHighlight>
        <DatacomFeatureHighlight
          featureTitle="Title"
          imageUrl="https://images.pexels.com/photos/15638791/pexels-photo-15638791.jpeg"
          ctaText="Learn more"
          url="#">
          <span slot="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore etdolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
          </span>
        </DatacomFeatureHighlight>
        <DatacomFeatureHighlight
          featureTitle="Title"
          imageUrl="https://images.pexels.com/photos/15638791/pexels-photo-15638791.jpeg"
          ctaText="Learn more"
          url="#">
          <span slot="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore etdolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
          </span>
        </DatacomFeatureHighlight>
        <DatacomFeatureHighlight
          featureTitle="Title"
          imageUrl="https://images.pexels.com/photos/15638791/pexels-photo-15638791.jpeg"
          ctaText="Learn more"
          url="#">
          <span slot="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore etdolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
          </span>
        </DatacomFeatureHighlight>
        <DatacomFeatureHighlight
          featureTitle="Title"
          imageUrl="https://images.pexels.com/photos/15638791/pexels-photo-15638791.jpeg"
          ctaText="Learn more"
          url="#">
          <span slot="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore etdolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
          </span>
        </DatacomFeatureHighlight>
      </DatacomFeatureHighlightGroup>
    </div>
  </div>
);
export const _4ColumnFeatureHighlightGroup = GroupStoriesTemplate.bind({});
_4ColumnFeatureHighlightGroup.args = {};
