import React from 'react';
import { StoryObj } from '@storybook/react';
import { DatacomTabgroup, DatacomTab } from '@datacom/endeavour-react';
import styled from '@emotion/styled';

type TabGroupProps = React.ComponentProps<typeof DatacomTabgroup>;

export default {
  title: 'Tabs',
  component: DatacomTabgroup,
};

export const SingleTab: StoryObj<
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

type TabsArgType = {
  [key: string]: {
    name: string;
    description: string;
    type: { name: string };
  };
};

type TabsArg = {
  [key: string]: string | boolean;
};

const tabs = ['Overview', 'Solutions', 'Industries', 'Discover'];

const tabsArgTypes: TabsArgType = {};
const tabsArgs: TabsArg = {};

tabs.forEach((tab, i) => {
  const tabNumber = i + 1;
  tabsArgTypes[`Tab${tabNumber}Label`] = {
    name: `Tab${tabNumber} label`,
    description: `Tab${tabNumber} label`,
    type: { name: 'string' },
  };
  tabsArgTypes[`Tab${tabNumber}Disabled`] = {
    name: `Tab${tabNumber} disabled`,
    description: `Disable tab${i + 1}`,
    type: { name: 'boolean' },
  };
  tabsArgs[`Tab${tabNumber}Label`] = tab;
  tabsArgs[`Tab${tabNumber}Disabled`] = tabNumber === 3;
});

export const Tabs: StoryObj<typeof DatacomTabgroup> = {
  argTypes: tabsArgTypes,
  args: tabsArgs,
  render: (props) => {
    const test = { ...props } as TabsArg;
    return (
      <DatacomTabgroup>
        {tabs.map((_tab, i) => {
          const tabNumber = i + 1;
          const label = test[`Tab${tabNumber}Label`] as string;
          const disabled = test[`Tab${tabNumber}Disabled`] as boolean;
          return <DatacomTab label={label} disabled={disabled} />;
        })}
      </DatacomTabgroup>
    );
  },
};

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

export const TabsWithContent = () => {
  return (
    <>
      <DatacomTabgroup>
        <DatacomTab label="Overview">
          <H2>Overview</H2>
          <P>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </P>
        </DatacomTab>

        <DatacomTab label="Solutions">
          <H2>Solutions</H2>
          <P>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            fringilla orci eget turpis scelerisque facilisis. Nullam feugiat non
            ex eu egestas. Pellentesque habitant morbi tristique senectus et
            netus et malesuada fames ac turpis egestas. Vestibulum sit amet
            sapien elit. Vivamus dictum, mi quis malesuada consequat, diam lorem
            ullamcorper massa, a aliquam lacus est a eros. Phasellus varius nisi
            in felis viverra sollicitudin. In hac habitasse platea dictumst.
          </P>

          <P>
            Nullam placerat id diam sed ultrices. Integer blandit velit in
            vehicula posuere. Ut eleifend pulvinar tortor. Suspendisse congue
            eleifend dolor, et tempus nisl sagittis eu. Vestibulum ante ipsum
            primis in faucibus orci luctus et ultrices posuere cubilia curae;
            Cras egestas sagittis odio, vel accumsan dui varius id. Aliquam
            tempus sit amet risus eget pharetra. Mauris in ex finibus, iaculis
            eros et, pharetra urna.
          </P>
        </DatacomTab>

        <DatacomTab label="Industries" disabled={true}>
          <H2>Industries</H2>
        </DatacomTab>

        <DatacomTab label="Discover">
          <H2>Discover</H2>
          <P>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at
            pharetra nisi, at laoreet nisi. Pellentesque porta rutrum dolor, vel
            iaculis erat pretium nec. Vestibulum mattis magna sagittis tellus
            commodo, et finibus ligula cursus. Nunc lectus purus, efficitur nec
            tellus sed, gravida gravida lectus. Vivamus congue, diam non
            elementum feugiat, erat lectus auctor ex, non pharetra ipsum massa
            in lectus. Vestibulum id eros neque. Etiam volutpat suscipit nunc,
            nec pharetra nibh tristique ac. Vestibulum dapibus leo non faucibus
            eleifend. Sed tincidunt porttitor elit nec ultrices. In suscipit
            lorem purus, non mollis lacus tincidunt vel. Mauris nec condimentum
            nisl.
          </P>
        </DatacomTab>
      </DatacomTabgroup>
    </>
  );
};
