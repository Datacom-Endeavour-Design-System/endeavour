import React from 'react';
import { StoryObj } from '@storybook/react';
import { DatacomBreadcrumb } from '@datacom-digital/endeavour-react';

export default {
  title: 'Breadcrumb',
  component: DatacomBreadcrumb,
  argTypes: {
    url: {
      name: 'URL',
      description: 'Specify the URL for the breadcrumb',
      type: { text: 'string' },
      options: [' ', 'https://datacom.com/'],
    },
  },
  args: {
    url: 'https://datacom.com/',
  },
};

export const Default: StoryObj<typeof DatacomBreadcrumb> = {
  render: (props) => {
    return (
      <DatacomBreadcrumb {...props} separator>
        Breadcrumb
      </DatacomBreadcrumb>
    );
  },
};

export const BreadcrumbGrouping = () => {
  return (
    <div style={{ display: 'inline-block' }}>
      <DatacomBreadcrumb url="https://datacom.com" separator>
        Home
      </DatacomBreadcrumb>
      <DatacomBreadcrumb url="/nz/co" separator>
        Breadcrumb 1
      </DatacomBreadcrumb>
      <DatacomBreadcrumb url="/nz/co" separator>
        Breadcrumb 2
      </DatacomBreadcrumb>
      <DatacomBreadcrumb url="/nz/co">Breadcrumb 3</DatacomBreadcrumb>
    </div>
  );
};
