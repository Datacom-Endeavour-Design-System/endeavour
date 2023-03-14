import React from 'react';
import { StoryFn } from '@storybook/react';
import { DatacomLink } from '@datacom/endeavour-react';

type LinkProps = React.ComponentProps<typeof DatacomLink>;

export default {
  title: 'Link',
  component: DatacomLink,
  argTypes: {
    label: {
      name: 'Cta Text',
      defaultValue: 'Learn more',
      type: { name: 'string' },
    },
    size: {
      name: 'Size',
      description: 'Link size within variant.Defaults to large if not set',
      control: 'select',
      defaultValue: 'large',
      options: ['large', 'small'],
    },
    variant: {
      name: 'Variant',
      description: " Link variants.Defaults to 'standalone' if not set.",
      control: {
        type: 'select',
        labels: {
          standalone: 'Standalone',
          inline: 'Inline',
          stacked: 'Stacked',
        },
      },
      defaultValue: 'standalone',
      options: ['standalone', 'inline', 'stacked'],
      type: { name: 'string' },
    },
    imagePosition: {
      name: 'Image Position',
      description: 'Image or icon position. Defaults to left if not set',
      control: 'select',
      defaultValue: 'left',
      options: ['left', 'right'],
    },
    icon: {
      name: 'Icon',
      description: 'Display image icon from a set of pre-defined images',
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
    },
    url: {
      name: 'URL',
      defaultValue: 'https://datacom.com',
      description: ' should be add link to. ',
      type: { name: 'string', required: true },
    },
    disabled: {
      name: 'Disabled',
      description: 'Disable Link',
      type: { name: 'boolean' },
    },
  },
};

const Template: StoryFn<LinkProps & { label: string }> = (args) => {
  const { label, url, variant, icon, imagePosition } = args;
  return (
    <DatacomLink
      variant={variant}
      url={url}
      icon={icon}
      imagePosition={imagePosition}>
      {label}
    </DatacomLink>
  );
};

export const Link = Template.bind({});

export const LinkWithIcon = Template.bind({});
LinkWithIcon.args = {
  icon: 'globe',
};

export const stackedLink = (args) => {
  const { label, url, variant, icon, imagePosition } = args;
  return (
    <div>
      <DatacomLink
        variant="stacked"
        url={url}
        icon={icon}
        imagePosition={imagePosition}
        {...args}
        style={{ paddingBottom: '12px' }}>
        {label}
      </DatacomLink>
      <DatacomLink
        variant="stacked"
        url={url}
        icon={icon}
        imagePosition={imagePosition}
        {...args}
        style={{ paddingBottom: '12px' }}>
        {label}
      </DatacomLink>
    </div>
  );
};
