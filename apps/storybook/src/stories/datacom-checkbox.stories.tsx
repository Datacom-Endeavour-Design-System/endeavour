import React, { useState } from "react";
import { ComponentStoryFn } from "@storybook/react";
import { DatacomCheckbox } from "@datacom/endeavour-react";
import { useEventRef } from "@datacom/endeavour-react";

export default {
  title: "Checkbox",
  component: DatacomCheckbox,
  argTypes: {
    label: {
      name: "Label",
      defaultValue:"Checkbox Item",
      description: "checkbox label",
      type: { label: "string", required: true },
    },
    size: {
      name: "Size",
      description:
        "checkbox size within variant. Defaults to standard if not set",
      control: "select",
      defaultValue: "standard",
      options: ["standard", "small"],
      type: { label: "string", required: true },
    },
   
  },
  arg: {
    label:"Checkbox",
    Checkboxtype: "checkbox",
    size: "standard",
    type: DatacomCheckbox,
    required: false,
    disabled: false,
    checked: false,
   
  
  },
};

const Template: ComponentStoryFn<typeof DatacomCheckbox> = (args) => (
  <DatacomCheckbox {...args} />
);

// const CheckboxWrapperToggle: React.FC = () => {
//   const [toggled, setToggled] = useState(false);

//   const ref = useEventRef<HTMLDatacomCheckboxElement>(
//     "toggle",
//     (e: CustomEvent<boolean>) => {
//       setToggled(e.detail);
//     }
//   );

//   return (
//     <div>
//       <DatacomCheckbox id="check-5" label="With toggle" ref={ref} />
//       {toggled && <p>You clicked the checkbox!</p>}
//     </div>
//   );
// };

export const standard = Template.bind({});
standard.args = {
  label: "Checkbox Item",
  size: "standard",
  disabled: false,
  checked: false,
  required:false
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Checkbox Item unselected",
  checked: false,
  disabled: true,
};
export const DisabledSelected = Template.bind({});
DisabledSelected.args = {
  label: "Checkbox Item selected",
  disabled: true,
  checked: true,
};
// export const Required = Template.bind({});
// Required.args = {
//   label: "Checkbox Item",
//   disabled: false,
//   checked: false,
//   small: "Error message",
//   required: true,
// };
export const small = Template.bind({});
small.args = {
  label: "Checkbox Item",
  size: "small",
  Cheked: true,
  Disabled:false,
  
};

export const VerticalGrouping = (args:any) => {
  return (
    <div>
      <div>
        <DatacomCheckbox id="check-1" label="CheckboxItem" {...args} />
      </div>
      <div style={{ gap: "24px" }}>
        <DatacomCheckbox id="check-2" label="CheckboxItem" {...args}/>
      </div>
      <div>
        <DatacomCheckbox
          id="check-3"
          style={{ gap: "12px " }}
          label="checkboxItem"
          {...args}/>
      </div>
    </div>
  );
};
export const Error = (args:any) => {
  return(
  <div>
    <DatacomCheckbox {...args} required = "true" disabled="false">
    </DatacomCheckbox>
    <small style = {{color:"#cf364e", font:"12px" }}>Error message</small>
  </div>);
}
// export const  Nested = () =><NestedCheckboxes/>
// export const Toggle = () => <CheckboxWrapperToggle />;
