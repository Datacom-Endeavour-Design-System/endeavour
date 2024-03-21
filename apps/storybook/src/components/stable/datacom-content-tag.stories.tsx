import React from 'react';
import { StoryFn } from '@storybook/react';
import { DatacomContentTag } from '@datacom/endeavour-react';

type ContentTagProps = React.ComponentProps<typeof DatacomContentTag>;

export default {
  title: 'Content Tag',
  component: DatacomContentTag,
  argTypes: {
    label: {
      name: 'Label',
      description: 'Label content within the content tag.',
      type: { name: 'string' },
    },
    variant: {
      name: 'Variant',
      description: "Content tag variant. Defaults to 'article' if not set.",
      control: {
        type: 'select',
        labels: {
          article: 'Article',
          event: 'Event',
          'product-highlight': 'Product - Highlight',
          'product-promo': 'Product - Promo',
        },
      },
      options: ['article', 'event', 'product-highlight', 'product-promo'],
      type: { name: 'string' },
    },
    url: {
      name: 'URL',
      description:
        'URL that content tag should link to. Omitting a url will change the tag into a non-interactable div element',
      type: { name: 'string' },
    },
  },
  args: {
    label: 'Label',
    url: 'https://datacom.com',
    variant: 'article',
  },
};

const Template: StoryFn<ContentTagProps & { label: string }> = (args) => {
  const { label } = args;
  return <DatacomContentTag {...args}>{label}</DatacomContentTag>;
};

export const Default = Template.bind({});
