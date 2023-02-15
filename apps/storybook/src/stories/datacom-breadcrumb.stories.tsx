import React from 'react';
import { ComponentStoryFn } from '@storybook/react';
import {
  DatacomBreadcrumbGroup,
  DatacomBreadcrumb,
} from '@datacom/endeavour-react';

export default {
  title: 'Breadcrumb',
  component: DatacomBreadcrumb,

  argTypes: {
    selected: {
      name: 'Selected',
      description: 'boolean',
      type: { name: 'boolean' },
    },
    text: {
      name: 'Text',
      defaultValue: 'Breadcrumb',
      description: '-',
      type: { text: 'string' },
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
    <div>
      <DatacomBreadcrumbGroup>
        <DatacomBreadcrumb link="/nz/co">Home</DatacomBreadcrumb>
        <DatacomBreadcrumb link="/nz/co">Breadcrumb1</DatacomBreadcrumb>
        <DatacomBreadcrumb link="/nz/co">Breadcrumb2</DatacomBreadcrumb>
        <DatacomBreadcrumb>Breadcrumb3</DatacomBreadcrumb>
      </DatacomBreadcrumbGroup>
    </div>
  );
};
