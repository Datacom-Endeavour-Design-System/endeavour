import React, { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { DatacomCheckbox, useEventRef } from '@datacom/endeavour-react';

export default false
  ? ({
      title: 'Checkbox',
      component: DatacomCheckbox,
    } as Meta<typeof DatacomCheckbox>)
  : {};

const Template: StoryFn<typeof DatacomCheckbox> = (args) => (
  <DatacomCheckbox {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  label: 'Tick Me!',
};

const CheckboxWrapperToggle: React.FC = () => {
  const [toggled, setToggled] = useState(false);

  const ref = useEventRef<HTMLDatacomCheckboxElement>('toggle', (e: Event) => {
    setToggled((e as CustomEvent<boolean>).detail);
  });

  return (
    <div>
      <DatacomCheckbox label="With toggle" ref={ref} />
      {toggled && <p>You clicked the checkbox!</p>}
    </div>
  );
};

export const Toggle = () => <CheckboxWrapperToggle />;
