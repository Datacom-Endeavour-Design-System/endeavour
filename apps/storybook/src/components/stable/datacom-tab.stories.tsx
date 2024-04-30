import React from 'react';
import { StoryObj } from '@storybook/react';
import { DatacomTabgroup, DatacomTab } from '@datacom/endeavour-react';
import styled from '@emotion/styled';

type TabGroupProps = React.ComponentProps<typeof DatacomTabgroup>;
type Tab = {
  name: string;
  description: string;
  type: { name: string };
  if?: { arg: string; truthy?: boolean };
};
type TabArgType = {
  [key: string]: Tab;
};
type TabArg = {
  [key: string]: string | boolean;
};

export default {
  title: 'Tabs',
  component: DatacomTabgroup,
};

export const Default: StoryObj<
  TabGroupProps & { label: string; disabled: boolean }
> = {
  argTypes: {
    label: {
      name: 'Label',
      description: 'Tab label',
      type: { name: 'string' },
    },
    disabled: {
      name: 'Disabled',
      description: 'Disable tab',
      type: { name: 'boolean' },
    },
  },
  args: {
    label: 'Tab label',
    disabled: false,
  },
  render: (props) => {
    return (
      <DatacomTabgroup>
        <DatacomTab label={props.label} disabled={props.disabled} />
      </DatacomTabgroup>
    );
  },
};

const tabs = ['Overview', 'Solutions', 'Industries', 'Discover'];

const tabsArgTypes: TabArgType = {};
const tabsArgs: TabArg = {};

tabs.forEach((tab, i) => {
  const tabNumber = i + 1;
  tabsArgTypes[`Tab${tabNumber}Label`] = {
    name: `Tab${tabNumber} label`,
    description: `Tab${tabNumber} label`,
    type: { name: 'string' },
  };
  tabsArgTypes[`Tab${tabNumber}Disabled`] = {
    name: `Tab${tabNumber} disabled`,
    description: `Disable tab${tabNumber}`,
    type: { name: 'boolean' },
  };
  tabsArgs[`Tab${tabNumber}Label`] = tab;
  tabsArgs[`Tab${tabNumber}Disabled`] = tabNumber === 3;
});

export const TabsGrouping: StoryObj<typeof DatacomTabgroup> = {
  argTypes: tabsArgTypes,
  args: tabsArgs,
  render: (props) => {
    const newProps = { ...props } as TabArg;
    return (
      <DatacomTabgroup>
        {tabs.map((_tab, i) => {
          const tabNumber = i + 1;
          const label = newProps[`Tab${tabNumber}Label`] as string;
          const disabled = newProps[`Tab${tabNumber}Disabled`] as boolean;
          return <DatacomTab label={label} disabled={disabled} />;
        })}
      </DatacomTabgroup>
    );
  },
};

const tabsWithContent: {
  heading: string;
  description: string;
  image: string;
}[] = [
  {
    heading: 'Overview',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image:
      'https://images.pexels.com/photos/15638791/pexels-photo-15638791.jpeg',
  },
  {
    heading: 'Solutions',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fringilla orci eget turpis scelerisque facilisis. Nullam feugiat non ex eu egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum sit amet sapien elit. Vivamus dictum, mi quis malesuada consequat, diam lorem ullamcorper massa, a aliquam lacus est a eros. Phasellus varius nisi in felis viverra sollicitudin. In hac habitasse platea dictumst.',
    image: '',
  },
  {
    heading: 'Industries',
    description: '',
    image: '',
  },
  {
    heading: 'Discover',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at pharetra nisi, at laoreet nisi. Pellentesque porta rutrum dolor, vel iaculis erat pretium nec. Vestibulum mattis magna sagittis tellus commodo, et finibus ligula cursus. Nunc lectus purus, efficitur nec tellus sed, gravida gravida lectus. Vivamus congue, diam non elementum feugiat, erat lectus auctor ex, non pharetra ipsum massa in lectus. Vestibulum id eros neque. Etiam volutpat suscipit nunc, nec pharetra nibh tristique ac. Vestibulum dapibus leo non faucibus eleifend. Sed tincidunt porttitor elit nec ultrices. In suscipit lorem purus, non mollis lacus tincidunt vel. Mauris nec condimentum nisl.',
    image: '',
  },
];

const tabsWithContentArgTypes: TabArgType = {};
const tabsWithContentArgs: TabArg = {};

tabsWithContent.forEach((tab, i) => {
  const tabNumber = i + 1;
  tabsWithContentArgTypes[`Tab${tabNumber}Label`] = {
    name: `Tab${tabNumber} label`,
    description: `Tab${tabNumber} label`,
    type: { name: 'string' },
  };
  tabsWithContentArgTypes[`Tab${tabNumber}Disabled`] = {
    name: `Tab${tabNumber} disabled`,
    description: `Disable tab${tabNumber}`,
    type: { name: 'boolean' },
  };
  tabsWithContentArgTypes[`Tab${tabNumber}Heading`] = {
    name: `Tab${tabNumber} heading`,
    description: `Tab${tabNumber} content heading`,
    type: { name: 'string' },
    if: { arg: `Tab${tabNumber}Disabled`, truthy: false },
  };
  tabsWithContentArgTypes[`Tab${tabNumber}Description`] = {
    name: `Tab${tabNumber} description`,
    description: `Tab${tabNumber} content description`,
    type: { name: 'string' },
    if: { arg: `Tab${tabNumber}Disabled`, truthy: false },
  };
  tabsWithContentArgTypes[`Tab${tabNumber}Image`] = {
    name: `Tab${tabNumber} image`,
    description: `Tab${tabNumber} content image flag`,
    type: { name: 'boolean' },
    if: { arg: `Tab${tabNumber}Disabled`, truthy: false },
  };
  tabsWithContentArgTypes[`Tab${tabNumber}ImageURL`] = {
    name: `Tab${tabNumber} image URL`,
    description: `Tab${tabNumber} content image URL`,
    type: { name: 'string' },
    if: { arg: `Tab${tabNumber}Disabled`, truthy: false },
  };
  tabsWithContentArgs[`Tab${tabNumber}Label`] = tab.heading;
  tabsWithContentArgs[`Tab${tabNumber}Disabled`] = tabNumber === 3;
  tabsWithContentArgs[`Tab${tabNumber}Heading`] = tab.heading;
  tabsWithContentArgs[`Tab${tabNumber}Description`] = tab.description;
  tabsWithContentArgs[`Tab${tabNumber}Image`] = !!tab.image;
  tabsWithContentArgs[`Tab${tabNumber}ImageURL`] = tab.image;
});

const H2 = styled.h2`
  font-size: 48px;
  font-weight: 300;
  line-height: 64px;
`;

const P = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`;

const IMG = styled.img`
  margin-top: 20px;
  max-width: 100%;
`;

export const TabsWithContent: StoryObj<typeof DatacomTabgroup> = {
  argTypes: tabsWithContentArgTypes,
  args: tabsWithContentArgs,
  render: (props) => {
    const newProps = { ...props } as TabArg;
    return (
      <DatacomTabgroup>
        {tabs.map((_tab, i) => {
          const tabNumber = i + 1;
          const label = newProps[`Tab${tabNumber}Label`] as string;
          const disabled = newProps[`Tab${tabNumber}Disabled`] as boolean;
          const heading = newProps[`Tab${tabNumber}Heading`] as string;
          const description = newProps[`Tab${tabNumber}Description`] as string;
          const imageFlag = newProps[`Tab${tabNumber}Image`] as boolean;
          const imageURL = newProps[`Tab${tabNumber}ImageURL`] as string;
          return (
            <DatacomTab label={label} disabled={disabled}>
              <H2>{heading}</H2>
              <P>{description}</P>
              {imageFlag && <IMG src={imageURL} />}
            </DatacomTab>
          );
        })}
      </DatacomTabgroup>
    );
  },
};
