import React from 'react';
import { ComponentStoryFn } from '@storybook/react';
import { DatacomButton } from '@datacom/endeavour-react';

export default {
  title: 'Button',
  component: DatacomButton,
  argTypes: {
    text: {
      name: 'Text',
      defaultValue: 'Button text',
      description: 'Button text',
      type: {name: 'string', required: true} 
    },
    variant: { 
      name: 'Variant',
      description: 'Main button variant. Defaults to primary if not set.',
      control: 'select', 
      defaultValue: 'primary',
      options: ['primary', 'secondary', 'ghost'], 
      type: {name: 'string', required: true} 
    },
    size: { 
      name: 'Size',
      description: 'Button size within variant. Defaults to standard if not set',
      control: 'select', 
      defaultValue: 'standard',
      options: ['standard', 'small']
    },
    'image-position': { 
      name: 'Image position', 
      description: 'Image or icon position. Defaults to left if not set',
      control: 'select', 
      defaultValue: 'left',
      options: ['left', 'right'] 
    },
    icon: { 
      name: 'Icon',
      description: 'Display image icon from a set of pre-defined images',
      control: 'select', 
      options: ['', 'globe'] 
    },
    disabled: {
      name: 'Disabled',
      description: 'Disable button',
      type: {name: 'boolean'} 
    },    
    loading: {
      name: 'Loading',
      description: 'Show loading spinner',
      type: {name: 'boolean'} 
    },     
  },
  args: {
    text: 'Button text',
    variant: 'primary',
    size: 'standard',
    "image-position": 'left',
    icon: "",
    loading: false,
    disabled: false
  }
};

const Template: ComponentStoryFn<typeof DatacomButton> = (args) => <DatacomButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary'
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary'
};

export const Ghost = Template.bind({});
Ghost.args = {
  variant: 'ghost'
};

