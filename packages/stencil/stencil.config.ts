import { Config } from '@stencil/core';
import { reactOutputTarget as react } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'datacom',
  globalStyle: 'src/global/css/light.css',
  extras: {
    experimentalImportInjection: true,
  },
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
      type: 'docs-readme',
      footer: `(c) Copyright Datacom New Zealand Limited ${new Date().getFullYear()}`,
    },
  ],
};
