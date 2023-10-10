import { composeStories } from '@storybook/react';
import { mount } from 'cypress/react';
import * as stories from './datacom-button.stories';

// compile the "Primary" story with the library
const { Primary } = composeStories(stories);

it('Mounts', () => {
  // and mount the story using @cypress/react library
  //mount(<DatacomButton />);
  mount(<Primary />);
});
