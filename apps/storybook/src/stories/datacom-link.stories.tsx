import React from 'react';
import { StoryFn } from '@storybook/react';
import { DatacomLink } from '@datacom/endeavour-react';

type LinkProps = React.ComponentProps<typeof DatacomLink>;

export default {
  title: 'Link',
  component: DatacomLink,
  argTypes: {
    label: {
      name: 'Label',
      defaultValue: 'Learn more',
      type: { name: 'string' },
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
    size: {
      name: 'Size',
      description: 'Link size within variant.Defaults to large if not set',
      control: {
        type: 'select',
        labels: {
          standard: 'Standard',
          footer: 'Footer',
        },
      },
      defaultValue: 'standard',
      options: ['standard', 'footer'],
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
      defaultValue: 'https://datacom.com/nz/en',
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
  const { label, url, variant, icon, imagePosition, size, disabled } = args;
  return (
    <DatacomLink
      variant={variant}
      size={size}
      url={url}
      icon={icon}
      imagePosition={imagePosition}
      disabled={disabled}>
      {label}
    </DatacomLink>
  );
};

export const Link = Template.bind({});

export const LinkWithIcon = Template.bind({});
LinkWithIcon.args = {
  icon: 'globe',
};

export const stackedLinks = () => {
  return (
    <div>
      <DatacomLink
        variant="stacked"
        url="https://www.datacom.com/nz/en"
        icon="forward"
        imagePosition="right"
        style={{ paddingBottom: '12px' }}>
        Learn more
      </DatacomLink>
      <DatacomLink
        variant="stacked"
        url="https://www.datacom.com/nz/en/search"
        icon="settings"
        imagePosition="right"
        style={{ paddingBottom: '12px' }}>
        Account settings
      </DatacomLink>
    </div>
  );
};
