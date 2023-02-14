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
      defaultValue: 'Label',
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
          productpromo: 'Product - Promo',
          productsale: 'Product - Sale',
        },
      },
      defaultValue: 'article',
      options: ['article', 'event', 'productpromo', 'productsale'],
      type: { name: 'string' },
    },
  },
};

const Template: StoryFn<ContentTagProps & { label: string }> = (args) => {
  const { label, variant } = args;

  return <DatacomContentTag variant={variant}>{label}</DatacomContentTag>;
};

export const ContentTag = Template.bind({});
