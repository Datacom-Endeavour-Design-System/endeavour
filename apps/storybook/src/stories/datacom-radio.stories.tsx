import React from 'react';
import { ComponentStoryFn} from '@storybook/react';
import { DatacomRadio } from '@datacom/endeavour-react';



export default {
    title: 'Checkbox',
    component: DatacomRadio
  };
  const Template: ComponentStoryFn<typeof DatacomRadio> = (args) => <DatacomRadio {...args} />;

  export const RadioGroup = Template.bind({});
  RadioGroup.args = {
    label: ' Radio button Item'

  };