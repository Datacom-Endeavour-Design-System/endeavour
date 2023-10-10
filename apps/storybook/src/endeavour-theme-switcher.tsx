import React, { memo, useCallback, useEffect } from 'react';
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

export const EndeavourThemeSwitcher = memo(function EndeavourThemeSwitcher() {
  const [globals, updateGlobals] = useGlobals();

  const isDark = (globals['endeavour-mode'] || inferThemeMode()) === 'dark';

  useEffect(() => {
    addons.setConfig({
      theme: isDark ? dark : light,
    });
  }, [isDark]);

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

  return (
    <WithTooltip
      placement="top"
      trigger="click"
      closeOnOutsideClick
      tooltip={() => (
        <div style={{ padding: '7px 10px', borderRadius: '3px' }}>
          <Label
            htmlFor="endeavour-theme-mode"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
            <input
              id="endeavour-theme-mode"
              type="checkbox"
              onChange={() => (isDark ? setMode('light') : setMode('dark'))}
              checked={isDark}
            />
            <span>Light</span>
            <span>Dark</span>
          </Label>
          <Button outline secondary small onClick={() => setMode('system')}>
            System
          </Button>
        </div>
      )}>
      <IconButton title="Select Theme and Mode">
        <Icons icon="circlehollow" />
        <div style={{ paddingLeft: '.5em' }}>Theme</div>
      </IconButton>
    </WithTooltip>
  );
});
