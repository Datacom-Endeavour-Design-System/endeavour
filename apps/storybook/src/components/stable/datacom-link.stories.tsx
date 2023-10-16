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
          footer: 'Footer',
          inline: 'Inline',
          stacked: 'Stacked',
        },
      },
      defaultValue: 'standalone',
      options: ['standalone', 'inline', 'stacked', 'footer'],
      type: { name: 'string' },
    },
    iconPosition: {
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
      defaultValue: '#',
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
  const { label, url, variant, icon, iconPosition, disabled } = args;
  return (
    <DatacomLink
      variant={variant}
      url={url}
      icon={icon}
      iconPosition={iconPosition}
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
      <div style={{ paddingBottom: '12px' }}>
        <DatacomLink
          variant="stacked"
          url="https://www.datacom.com/nz/en"
          icon="forward"
          iconPosition="right">
          Learn more
        </DatacomLink>
      </div>
      <DatacomLink
        variant="stacked"
        url="https://www.datacom.com/nz/en/search"
        icon="settings"
        iconPosition="right">
        Account settings
      </DatacomLink>
    </div>
  );
};
