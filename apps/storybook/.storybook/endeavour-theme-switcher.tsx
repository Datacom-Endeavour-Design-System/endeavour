import React, { useCallback, useEffect, useState } from 'react';
import { light, dark } from './theme';

import { Icons, IconButton, WithTooltip, Button } from '@storybook/components';
import { styled } from '@storybook/theming';

import { addons, useGlobals } from '@storybook/manager-api';

const Label = styled.label(({ theme }) => ({
  lineHeight: '18px',
  alignItems: 'center',
  display: 'inline-block',
  position: 'relative',
  whiteSpace: 'nowrap',
  background: theme.boolean.background,
  borderRadius: '3em',

  input: {
    appearance: 'none',
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    margin: 0,
    padding: 0,
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    borderRadius: '3em',

    '&:focus': {
      outline: 'none',
      boxShadow: `${theme.color.secondary} 0 0 0 1px inset !important`,
    },
  },

  span: {
    textAlign: 'center',
    fontSize: theme.typography.size.s1,
    fontWeight: theme.typography.weight.bold,
    lineHeight: '1',
    cursor: 'pointer',
    display: 'inline-block',
    padding: '7px 15px',
    transition: 'all 100ms ease-out',
    userSelect: 'none',
    borderRadius: '3em',
    background: 'transparent',

    '&:first-of-type': {
      paddingRight: 8,
    },
    '&:last-of-type': {
      paddingLeft: 8,
    },
  },

  'input:checked ~ span:last-of-type, input:not(:checked) ~ span:first-of-type':
    {
      background: theme.boolean.selectedBackground,
      color: theme.color.defaultText,
      padding: '7px 15px',
    },
}));

const inferThemeMode = () => {
  if (typeof localStorage !== 'undefined' && localStorage.theme === 'dark') {
    return 'dark';
  }
  if (typeof localStorage !== 'undefined' && localStorage.theme === 'light') {
    return 'light';
  }
  if (window?.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

export const EndeavourThemeSwitcher = () => {
  const [globals, updateGlobals] = useGlobals();
  const mode = globals['endeavour-mode'] || inferThemeMode();

  console.log('hmmm', mode);

  useEffect(() => {
    addons.setConfig({
      theme: mode === 'dark' ? dark : light,
    });
  }, [mode]);

  const setMode = useCallback(
    (theme: 'light' | 'dark' | 'system') => {
      if (theme !== 'system') {
        localStorage?.setItem('theme', theme);
        updateGlobals({ ['endeavour-mode']: theme });
        return;
      }

      localStorage?.removeItem('theme');

      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        updateGlobals({ ['endeavour-mode']: 'dark' });
        return;
      }

      updateGlobals({ ['endeavour-mode']: 'light' });
    },
    [updateGlobals],
  );

  const onChange = () => {
    if (mode === 'light') {
      setMode('dark');
    }
    if (mode === 'dark') {
      setMode('light');
    }
  };

  return (
    <WithTooltip
      placement="top"
      trigger="click"
      closeOnOutsideClick
      tooltip={() => (
        <>
          <Label
            htmlFor="endeavour-theme-mode"
            title={
              mode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'
            }>
            <input
              id="endeavour-theme-mode"
              type="checkbox"
              onChange={onChange}
              checked={mode === 'dark'}
            />
            <span>Light</span>
            <span>Dark</span>
          </Label>
          <Button outline secondary small onClick={() => setMode('system')}>
            System
          </Button>
        </>
      )}>
      <IconButton title="Select Theme and Mode">
        <Icons icon="circlehollow" />
        <div style={{ paddingLeft: '.5em' }}>Theme</div>
      </IconButton>
    </WithTooltip>
  );
};
