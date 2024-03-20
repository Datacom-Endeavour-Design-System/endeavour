import React from 'react';
import { ComponentStoryFn } from '@storybook/react';
import {
  DatacomAccordionGroup,
  DatacomAccordion,
} from '@datacom/endeavour-react';

export default {
  title: 'Accordion',
  component: DatacomAccordion,
  argTypes: {
    disabled: {
      name: 'Disabled',
      description: 'If true, disables the section(s) within the accordion.',
      type: { name: 'boolean' },
    },
    expanded: {
      name: 'Expanded',
      description:
        'If true, accordion section will be exapnded on initial load.',
      type: { name: 'boolean' },
    },
    label: {
      name: 'Label',
      defaultValue: 'Section Label',
      description: 'Label for accordion section.',
      type: { label: 'string' },
    },
  },
};

const SingleSectionTemplate: ComponentStoryFn<typeof DatacomAccordion> = (
  args,
) => {
  const { disabled, expanded, label } = args;

  return (
    <DatacomAccordionGroup>
      <DatacomAccordion label={label} disabled={disabled} expanded={expanded}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </DatacomAccordion>
    </DatacomAccordionGroup>
  );
};

export const Default = SingleSectionTemplate.bind({});
Default.args = {
  disabled: false,
  expanded: true,
  label: 'Section Label',
};
