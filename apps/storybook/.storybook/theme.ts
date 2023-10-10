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

  inputTextColor: '#000A14', // input text
  inputBg: '#FFFFFF', // input background

  buttonBg: '#FFFFFF', // button background

  booleanSelectedBg: '#002BFE', // active toggle value background
  booleanBg: '#FFFFFF', // inactive toggle value background

  // Top toolbar and tab selector on bottom toolbar
  barBg: '#CCD9FC', // background
  barTextColor: '#000A14', // text and icons
  barSelectedColor: '#002BFE', // active text and underline

  // Left toolbar
  appBg: '#CCD9FC', // background

  // Bottom toolbar content
  appContentBg: '#FFFFFF', //background

  // alpha values, leave as is
  appBorderColor: '#E6E7E8',
  buttonBorder: '#80858A',
  inputBorder: '#80858A',
});

export const dark = create({
  ...base,
  base: 'dark',

  brandImage: '/images/logo-dark.png',

  colorPrimary: '#FF00FF', // ??? probably the storybook logo (not used by us)
  colorSecondary: '#80A0F8', // active selection backround; main menu icons

  textColor: '#E6E7E8', // text
  textInverseColor: '#FF00FF', // ??? same as background
  textMutedColor: '#999999', // chevron; input text; shortcut helper text

  inputTextColor: '#80858A', // input text

  inputBg: '#000A14', // input background

  buttonBg: '#000A14', // button background

  booleanSelectedBg: '#80A0F8', // active toggle value background
  booleanBg: '#000A14', // inactive toggle value background

  // Top toolbar and tab selector on bottom toolbar
  barBg: '#1A232C', // background
  barTextColor: '#E6E7E8', // text and icons
  barSelectedColor: '#80A0F8', // active text and underline

  // Left toolbar
  appBg: '#1A232C', // background

  // Bottom toolbar content
  appContentBg: '#000A14', //background

  // alpha values, leave as is
  appBorderColor: '#1A232C',
  buttonBorder: '#80A0F8',
  inputBorder: '#80858A',
});

/*
export const light = create({
  ...base,

  base: 'light',

  colorPrimary: '#002BFE', // ??? probably the storybook logo (not used by us)
  colorSecondary: '#002BFE', // active selection backround; main menu icons

  textColor: '#000A14', // text
  textInverseColor: '#FFFFFF', // ??? same as background
  textMutedColor: '#666666', // chevron; input text; shortcut helper text

  inputTextColor: '#000A14', // input text
  inputBg: '#FFFFFF', // input background

  buttonBg: '#FFFFFF', // button background

  booleanSelectedBg: '#002BFE', // active toggle value background
  booleanBg: '#FFFFFF', // inactive toggle value background

  // Top toolbar and tab selector on bottom toolbar
  barBg: '#CCD9FC', // background
  barTextColor: '#000A14', // text and icons
  barSelectedColor: '#002BFE', // active text and underline

  // Left toolbar
  appBg: '#CCD9FC', // background

  // Bottom toolbar content
  appContentBg: '#CCD9FC', //background

  // alpha values, leave as is
  appBorderColor: '#80858A',
  buttonBorder: '#002BFE',
  inputBorder: '#80858A',
});

export const dark = create({
  ...base,

  base: 'dark',

  colorPrimary: '#80A0F8', // ??? probably the storybook logo (not used by us)
  colorSecondary: '#80A0F8', // active selection backround; main menu icons

  textColor: '#FFFFFF', // text
  textInverseColor: '#000A14', // ??? same as background
  textMutedColor: '#999999', // chevron; input text; shortcut helper text

  inputTextColor: '#FFFFFF', // input text

  inputBg: '#000A14', // input background

  buttonBg: '#000A14', // button background

  booleanSelectedBg: '#80A0F8', // active toggle value background
  booleanBg: '#000A14', // inactive toggle value background

  // Top toolbar and tab selector on bottom toolbar
  barBg: '#000A14', // background
  barTextColor: '#FFFFFF', // text and icons
  barSelectedColor: '#80A0F8', // active text and underline

  // Left toolbar
  appBg: '#000A14', // background

  // Bottom toolbar content
  appContentBg: '#000A14', //background

  // alpha values, leave as is
  appBorderColor: '#80858A',
  buttonBorder: '#80A0F8',
  inputBorder: '#80858A',
});
*/
