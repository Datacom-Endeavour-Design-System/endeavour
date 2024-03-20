import React from 'react';
import { StoryFn } from '@storybook/react';
import {
  DatacomAccordionGroup,
  DatacomAccordion,
} from '@datacom/endeavour-react';

export default {
  title: 'Accordion',
  component: DatacomAccordionGroup,
  argTypes: {
    allowMultiExpand: {
      name: 'Allow multi expand',
      description:
        'If true, allows multiple sections to be open simultaneously.',
      type: { name: 'boolean' },
    },
  },
};

const MultipleSectionsTemplate: StoryFn<typeof DatacomAccordionGroup> = (
  args,
) => (
  <DatacomAccordionGroup allow-multi-expand={args.allowMultiExpand}>
    <DatacomAccordion label="Section 1" expanded>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </DatacomAccordion>
    <DatacomAccordion label="Section 2">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </DatacomAccordion>
    <DatacomAccordion label="Section 3">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </DatacomAccordion>
  </DatacomAccordionGroup>
);

export const MultipleSections = MultipleSectionsTemplate.bind({});
MultipleSections.args = {
  allowMultiExpand: false,
};
