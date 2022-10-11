import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DatacomButton } from '../components';

export default {
  title: 'Button',
  component: DatacomButton
} as ComponentMeta<typeof DatacomButton>;

const Template: ComponentStory<typeof DatacomButton> = (args) => <DatacomButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  text: 'Click Me!'
};

export const Disabled = Template.bind({});
Disabled.args = {
  text: 'Disabled',
  disabled: true
};
