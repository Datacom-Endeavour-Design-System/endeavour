import { composeStories } from '@storybook/testing-react';
import { testStories } from '../utils/test-utils';
import * as stories from './datacom-button.stories';

testStories(composeStories(stories));
