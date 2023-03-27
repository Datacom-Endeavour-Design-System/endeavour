import React, { Fragment } from 'react';
import { ComponentStoryFn } from '@storybook/react';
import { DatacomRadio, DatacomRadioGroup } from '@datacom/endeavour-react';

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

export const RadioGrouping = (args) => {
  return (
    <Fragment>
      <DatacomRadio
        {...args}
        variant="radio"
        label="Radio item 1"
        name="choose"
        value="choice1"
        checked="true"
        style={{ 'padding-bottom': '12px' }}>
        {' '}
      </DatacomRadio>
      <DatacomRadio
        {...args}
        variant="radio"
        label="Radio item 2"
        name="choose"
        value="choice2"
        style={{ 'padding-bottom': '12px' }}>
        {' '}
      </DatacomRadio>
      <DatacomRadio
        {...args}
        variant="radio"
        label="Radio item 3"
        name="choose"
        value="choice3"
        style={{ 'padding-bottom': '12px' }}>
        {' '}
      </DatacomRadio>
      <DatacomRadio
        {...args}
        variant="radio"
        label="Radio item 4"
        name="choose"
        value="choice4">
        {' '}
      </DatacomRadio>
    </Fragment>
  );
};

export const RadioButton = Template.bind({});
RadioButton.args = {
  variant: 'button',
  label: 'Radio button',
  size: 'standard',
  disabled: false,
  checked: false,
};

export const RadioButtonGrouping = (args) => {
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <DatacomRadio
        {...args}
        label=" Radio button 1"
        checked="true"
        name="choose"
        value="choice1"
        variant="button">
        {' '}
      </DatacomRadio>
      <DatacomRadio
        {...args}
        label="Radio button 2"
        name="choose"
        value="choice2"
        variant="button">
        {' '}
      </DatacomRadio>
      <DatacomRadio
        {...args}
        label="Radio button 3"
        name="choose"
        value="choice3"
        variant="button">
        {' '}
      </DatacomRadio>
    </div>
  );
};

export const RadioGroupButton = (args) => {
  return (
    <DatacomRadioGroup>
      <DatacomRadio
        {...args}
        variant="button"
        checked
        label="Radio item 1"
        name="choose"
        value="choice1"></DatacomRadio>
      <DatacomRadio
        {...args}
        name="choose"
        label="Radio item 2"
        value="choice2"
        variant="button"></DatacomRadio>
      <DatacomRadio
        {...args}
        name="choose"
        label="Radio item 3"
        value="choice3"
        variant="button"></DatacomRadio>
      <DatacomRadio
        {...args}
        name="choose"
        label="Radio item 4"
        value="choice4"
        variant="button"></DatacomRadio>
    </DatacomRadioGroup>
  );
};
