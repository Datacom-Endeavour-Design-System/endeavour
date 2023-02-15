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
    link: {
      name: 'URL',
      defaultValue: 'https://datacom.com/',
      type: { text: 'string' },
      options: [' ', 'https://datacom.com/'],
    },
  },
};

const Template: ComponentStoryFn<typeof DatacomBreadcrumb> = (args) => {
  const { text, link } = args;
  return <DatacomBreadcrumb link={link}>{text}</DatacomBreadcrumb>;
};
export const Breadcrumb = Template.bind({});

export const BreadcrumbGrouped = () => {
  return (
    <div style={{ display: 'inline-block' }}>
      <DatacomBreadcrumb link="/nz/co">Home</DatacomBreadcrumb>
      <DatacomBreadcrumb link="/nz/co">Breadcrumb1</DatacomBreadcrumb>
      <DatacomBreadcrumb link="/nz/co">Breadcrumb2</DatacomBreadcrumb>
      <DatacomBreadcrumb>Breadcrumb3</DatacomBreadcrumb>
    </div>
  );
};
