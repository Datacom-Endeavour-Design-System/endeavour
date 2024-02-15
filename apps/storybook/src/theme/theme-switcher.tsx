import React, { memo, useCallback, useEffect, useState } from 'react';
import { light, dark } from './storybook-theme';
import { Icons, IconButton, WithTooltip } from '@storybook/components';
import { addons } from '@storybook/manager-api';
import {
  themes,
  getLocalThemeMode,
  inferThemeMode,
  useEndeavourGlobals,
} from './endeavour-theme';

export const ThemeSwitcher = memo(function EndeavourThemeSwitcher() {
  const [globals, updateGlobals] = useEndeavourGlobals();

  const [visible, setVisible] = useState(false);

  const isDark =
    (globals['endeavour-theme-mode'] || inferThemeMode()) === 'dark';

  const localMode = getLocalThemeMode();

  useEffect(() => {
    addons.setConfig({
      theme: isDark ? dark : light,
    });
  }, [isDark]);

  const setMode = useCallback(
    (theme: 'light' | 'dark' | 'system') => {
      if (theme !== 'system') {
        localStorage?.setItem('theme', theme);
        updateGlobals({ 'endeavour-theme-mode': theme });
        return;
      }

      localStorage?.removeItem('theme');

      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        updateGlobals({ 'endeavour-theme-mode': 'dark' });
        return;
      }

      updateGlobals({ 'endeavour-theme-mode': 'light' });
    },
    [updateGlobals],
  );

  return (
    <WithTooltip
      placement="top"
      trigger="click"
      closeOnOutsideClick
      onVisibleChange={setVisible}
      tooltip={() => (
        <div style={{ borderRadius: '3px' }}>
          <div
            style={{
              padding: '8px',
              display: 'flex',
              justifyContent: 'space-between',
            }}>
            <IconButton
              active={localMode === 'light'}
              onClick={() => setMode('light')}>
              Light
            </IconButton>
            <IconButton
              active={localMode === 'dark'}
              onClick={() => setMode('dark')}>
              Dark
            </IconButton>
            <IconButton
              active={localMode === 'system'}
              onClick={() => setMode('system')}>
              Auto (OS)
            </IconButton>
          </div>
          <div
            style={{
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
            }}>
            {themes.map(({ name, title, colour }) => (
              <IconButton
                key={name}
                style={{
                  justifyContent: 'start',
                  width: '100%',
                }}
                active={name === globals['endeavour-theme-name']}
                onClick={() => updateGlobals({ 'endeavour-theme-name': name })}>
                <Icons
                  style={{ marginRight: '12px' }}
                  icon="circle"
                  color={colour}
                />
                {title}
              </IconButton>
            ))}
          </div>
        </div>
      )}>
      <IconButton active={visible} title="Select Theme and Mode">
        <svg viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
          <path
            className="st0"
            style={{ fill: 'currentColor' }}
            d="M0.7,13.3C0.2,13.3,0,13,0,12.5c0-0.4,0.3-0.7,0.7-0.7h0.1c0.2,0,0.4-0.1,0.6-0.3s0.3-0.5,0.2-0.8
	c0-0.2,0-0.3,0-0.4c0-1.6,1.3-2.9,2.9-2.9c0.2,0,0.3,0,0.5,0h0.1l6.2-6.2C11.5,1,12,0.8,12.4,0.8s0.8,0.2,1.1,0.5
	c0.6,0.6,0.6,1.7,0,2.3L7.3,9.8v0.1c0,0.2,0,0.3,0,0.5c0,1.6-1.3,2.9-2.9,2.9H0.7L0.7,13.3z M2.1,12.2h2.3c1,0,1.9-0.8,1.9-1.9
	c0-0.2,0-0.5-0.1-0.7l0,0l-1-1l0,0C4.9,8.5,4.7,8.5,4.5,8.5c-1,0-1.9,0.8-1.9,1.9c0,0.1,0,0.2,0,0.3c0.1,0.5,0,1-0.3,1.4L2.1,12.2z
	 M7.3,6.6l0.9,0.9l4.6-4.6C13,2.7,13,2.3,12.8,2c-0.1-0.1-0.3-0.2-0.4-0.2c-0.2,0-0.3,0.1-0.4,0.2l-0.1,0l0,0L7.3,6.6z"
          />
        </svg>
        <div style={{ paddingLeft: '.5em' }}>Theme</div>
      </IconButton>
    </WithTooltip>
  );
});
