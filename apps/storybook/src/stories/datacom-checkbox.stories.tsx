import React, {useState} from 'react';
import { ComponentStoryFn } from '@storybook/react';
import { DatacomCheckbox } from '@datacom/endeavour-react';
import {useEventRef} from '@datacom/endeavour-react';

export default {
  title: 'Checkbox',
  component: DatacomCheckbox
};

const Template: ComponentStoryFn<typeof DatacomCheckbox> = (args) => <DatacomCheckbox {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Tick Me!'
};

const CheckboxWrapperToggle: React.FC = () => {
  const [toggled, setToggled] = useState(false);

  const ref = useEventRef<HTMLDatacomCheckboxElement>('toggle', (e: CustomEvent<boolean>) => {
    setToggled(e.detail);
  });
  
  return (
      <div>
        <DatacomCheckbox label="With toggle" ref={ref} />
        {
        toggled && <p>You clicked the checkbox!</p>
        }
      </div>
  );
};

export const Toggle = () => <CheckboxWrapperToggle/>;