import { StoryObj, Meta } from '@storybook/react';
import { DatacomButton } from '@datacom-digital/endeavour-react';

const meta: Meta<typeof DatacomButton> = {
  title: 'Button',
  component: DatacomButton,
  argTypes: {
    text: {
      name: 'Text',
      defaultValue: 'Button text',
      description: 'Button text',
      type: { name: 'string' },
    },
    variant: {
      name: 'Variant',
      description: 'Main button variant. Defaults to primary if not set.',
      control: {
        type: 'select',
        labels: {
          primary: 'Primary',
          secondary: 'Secondary',
          tertiary: 'Tertiary',
        },
      },
      defaultValue: 'primary',
      options: ['primary', 'secondary', 'tertiary'],
      type: { name: 'string' },
    },
    size: {
      name: 'Size',
      description:
        'Button size within variant. Defaults to standard if not set',
      control: {
        type: 'select',
        labels: {
          large: 'Large',
          small: 'Small',
        },
      },
      defaultValue: 'large',
      options: ['large', 'small'],
    },
    iconPosition: {
      name: 'Icon position',
      description: 'Image or icon position. Defaults to left if not set',
      control: {
        type: 'select',
        labels: {
          left: 'Left',
          right: 'Right',
        },
      },
      defaultValue: 'left',
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
      description: 'Disable button',
      type: { name: 'boolean' },
    },
    loading: {
      name: 'Loading',
      description: 'Show loading spinner',
      type: { name: 'boolean' },
    },
  },
  args: {
    text: 'Button',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
  },
};
