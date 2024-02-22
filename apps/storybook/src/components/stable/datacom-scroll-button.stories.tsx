import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { DatacomScrollButton } from '@datacom/endeavour-react';

import styled from '@emotion/styled';

const meta: Meta<typeof DatacomScrollButton> = {
  title: 'Scroll Button',
  component: DatacomScrollButton,
  argTypes: {
    anchorId: {
      name: 'Anchor-Id',
      description:
        'The ID of the element that the scroll button will adjust the page scroll position to upon clicking.',
      type: { name: 'string' },
    },
    btnTitle: {
      name: 'Tooltip label',
      type: { name: 'string' },
    },
  },
  args: {
    anchorId: '#',
    btnTitle: 'Scroll down',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ScrollButton: Story = {};
export const ScrollButtonWithExample = () => {
  const Panel = styled.div`
    font-family: Montserrat;
    width: 842px;
    height: 320px;
    display: flex;
    flex-direction: column;
    background-color: #f0f0f0;
    align-items: center;
    margin: 2rem;
    justify-content: center;
    scroll-margin-top: 30px;
    datacom-scroll-button {
      margin-top: 24px;
      margin-bottom: 24px;
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
          color: 'var(--dc-primary-text-color)',
        }}>
        The top
      </h1>
      <Panel>
        <span style={{ marginTop: '200px' }}>
          Click the scroll button to scroll to the anchor point
        </span>
        <DatacomScrollButton
          anchorId="anchor"
          btnTitle="Scroll down"></DatacomScrollButton>
      </Panel>
      <Panel />
      <Panel id="anchor" style={{ borderTop: '4px solid #0A1839' }}>
        <span style={{ marginTop: '24px', marginBottom: '272px' }}>
          Anchor point
        </span>
      </Panel>
      <Panel />
      <Panel />
    </>
  );
};
