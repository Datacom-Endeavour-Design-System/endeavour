import React from 'react';
import { ComponentStoryFn } from '@storybook/react';
import { DatacomScrollButton } from '@datacom/endeavour-react';
import styled from '@emotion/styled';

export default {
  title: 'Scroll Button',
  component: DatacomScrollButton,
  argTypes: {
    anchorId: {
      name: 'Anchor-Id',
      defaultValue: '#',
      description:
        'The id of elements that should be scrolled down within the page.',
      type: { name: 'string' },
    },
    btnTitle: {
      name: 'Tooltip label',
      defaultValue: 'Scroll down',
      type: { name: 'string' },
    },
  },
};

const Template: ComponentStoryFn<typeof DatacomScrollButton> = (args) => (
  <DatacomScrollButton {...args} />
);

export const ScrollButton = Template.bind({});

export const ScrollButtonWithExample = () => {
  const Panel = styled.div`
    font-family: Montserrat;
    width: 842px;
    height: 320px;
    display: flex;
    background-color: #f0f0f0;
    align-items: center;
    margin: 2rem;
    justify-content: center;
    text-align: center;
    scroll-margin-top: 30px;
    datacom-scroll-button {
      text-align: center;
      justify-content: center;
    }
  `;
  return (
    <>
      <h1
        style={{
          fontFamily: 'Montserrat',
          fontSize: '48px',
          lineHeight: '59px',
          textAlign: 'left',
          marginLeft: '30px',
        }}>
        The top
      </h1>
      <Panel>
        ffffffffffffffffffffffffffffffff
        <DatacomScrollButton
          anchorId="anchor"
          btnTitle="Scroll down"></DatacomScrollButton>
      </Panel>
      <Panel />
      <Panel id="anchor" style={{ borderTop: '4px solid #0A1839' }}>
        Anchor point
      </Panel>
      <Panel />
      <Panel />
    </>
  );
};
