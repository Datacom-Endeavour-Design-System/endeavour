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
        <Icons icon="circlehollow" />
        <div style={{ paddingLeft: '.5em' }}>Theme</div>
      </IconButton>
    </WithTooltip>
  );
});
