import React from 'react';
import { ComponentStoryFn } from '@storybook/react';
import { DatacomButton } from '@datacom/endeavour-react';

export default {
  title: 'Button',
  component: DatacomButton
};

const Template: ComponentStoryFn<typeof DatacomButton> = (args) => <DatacomButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  text: 'Click Me!'
};

export const Disabled = Template.bind({});
Disabled.args = {
  text: 'Disabled',
  disabled: true
};
