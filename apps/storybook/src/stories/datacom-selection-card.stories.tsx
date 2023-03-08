import React from 'react';
import { StoryFn } from '@storybook/react';
import {
  DatacomCardGroup,
  DatacomSelectionCard,
  DatacomContentTag,
  DatacomRadio,
} from '@datacom/endeavour-react';

type SelectionCardProps = React.ComponentProps<typeof DatacomSelectionCard>;

export default {
  title: 'Card',
  component: DatacomSelectionCard,
  argTypes: {
    title: {
      name: 'Title',
      defaultValue: 'Title',
      description: 'Text of title displayed.',
      type: { name: 'string' },
    },
    description: {
      name: 'Description',
      defaultValue:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore etdolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.',
      description: 'Text of description displayed.',
      type: { name: 'string' },
    },
    tagText: {
      name: 'Tag Text',
      defaultValue: 'Tag',
      description: 'Text for content tag.',
      type: { name: 'string' },
    },
    ctaText: {
      name: 'CTA Label',
      defaultValue: 'Label',
      description: 'Text within the CTA element.',
      type: { name: 'string' },
    },
    imageUrl: {
      name: 'Image URL',
      defaultValue:
        'https://images.pexels.com/photos/15638791/pexels-photo-15638791.jpeg',
      description: 'Image URL to be displayed at top of card.',
      type: { name: 'string' },
    },
  },
};

const Template: StoryFn<
  SelectionCardProps & { description: string; tagText: string }
> = (args) => {
  const { ctaText, description, imageUrl, tagText, title } = args;

  return (
    <div style={{ height: 600 }}>
      <div style={{ maxWidth: 400 }}>
        <DatacomSelectionCard
          ctaText={ctaText}
          imageUrl={imageUrl}
          cardTitle={title}>
          <DatacomRadio slot="options" label="Label" id="radio1" value="1" />
          <DatacomRadio slot="options" label="Label" id="radio2" value="2" />
          <DatacomRadio slot="options" label="Label" id="radio3" value="3" />
          {tagText && (
            <DatacomContentTag slot="tags">{tagText}</DatacomContentTag>
          )}
          <span slot="description">{description}</span>
        </DatacomSelectionCard>
      </div>
    </div>
  );
};

export const SelectionCard = Template.bind({});

export const SelectionCardGroup = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: 600 }}>
      <div style={{ maxWidth: 1400, width: '100%' }}>
        <DatacomCardGroup>
          <DatacomSelectionCard
            cardTitle="Card 1"
            ctaText="Next"
            imageUrl="https://images.pexels.com/photos/15638791/pexels-photo-15638791.jpeg">
            <DatacomRadio slot="options" label="Label" id="radio1" value="1" />
            <DatacomRadio slot="options" label="Label" id="radio2" value="2" />
            <DatacomRadio slot="options" label="Label" id="radio3" value="3" />
            <span slot="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi.
            </span>
          </DatacomSelectionCard>
          <DatacomSelectionCard
            cardTitle="Card 2"
            ctaText="Next"
            imageUrl="https://images.pexels.com/photos/259526/pexels-photo-259526.jpeg">
            <DatacomRadio slot="options" label="Label" id="radio1" value="1" />
            <DatacomRadio slot="options" label="Label" id="radio2" value="2" />
            <DatacomRadio slot="options" label="Label" id="radio3" value="3" />
            <span slot="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi.
            </span>
          </DatacomSelectionCard>
          <DatacomSelectionCard
            cardTitle="Card 3"
            ctaText="Next"
            imageUrl="https://images.pexels.com/photos/11542516/pexels-photo-11542516.jpeg">
            <DatacomRadio slot="options" label="Label" id="radio1" value="1" />
            <DatacomRadio slot="options" label="Label" id="radio2" value="2" />
            <DatacomRadio slot="options" label="Label" id="radio3" value="3" />
            <span slot="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </span>
          </DatacomSelectionCard>
        </DatacomCardGroup>
      </div>
    </div>
  );
};
