import React from 'react';
import { StoryFn } from '@storybook/react';
import {
  DatacomCardGroup,
  DatacomContentCard,
  DatacomContentTag,
} from '@datacom/endeavour-react';

type ContentCardProps = React.ComponentProps<typeof DatacomContentCard>;

export default {
  title: 'Card',
  component: DatacomContentCard,
  argTypes: {
    date: {
      name: 'Date',
      description: 'Text of date displayed.',
      type: { name: 'string' },
    },
    cardTitle: {
      name: 'Title',
      description: 'Text of title displayed.',
      type: { name: 'string' },
    },
    description: {
      name: 'Description',
      description: 'Text of description displayed.',
      type: { name: 'string' },
    },
    tagText: {
      name: 'Tag Text',
      description: 'Text for content tag.',
      type: { name: 'string' },
    },
    ctaText: {
      name: 'CTA Label',
      description: 'Text within the CTA element.',
      type: { name: 'string' },
    },
    url: {
      name: 'URL',
      description: 'URL that CTA should link to.',
      type: { name: 'string' },
    },
    imageUrl: {
      name: 'Image URL',
      description: 'Image URL to be displayed at top of card.',
      type: { name: 'string' },
    },
    icon: {
      name: 'Icon',
      description: 'Display action icon from a set of pre-defined images',
      control: 'select',
      options: [
        '',
        'add',
        'add-to-cart',
        'back',
        'back-to-top',
        'bookmark',
        'calendar',
        'copy',
        'down',
        'download',
        'external-link',
        'filter',
        'forward',
        'globe',
        'information',
        'menu',
        'refresh',
        'remove',
        'search',
        'settings',
        'theme',
        'up',
        'upload',
      ],
      type: { name: 'string' },
    },
  },
  args: {
    date: '00-00-2022',
    cardTitle: 'Title',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore etdolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.',
    tagText: 'Tag',
    ctaText: 'Button text',
    url: 'https://datacom.com',
    imageUrl:
      'https://images.pexels.com/photos/15638791/pexels-photo-15638791.jpeg',
  },
};

let key = 0;
let previousDesc = '';

const Template: StoryFn<
  ContentCardProps & { description: string; tagText: string }
> = (args) => {
  const { description, tagText } = args;

  // Trigger re-render if description is updated (as changes to slotted elements don't trigger re-renders)
  if (description !== previousDesc) {
    previousDesc = description;
    key++;
  }

  return (
    <div style={{ height: 600 }}>
      <div style={{ maxWidth: 386 }}>
        <DatacomContentCard key={key} {...args}>
          {tagText && (
            <DatacomContentTag url="https://datacom.com" slot="tags">
              {tagText}
            </DatacomContentTag>
          )}
          {description && <span slot="description">{description}</span>}
        </DatacomContentCard>
      </div>
    </div>
  );
};

export const ContentCard = Template.bind({});

export const ContentCardGroup = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: 600 }}>
      <div style={{ maxWidth: 1254, width: '100%' }}>
        <DatacomCardGroup>
          <DatacomContentCard
            date="00-00-2022"
            cardTitle="Card 1"
            ctaText="Learn more"
            icon="download"
            imageUrl="https://images.pexels.com/photos/15638791/pexels-photo-15638791.jpeg">
            <DatacomContentTag url="https://datacom.com" slot="tags">
              Professional Services
            </DatacomContentTag>
            <DatacomContentTag url="https://datacom.com" slot="tags">
              Articles
            </DatacomContentTag>
            <span slot="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi.
            </span>
          </DatacomContentCard>
          <DatacomContentCard
            date="00-00-2022"
            cardTitle="Card 2"
            ctaText="Learn more"
            imageUrl="https://images.pexels.com/photos/259526/pexels-photo-259526.jpeg">
            <DatacomContentTag url="https://datacom.com" slot="tags">
              Articles
            </DatacomContentTag>
            <span slot="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi.
            </span>
          </DatacomContentCard>
          <DatacomContentCard
            date="00-00-2022"
            cardTitle="Card 3"
            ctaText="Learn more"
            imageUrl="https://images.pexels.com/photos/11542516/pexels-photo-11542516.jpeg">
            <DatacomContentTag url="https://datacom.com" slot="tags">
              Articles
            </DatacomContentTag>
            <span slot="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </span>
          </DatacomContentCard>
          <DatacomContentCard
            date="00-00-2022"
            cardTitle="Card 4"
            ctaText="Learn more"
            icon="download"
            imageUrl="https://images.pexels.com/photos/15638791/pexels-photo-15638791.jpeg">
            <DatacomContentTag url="https://datacom.com" slot="tags">
              Articles
            </DatacomContentTag>
            <span slot="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi.
            </span>
          </DatacomContentCard>
          <DatacomContentCard
            date="00-00-2022"
            cardTitle="Card 5"
            ctaText="Learn more"
            imageUrl="https://images.pexels.com/photos/259526/pexels-photo-259526.jpeg">
            <DatacomContentTag url="https://datacom.com" slot="tags">
              Articles
            </DatacomContentTag>
            <span slot="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi.
            </span>
          </DatacomContentCard>
          <DatacomContentCard
            date="00-00-2022"
            cardTitle="Card 6"
            ctaText="Learn more"
            imageUrl="https://images.pexels.com/photos/11542516/pexels-photo-11542516.jpeg">
            <DatacomContentTag url="https://datacom.com" slot="tags">
              Articles
            </DatacomContentTag>
            <span slot="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi.
            </span>
          </DatacomContentCard>
        </DatacomCardGroup>
      </div>
    </div>
  );
};
