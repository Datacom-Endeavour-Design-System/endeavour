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
          'product-highlight': 'Product - Highlight',
          'product-promo': 'Product - Promo',
        },
      },
      defaultValue: 'article',
      options: ['article', 'event', 'product-highlight', 'product-promo'],
      type: { name: 'string' },
    },
    url: {
      name: 'URL',
      defaultValue: 'https://datacom.com',
      description:
        'URL that content tag should link to. Omitting a url will change the tag into a non-interactable div element',
      type: { name: 'string' },
    },
  },
};

const Template: StoryFn<ContentTagProps & { label: string }> = (args) => {
  const { label, url, variant } = args;

  return (
    <DatacomContentTag variant={variant} url={url}>
      {label}
    </DatacomContentTag>
  );
};

export const ContentTag = Template.bind({});
