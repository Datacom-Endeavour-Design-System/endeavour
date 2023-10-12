import { create } from '@storybook/theming';

const base = {
  brandTitle: 'Datacom Brandhub',
  brandUrl: 'https://brandhub.datacom.com/d/fjZSq4WewHBg',
  brandImage: '/images/logo.svg',
  brandTarget: '_self',

  // Typography
  fontBase: 'Montserrat',

  inputBorderRadius: 3,

  appBorderRadius: 3,
};

export const light = create({
  ...base,
  base: 'light',

  brandImage: '/images/logo.svg',

  colorPrimary: '#002BFE', // ??? probably the storybook logo (not used by us)
  colorSecondary: '#002BFE', // active selection backround; main menu icons

  textColor: '#000A14', // text
  textInverseColor: '#FFFFFF', // ??? same as background
  textMutedColor: '#666666', // chevron; input text; shortcut helper text

  appBorderColor: '#E6E7E8',

  inputTextColor: '#000A14', // input text
  inputBg: '#FFFFFF', // input background
  inputBorder: '#80858A',

  buttonBg: '#FFFFFF', // button background
  buttonBorder: '#80858A',

  booleanSelectedBg: '#FFFFFF', // active toggle value background
  booleanBg: '#DADADA', // inactive toggle value background

  // Top toolbar and tab selector on bottom toolbar
  barBg: '#CCD9FC', // background
  barTextColor: '#000A14', // text and icons
  barSelectedColor: '#002BFE', // active text and underline

  // Left toolbar
  appBg: '#CCD9FC', // background

  // Bottom toolbar content
  appContentBg: '#FFFFFF', //background
});

export const dark = create({
  ...base,
  base: 'dark',

  brandImage: '/images/logo-dark.svg',

  colorPrimary: '#80A0F8', // ??? probably the storybook logo (not used by us)
  colorSecondary: '#80A0F8', // active selection backround; main menu icons

  textColor: '#E6E7E8', // text
  textInverseColor: '#FF00FF', // ??? same as background
  textMutedColor: '#999999', // chevron; input text; shortcut helper text

  appBorderColor: '#1A232C',

  inputTextColor: '#80858A', // input text

  inputBg: '#000A14', // input background
  inputBorder: '#80858A',

  buttonBg: '#000A14', // button background
  buttonBorder: '#80A0F8',

  booleanSelectedBg: '#000A14', // active toggle value background
  booleanBg: '#666666', // inactive toggle value background

  // Top toolbar and tab selector on bottom toolbar
  barBg: '#1A232C', // background
  barTextColor: '#E6E7E8', // text and icons
  barSelectedColor: '#80A0F8', // active text and underline

  // Left toolbar
  appBg: '#1A232C', // background

  // Bottom toolbar content
  appContentBg: '#000A14', //background
});
