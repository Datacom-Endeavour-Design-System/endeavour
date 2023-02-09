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
      control: 'select',
      defaultValue: 'article',
      options: ['article', 'event'],
      type: { name: 'string' },
    },
    solid: {
      name: 'Product Style',
      description: 'If true, sets a solid style on the content tag.',
      type: { name: 'boolean' },
    },
  },
};

const Template: StoryFn<ContentTagProps & { label: string }> = (args) => {
  const { label, solid, variant } = args;

  return (
    <DatacomContentTag solid={solid} variant={variant}>
      {label}
    </DatacomContentTag>
  );
};

export const ContentTag = Template.bind({});
