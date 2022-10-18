import React, {useState} from 'react';
import { ComponentStoryFn } from '@storybook/react';
import { DatacomCheckbox } from '@datacom/endeavour-react';
import {useEventRef} from '@datacom/endeavour-react';

export default {
  title: 'Checkbox',
  component: DatacomCheckbox
};

const Template: ComponentStoryFn<typeof DatacomCheckbox> = (args) => <DatacomCheckbox {...args} />;



const CheckboxWrapperToggle: React.FC = () => {
  const [toggled, setToggled] = useState(false);

  const ref = useEventRef<HTMLDatacomCheckboxElement>(
    "toggle",
    (e: CustomEvent<boolean>) => {
      setToggled(e.detail);
    }
  );

  return (
    <div>
      <DatacomCheckbox id="check-5" label="With toggle" ref={ref} />
      {toggled && <p>You clicked the checkbox!</p>}
    </div>
  );
};
//  const NestedCheckboxes : React.FC = ()=>{



//   const checkData = [{label:"checkbox1", id: "parent-1"}, {label:"checkbox2", id:"parent-2"}];
//   const SelectedId = checkData.findIndex
//   const[checkboxdata, setCheckData] =useState([]);
//   const[checked , setChecked] =useState(false);
//   useEffect(() => {
//     setCheckData(checkData);
//   }, []);
  
//   const handleChange =(e:any)=>{
//     e.target.value;
    
// setChecked(checked);

//     // if( =id ){}
//     // let newItemList  = checkboxdata.map( item => item.id === child-id ? {...SelectedId, isChecked:checked}: items);
//     // setCheckData(newItemList);

   
//     {

//     }
//   }

//   return(
//     <div>
      
//       <ul>
//      <DatacomCheckbox  id ="parent-0" label ="select all" ></DatacomCheckbox>
//      </ul>
//    {checkboxdata.map((items) => ( items =
//       <div>
//         <DatacomCheckbox key ={items.id}  label={items.label} child-id={items.id} 
// checked ={items?.isChecked || false}
//         ></DatacomCheckbox >
//       </div>
//     ))}
        

//      </div>
//   );


  
//   };
export const Required = Template.bind({});
Required.args = {
  label: "Checkbox Item",
  small: "Error message",
  required: true,
};

export const standard = Template.bind({});
standard.args = {
  label: "Checkbox Item",
  size: "Standard",
};
export const Disabled = Template.bind({});
Disabled.args = {
  label: "Checkbox Item unselected",
  disabled: true,
};
export const DisabledSelected = Template.bind({});
DisabledSelected.args = {
  label: "Checkbox Item unselected",
  disabled: true,
  checked: true,
};
export const small = Template.bind({});
small.args = {
  label: "Checkbox Item",
};
// export const CheckedInput = () => {
//   const [isChecked, setChecked] = useState(true);
//   return(
//       <DatacomCheckbox
//       id="check-2"
//       label="Checked Input"
//       onChange={() => setChecked(!isChecked)}
//       checked={isChecked}
//       />
//   )
// ;
// }
export const VerticalGrouping = () => {
  return (
    <div >
      <div >
        <DatacomCheckbox id="check-1" />
      </div>
      <div style={{ gap: "24px" }}>
        <DatacomCheckbox id="check-2" />
      </div>
      <div>
        <DatacomCheckbox id="check-3" style={{ gap: "12px " }} />
      </div>
    </div>
  );
};
// export const  Nested = () =><NestedCheckboxes/>
export const Toggle = () => <CheckboxWrapperToggle />;
