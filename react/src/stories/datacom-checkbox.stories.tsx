import React, {useState} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DatacomCheckbox } from '../components';
import {useEventRef} from '../hooks/use-event-hook';

export default {
  title: 'Checkbox',
  component: DatacomCheckbox
} as ComponentMeta<typeof DatacomCheckbox>;

const Template: ComponentStory<typeof DatacomCheckbox> = (args) => <DatacomCheckbox {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Tick Me!'
};

const CheckboxWrapperToggle: React.FC = () => {
  const [toggled, setToggled] = useState(false);

  const ref = useEventRef<HTMLDatacomCheckboxElement>('toggle', () => setToggled(!toggled))

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