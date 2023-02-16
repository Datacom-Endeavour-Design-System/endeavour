import React from 'react';
import { ComponentStoryFn } from '@storybook/react';
import { DatacomBreadcrumb } from '@datacom/endeavour-react';

export default {
  title: 'Breadcrumb',
  component: DatacomBreadcrumb,

  argTypes: {
    text: {
      name: 'Text',
      defaultValue: 'Breadcrumb',
      description: 'Breadcrumb Text ',
      type: { name: 'string', required: true },
    },
    url: {
      name: 'URL',
      defaultValue: 'https://datacom.com/',
      type: { text: 'string' },
      options: [' ', 'https://datacom.com/'],
    },
  },
};

const Template: ComponentStoryFn<typeof DatacomBreadcrumb> = (args) => {
  const { text, url } = args;
  return <DatacomBreadcrumb url={url}>{text}</DatacomBreadcrumb>;
};
export const Breadcrumb = Template.bind({});

export const BreadcrumbGrouped = () => {
  return (
    <div style={{ display: 'inline-block' }}>
      <DatacomBreadcrumb url="https://datacom.com">Home</DatacomBreadcrumb>
      <DatacomBreadcrumb url="/nz/co">Breadcrumb 1</DatacomBreadcrumb>
      <DatacomBreadcrumb url="/nz/co">Breadcrumb 2</DatacomBreadcrumb>
      <DatacomBreadcrumb url="/nz/co">Breadcrumb 3</DatacomBreadcrumb>
    </div>
  );
};
