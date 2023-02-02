import React, { Fragment } from 'react';
import { ComponentStoryFn } from '@storybook/react';
import {
  DatacomRadio,
  DatacomRadioGroup,
  DatacomButton,
} from '@datacom/endeavour-react';
export default {
  title: 'Radio',
  component: DatacomRadio,
  argTypes: {
    label: {
      name: 'Label',
      defaultValue: 'Label',
      description: 'Radio label',
      type: { label: 'string', required: true },
    },
    variant: {
      name: 'Variant',
      description: 'Radios is main Variant',
      control: 'select',
      defaultValue: 'radio',
      options: ['radio', 'button'],
      type: { name: 'string' },
    },

    size: {
      name: 'Size',
      description: 'Radio size within variant. Defaults to standard if not set',
      control: 'select',
      defaultValue: 'standard',
      options: ['standard', 'small'],
      type: { label: 'string', required: true },
    },
    checked: {
      name: 'Selected',
      description: 'Checked Radio',
      type: { name: 'boolean' },
    },
    disabled: {
      name: 'Disabled',
      description: 'Disable Radio',
      type: { name: 'boolean' },
    },
    required: {
      name: 'Required',
      description: 'Required Field',
      type: { name: 'boolean' },
    },
    'image-position': {
      name: 'Image position',
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
        ' ',
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
    Options: { name: 'options' },
  },
  args: {
    variant: 'radio',
    label: 'Radio item',
    size: 'standard',
    required: true,
    disabled: false,
    checked: false,
  },
};

const Template: ComponentStoryFn<typeof DatacomRadio> = (args) => (
  <DatacomRadio {...args} />
);

export const Radio = Template.bind({});
Radio.args = {
  label: ' Radio item',
  size: 'standard',
  disabled: false,
  checked: false,
};

export const Grouped = (args) => {
  return (
    <Fragment>
      <DatacomRadio {...args} name="choose" value="choice1">
        {' '}
      </DatacomRadio>
      <DatacomRadio {...args} name="choose" value="choice2">
        {' '}
      </DatacomRadio>
      <DatacomRadio {...args} name="choose" value="choice3">
        {' '}
      </DatacomRadio>
      <DatacomRadio {...args} name="choose" value="choice4">
        {' '}
      </DatacomRadio>
    </Fragment>
  );
};
export const RadioButtonGroup = (args) => {
  return (
    <DatacomRadioGroup>
      <DatacomRadio
        {...args}
        size="standard"
        variant="button"
        name="choose"
        value="choice1"></DatacomRadio>
      <DatacomRadio
        {...args}
        name="choose"
        value="choice2"
        variant="button"></DatacomRadio>
      <DatacomRadio
        {...args}
        name="choose"
        value="choice3"
        variant="button"></DatacomRadio>
      <DatacomRadio
        {...args}
        name="choose"
        value="choice4"
        variant="button"></DatacomRadio>
    </DatacomRadioGroup>
  );
};
