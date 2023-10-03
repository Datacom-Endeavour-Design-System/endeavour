import { Config } from '@stencil/core';
import { postcss } from '@stencil-community/postcss';
import { reactOutputTarget } from '@stencil/react-output-target';
import postcssCustomMedia from 'postcss-custom-media';

export const config: Config = {
  namespace: 'datacom',
  globalStyle: 'src/global/css/light.css',
  extras: {
    enableImportInjection: true,
  },
  plugins: [
    postcss({
      plugins: [postcssCustomMedia()],
    }),
  ],
  outputTargets: [
    {
      type: 'dist',
      copy: [
        {
          src: 'global/*',
        },
      ],
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'www',
      copy: [
        {
          src: 'assets',
          dest: 'assets',
        },
      ],
      serviceWorker: null,
    },
    reactOutputTarget({
      componentCorePackage: '@datacom/endeavour',
      proxiesFile: '../react/src/components/stencil-generated/index.ts',
      includeDefineCustomElements: true,
    }),
  ],
};
