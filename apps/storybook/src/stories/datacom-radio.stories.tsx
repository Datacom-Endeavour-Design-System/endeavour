import React from 'react';
import { ComponentStoryFn} from '@storybook/react';
import { DatacomRadio } from '@datacom/endeavour-react';
export default {
    title: 'radio',
    component: DatacomRadio,
    argTypes: {
      label: {
        name: "Label",
        defaultValue:"Label",
        description: "Radio label",
        type: { label: "string", required: true },
      },
      variant: { 
        name: 'Variant',
        description: 'Radio is main Variant',
        control: 'select', 
        defaultValue: 'radioGroup',
        options: ['radio','button' ], 
        type: {name: 'string', required: true} 
      },
      size: {
        name: "Size",
        description:
          "Radio size within variant. Defaults to standard if not set",
        control: "select",
        defaultValue: "standard",
        options: ["standard", "small"],
        type: { label: "string", required: true },
      },
      checked:{
        name:"Selected",
        description:'Checked Radio',
        type:{name:'boolean'}
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
     
    },
    arg: {
      label:"Label",
      Variant:'radio',
      size: "standard",
      type: DatacomRadio,
      required: false,
      disabled: false,
      checked: false,
      
    
    },
  };
  
  const Template: ComponentStoryFn<typeof DatacomRadio> = (args) => <DatacomRadio {...args} />;

  export const RadioGroup = Template.bind({});
  RadioGroup.args = {
    label: ' Radio button Item',
    size:"standard",
    disabled:false

  };
  export const buttonGroup = Template.bind({});
  RadioGroup.args = {
    label: ' label',
    size:"standard",
    disabled:false,
    checked:false,

  };