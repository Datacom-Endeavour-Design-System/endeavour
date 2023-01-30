import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import { reactOutputTarget as react } from '@stencil/react-output-target';
import postcssCustomMedia from 'postcss-custom-media';

export const config: Config = {
  namespace: 'datacom',
  globalStyle: 'src/global/css/light.css',
  extras: {
    experimentalImportInjection: true,
  },
  plugins: [
    postcss({
      plugins: [postcssCustomMedia()],
    }),
  ],
  outputTargets: [
    react({
      componentCorePackage: '@datacom/endeavour',
      proxiesFile: '../react/src/components/stencil-generated/index.ts',
      includeDefineCustomElements: true,
    }),
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
    {
      type: 'docs-json',
      file: 'src/docs.json',
    },
  ],
};
