import React from 'react';
import { DatacomTabgroup, DatacomTab } from '@datacom/endeavour-react';

export default {
  title: 'Tabs',
  component: DatacomTabgroup,
};

export const Tabs = () => {
  return (
    <DatacomTabgroup>
      <DatacomTab label="Overview">
        <h1>Overview</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </DatacomTab>

      <DatacomTab label="Solutions">
        <h1>Solutions</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          fringilla orci eget turpis scelerisque facilisis. Nullam feugiat non
          ex eu egestas. Pellentesque habitant morbi tristique senectus et netus
          et malesuada fames ac turpis egestas. Vestibulum sit amet sapien elit.
          Vivamus dictum, mi quis malesuada consequat, diam lorem ullamcorper
          massa, a aliquam lacus est a eros. Phasellus varius nisi in felis
          viverra sollicitudin. In hac habitasse platea dictumst.
        </p>

        <p>
          Nullam placerat id diam sed ultrices. Integer blandit velit in
          vehicula posuere. Ut eleifend pulvinar tortor. Suspendisse congue
          eleifend dolor, et tempus nisl sagittis eu. Vestibulum ante ipsum
          primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras
          egestas sagittis odio, vel accumsan dui varius id. Aliquam tempus sit
          amet risus eget pharetra. Mauris in ex finibus, iaculis eros et,
          pharetra urna.
        </p>
      </DatacomTab>

      <DatacomTab label="Industries" disabled={true}>
        <h1>Industries</h1>
      </DatacomTab>

      <DatacomTab label="Discover">
        <h1>Discover</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at
          pharetra nisi, at laoreet nisi. Pellentesque porta rutrum dolor, vel
          iaculis erat pretium nec. Vestibulum mattis magna sagittis tellus
          commodo, et finibus ligula cursus. Nunc lectus purus, efficitur nec
          tellus sed, gravida gravida lectus. Vivamus congue, diam non elementum
          feugiat, erat lectus auctor ex, non pharetra ipsum massa in lectus.
          Vestibulum id eros neque. Etiam volutpat suscipit nunc, nec pharetra
          nibh tristique ac. Vestibulum dapibus leo non faucibus eleifend. Sed
          tincidunt porttitor elit nec ultrices. In suscipit lorem purus, non
          mollis lacus tincidunt vel. Mauris nec condimentum nisl.
        </p>
      </DatacomTab>
    </DatacomTabgroup>
  );
};
