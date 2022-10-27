import React from 'react';
import { composeStories } from "@storybook/testing-react";
import { mount } from "cypress/react";
import * as stories from "./datacom-checkbox.stories";

// compile the "Primary" story with the library
const { Primary } = composeStories(stories);

it("Mounts", () => {
  // and mount the story using @cypress/react library
  //mount(<DatacomButton />);
  mount(<Primary />);
});
