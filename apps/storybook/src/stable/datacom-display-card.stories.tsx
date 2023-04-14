import React from 'react';
import { StoryFn } from '@storybook/react';
import {
  DatacomDisplayCardGroup,
  DatacomDisplayCard,
} from '@datacom/endeavour-react';
import styled from '@emotion/styled';

type DisplayCardProps = React.ComponentProps<typeof DatacomDisplayCard>;

export default {
  title: 'Display Card',
  component: DatacomDisplayCard,
  argTypes: {
    heading: {
      name: 'Title',
      defaultValue: 'Title',
      description: 'Text of title displayed.',
      type: { name: 'string', required: 'true' },
    },
    description: {
      name: 'Description',
      defaultValue:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore etdolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.',
      description: 'Description of display card.',
      type: { name: 'string' },
    },
    ctaText: {
      name: 'CTA Text',
      defaultValue: 'Learn more',
      type: { name: 'string' },
    },
    url: {
      name: 'URL',
      defaultValue: 'https://datacom.com',
      description: 'URL that  should link to.',
      type: { name: 'string' },
    },
    imageUrl: {
      name: 'Image URL',
      defaultValue:
        'https://images.pexels.com/photos/15638791/pexels-photo-15638791.jpeg',
      description: 'Image URL to be displayed at top of card.',
      type: { name: 'string', required: 'true' },
    },
  },
};
let key = 0;
let previousDesc = '';

const Div = styled.div`
  max-width: 600px;
`;

const Template: StoryFn<DisplayCardProps & { description: string }> = (
  args
) => {
  const { description } = args;
  if (description !== previousDesc) {
    previousDesc = description;
    key++;
  }
  return (
    <Div>
      <DatacomDisplayCard key={key} {...args}>
        {description && <span slot="description">{description}</span>}
      </DatacomDisplayCard>
    </Div>
  );
};

export const DisplayCard = Template.bind({});
DisplayCard.args = {};

export const DisplayCardGroup = () => {
  return (
    <div style={{ minWidth: '1200' }}>
      <DatacomDisplayCardGroup>
        <DatacomDisplayCard
          heading="Title"
          imageUrl="https://images.pexels.com/photos/15638791/pexels-photo-15638791.jpeg"
          ctaText="Learn more"
          url="https://datacom.com">
          <span slot="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
          </span>
        </DatacomDisplayCard>
        <DatacomDisplayCard
          heading="Title"
          imageUrl="https://images.pexels.com/photos/15638791/pexels-photo-15638791.jpeg"
          ctaText="Learn more"
          url="https://datacom.com">
          <span slot="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
          </span>
        </DatacomDisplayCard>
      </DatacomDisplayCardGroup>
    </div>
  );
};
