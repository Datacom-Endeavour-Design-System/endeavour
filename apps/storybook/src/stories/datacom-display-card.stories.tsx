import React from 'react';
import { ComponentStoryFn } from '@storybook/react';
import {
  DatacomDisplayCardGroup,
  DatacomDisplayCard,
} from '@datacom/endeavour-react';
import styled from '@emotion/styled';

export default {
  title: 'DisplayCard',
  component: DatacomDisplayCard,
  argTypes: {
    heading: {
      name: 'Title',
      defaultValue: 'Title',
      description: 'Text of title displayed.',
      type: { name: 'string' },
    },
    ctaText: {
      name: 'Text',
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

const Div = styled.div`
  max-width: 600px;
`;

const Template: ComponentStoryFn<typeof DatacomDisplayCard> = (args) => {
  return (
    <Div>
      <DatacomDisplayCard {...args}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </DatacomDisplayCard>
    </Div>
  );
};

export const DisplayCard = Template.bind({});
DisplayCard.args = {};

export const DisplayCardGroup = (args: any) => {
  return (
    <div style={{ minWidth: '1200' }}>
      <DatacomDisplayCardGroup>
        <DatacomDisplayCard {...args}>
          {' '}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </DatacomDisplayCard>
        <DatacomDisplayCard {...args}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </DatacomDisplayCard>
      </DatacomDisplayCardGroup>
    </div>
  );
};
