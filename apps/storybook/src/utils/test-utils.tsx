import React from 'react';
import { mount } from 'cypress/react';
import { StoryFn } from '@storybook/react';

export function testStories(stories: { [key: string]: StoryFn<any> }) {
  Object.entries(stories).map(([key, value]) =>
    it(`Mounts ${key}`, () => {
      const Comp = value;

      mount(<Comp />);
    })
  );
}
