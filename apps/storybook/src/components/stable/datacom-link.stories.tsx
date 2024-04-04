import React from 'react';
import { StoryFn } from '@storybook/react';
import { DatacomLink } from '@datacom/endeavour-react';

type LinkProps = React.ComponentProps<typeof DatacomLink>;

export default {
  title: 'Link',
  component: DatacomLink,
  argTypes: {
    linkLabel: {
      name: 'Label',
      description: 'Specify label for link.',
      type: { name: 'string' },
    },
    variant: {
      name: 'Variant',
      description: "Link variants.Defaults to 'standalone' if not set.",
      control: {
        type: 'select',
        labels: {
          standalone: 'Standalone',
          footer: 'Footer',
          inline: 'Inline',
          stacked: 'Stacked',
        },
      },
      options: ['standalone', 'inline', 'stacked', 'footer'],
      type: { name: 'string' },
    },
    iconPosition: {
      name: 'Image position',
      description: 'Image or icon position. Defaults to left if not set',
      control: {
        type: 'select',
        labels: {
          left: 'Left',
          right: 'Right',
        },
      },
      options: ['left', 'right'],
    },
    icon: {
      name: 'Icon',
      description: 'Display image icon from a set of pre-defined images',
      control: {
        type: 'select',
        labels: {
          add: 'Add',
          'add-to-cart': 'Add-to-cart',
          back: 'Back',
          'back-to-top': 'Back-to-top',
          bookmark: 'Bookmark',
          calendar: 'Calendar',
          copy: 'Copy',
          down: 'Down',
          download: 'Download',
          'external-link': 'External-link',
          filter: 'Filter',
          forward: 'Forward',
          globe: 'Globe',
          information: 'Information',
          menu: 'Menu',
          refresh: 'Refresh',
          remove: 'Remove',
          search: 'Search',
          settings: 'Settings',
          theme: 'Theme',
          up: 'Up',
          upload: 'Upload',
        },
      },
      options: [
        '',
        'add',
        'add-to-cart',
        'back',
        'back-to-top',
        'bookmark',
        'calendar',
        'copy',
        'down',
        'download',
        'external-link',
        'filter',
        'forward',
        'globe',
        'information',
        'menu',
        'refresh',
        'remove',
        'search',
        'settings',
        'theme',
        'up',
        'upload',
      ],
    },
    disabled: {
      name: 'Disabled',
      description: 'Disable Link',
      type: { name: 'boolean' },
    },
    url: {
      name: 'URL',
      description: 'Should be add link to. ',
      type: { name: 'string' },
    },
  },
  args: {
    linkLabel: 'Learn more',
    variant: 'standalone',
    iconPosition: 'left',
    icon: '',
    disabled: false,
    url: '#',
  },
};

const Template: StoryFn<LinkProps> = (args) => {
  return <DatacomLink {...args}></DatacomLink>;
};

export const Default = Template.bind({});

export const WithIcon = Template.bind({});
WithIcon.args = {
  icon: 'globe',
};

export const InlineLinks = {
  argTypes: {
    linkLabel: {
      name: 'Label',
      type: { name: 'string' },
    },
    variant: {
      name: 'Variant',
      description: " Link variants.Defaults to 'standalone' if not set.",
      table: { disable: true },
    },
    iconPosition: {
      name: 'Image position',
      description: 'Image or icon position. Defaults to left if not set',
      table: { disable: true },
    },
    icon: {
      name: 'Icon',
      description: 'Display image icon from a set of pre-defined images',
      table: { disable: true },
    },
  },
  render: () => {
    return (
      <div>
        <div style={{ paddingBottom: '12px', color: '' }}>
          <p style={{ color: 'var(--dc-primary-text-color)' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            <DatacomLink
              variant="inline"
              url="https://www.datacom.com/nz/en"
              icon="forward"
              iconPosition="right">
              Learn more
            </DatacomLink>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
    );
  },
};

export const StackedLinks = {
  argTypes: {
    linkLabel: {
      name: 'Label',
      type: { name: 'string' },
    },
    variant: {
      name: 'Variant',
      description: " Link variants.Defaults to 'standalone' if not set.",
      table: { disable: true },
    },
    iconPosition: {
      name: 'Image position',
      description: 'Image or icon position. Defaults to left if not set',
      table: { disable: true },
    },
    icon: {
      name: 'Icon',
      description: 'Display image icon from a set of pre-defined images',
      table: { disable: true },
    },
  },
  render: () => {
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
  },
};

export const FooterLinks = {
  argTypes: {
    linkLabel: {
      name: 'Label',
      type: { name: 'string' },
    },
    variant: {
      name: 'Variant',
      description: " Link variants.Defaults to 'standalone' if not set.",
      table: { disable: true },
    },
    iconPosition: {
      name: 'Image position',
      description: 'Image or icon position. Defaults to left if not set',
      table: { disable: true },
    },
    icon: {
      name: 'Icon',
      description: 'Display image icon from a set of pre-defined images',
      table: { disable: true },
    },
  },
  render: () => {
    return (
      <div>
        <div style={{ paddingBottom: '12px' }}>
          <DatacomLink
            variant="footer"
            url="https://www.datacom.com/nz/en"
            icon="forward"
            iconPosition="right">
            Learn more
          </DatacomLink>
        </div>
        <DatacomLink
          variant="footer"
          url="https://www.datacom.com/nz/en/search"
          icon="settings"
          iconPosition="right">
          Account settings
        </DatacomLink>
      </div>
    );
  },
};
