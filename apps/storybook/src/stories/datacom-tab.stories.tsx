import React from 'react';
import { DatacomTabgroup, DatacomTab } from '@datacom/endeavour-react';

export default false
  ? {
      title: 'Tabs',
      component: DatacomTabgroup,
    }
  : {};

export const Tabs = () => {
  return (
    <DatacomTabgroup style={{ height: '30vh' }}>
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
      </DatacomTab>

      <DatacomTab label="Industries" disabled={true}>
        <h1>Industries</h1>
      </DatacomTab>

      <DatacomTab label="Discover">
        <h1>Discover</h1>
      </DatacomTab>
    </DatacomTabgroup>
  );
};
