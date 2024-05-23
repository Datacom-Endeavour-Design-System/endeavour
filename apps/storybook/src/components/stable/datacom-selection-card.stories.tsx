import React from 'react';
import { StoryFn } from '@storybook/react';
import {
  DatacomCardGroup,
  DatacomSelectionCard,
  DatacomContentTag,
  DatacomRadio,
} from '@datacom-digital/endeavour-react';

type SelectionCardProps = React.ComponentProps<typeof DatacomSelectionCard>;

export default {
  title: 'Card',
  component: DatacomSelectionCard,
  argTypes: {
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
      name: 'Tag text',
      description: 'Text for content tag.',
      type: { name: 'string' },
    },
    ctaText: {
      name: 'CTA label',
      description: 'Text within the CTA element.',
      type: { name: 'string' },
    },
    imageUrl: {
      name: 'Image URL',
      description: 'Image URL to be displayed at top of card.',
      type: { name: 'string' },
    },
  },
  args: {
    tagText: 'Tag',
    cardTitle: 'Title',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore etdolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.',
    ctaText: 'Button text',
    imageUrl:
      'https://images.pexels.com/photos/15638791/pexels-photo-15638791.jpeg',
  },
};

let key = 0;
let previousDesc = '';

const Template: StoryFn<
  SelectionCardProps & { description: string; tagText: string }
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
        <DatacomSelectionCard key={key} {...args}>
          <DatacomRadio slot="options" label="Label" id="radio1" value="1" />
          <DatacomRadio slot="options" label="Label" id="radio2" value="2" />
          <DatacomRadio slot="options" label="Label" id="radio3" value="3" />
          {tagText && (
            <DatacomContentTag slot="tags" url="https://datacom.com">
              {tagText}
            </DatacomContentTag>
          )}
          {description && <span slot="description">{description}</span>}
        </DatacomSelectionCard>
      </div>
    </div>
  );
};

export const SelectionCard = Template.bind({});

export const SelectionCardGrouping = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: 600 }}>
      <div style={{ maxWidth: 1254, width: '100%' }}>
        <DatacomCardGroup>
          <DatacomSelectionCard
            cardTitle="Card 1"
            ctaText="Next"
            imageUrl="https://images.pexels.com/photos/15638791/pexels-photo-15638791.jpeg">
            <DatacomContentTag url="https://datacom.com" slot="tags">
              Cloud
            </DatacomContentTag>
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
            <DatacomContentTag url="https://datacom.com" slot="tags">
              Cloud
            </DatacomContentTag>
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
            <DatacomContentTag url="https://datacom.com" slot="tags">
              Cloud
            </DatacomContentTag>
            <DatacomRadio slot="options" label="Label" id="radio1" value="1" />
            <DatacomRadio slot="options" label="Label" id="radio2" value="2" />
            <DatacomRadio slot="options" label="Label" id="radio3" value="3" />
            <span slot="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </span>
          </DatacomSelectionCard>
          <DatacomSelectionCard
            cardTitle="Card 4"
            ctaText="Next"
            imageUrl="https://images.pexels.com/photos/15638791/pexels-photo-15638791.jpeg">
            <DatacomContentTag url="https://datacom.com" slot="tags">
              Cloud
            </DatacomContentTag>
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
            cardTitle="Card 5"
            ctaText="Next"
            imageUrl="https://images.pexels.com/photos/259526/pexels-photo-259526.jpeg">
            <DatacomContentTag url="https://datacom.com" slot="tags">
              Cloud
            </DatacomContentTag>
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
            cardTitle="Card 6"
            ctaText="Next"
            imageUrl="https://images.pexels.com/photos/11542516/pexels-photo-11542516.jpeg">
            <DatacomContentTag url="https://datacom.com" slot="tags">
              Cloud
            </DatacomContentTag>
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
        </DatacomCardGroup>
      </div>
    </div>
  );
};
