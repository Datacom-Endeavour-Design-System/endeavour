
import { create } from '@storybook/theming';

export default create({
  base: 'light',

  colorPrimary: 'rgb(10, 24, 57)',
  colorSecondary: '#0055FF',

  brandTitle: 'Datacom Brandhub',
  brandUrl: 'https://datacom.co.nz',
  brandImage: '/images/logo.png',
  brandTarget: '_self',

  // Typography
  fontBase: 'Montserrat',

  // UI
  appBorderColor: '#0055FF',
  textInverseColor: 'rgb(0, 85, 255)',
  inputBorderRadius: '3px',

  // Text colors
  textColor: 'rgb(10, 24, 57)',
});