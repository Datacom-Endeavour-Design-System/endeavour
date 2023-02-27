import React from 'react';
import { StoryFn } from '@storybook/react';
import {
  DatacomCardGroup,
  DatacomContentCard,
  DatacomContentTag,
} from '@datacom/endeavour-react';
import styled from '@emotion/styled';

type ContentCardProps = React.ComponentProps<typeof DatacomContentCard>;

export default {
  title: 'Card',
  component: DatacomContentCard,
  argTypes: {
    date: {
      name: 'Date',
      defaultValue: '00-00-2022',
      description: 'Text of date displayed.',
      type: { name: 'string' },
    },
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
    url: {
      name: 'URL',
      defaultValue: 'https://datacom.com',
      description: 'URL that CTA should link to.',
      type: { name: 'string' },
    },
    imageUrl: {
      name: 'Image URL',
      defaultValue:
        'https://images.pexels.com/photos/15638791/pexels-photo-15638791.jpeg',
      description: 'Image URL to be displayed at top of card.',
      type: { name: 'string' },
    },
    icon: {
      name: 'Icon',
      description: 'Display action icon from a set of pre-defined images',
      control: 'select',
      options: [
        '',
        'globe',
        'upload',
        'up',
        'settings',
        'search',
        'remove',
        'refresh',
        'menu',
        'information',
        'forward',
        'filter',
        'external-link',
        'download',
        'down',
        'copy',
        'calendar',
        'bookmark',
        'back',
        'back-to-top',
        'add',
        'add-to-cart',
      ],
      type: { name: 'string' },
    },
  },
};

const Template: StoryFn<
  ContentCardProps & { description: string; tagText: string }
> = (args) => {
  const { ctaText, date, description, icon, imageUrl, tagText, title, url } =
    args;

  const Wrapper = styled.div`
    max-width: 400px;
  `;

  return (
    <Wrapper>
      <DatacomContentCard
        ctaText={ctaText}
        date={date}
        icon={icon}
        imageUrl={imageUrl}
        title={title}
        url={url}>
        {tagText && (
          <DatacomContentTag slot="tags">{tagText}</DatacomContentTag>
        )}
        {description}
      </DatacomContentCard>
    </Wrapper>
  );
};

export const ContentCard = Template.bind({});

export const ContentCardGroup = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: '1400px' }}>
        <DatacomCardGroup>
          <DatacomContentCard
            date="00-00-2022"
            title="Card 1"
            ctaText="Learn more"
            icon="download"
            imageUrl="https://images.pexels.com/photos/15638791/pexels-photo-15638791.jpeg">
            <DatacomContentTag slot="tags">
              Professional Services
            </DatacomContentTag>
            <DatacomContentTag slot="tags">Articles</DatacomContentTag>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
          </DatacomContentCard>
          <DatacomContentCard
            date="00-00-2022"
            title="Card 2"
            ctaText="Learn more"
            imageUrl="https://images.pexels.com/photos/259526/pexels-photo-259526.jpeg">
            <DatacomContentTag slot="tags">Articles</DatacomContentTag>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
          </DatacomContentCard>
          <DatacomContentCard
            date="00-00-2022"
            title="Card 3"
            ctaText="Learn more"
            imageUrl="https://images.pexels.com/photos/11542516/pexels-photo-11542516.jpeg">
            <DatacomContentTag slot="tags">Articles</DatacomContentTag>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </DatacomContentCard>
        </DatacomCardGroup>
      </div>
    </div>
  );
};