import { Config } from '@stencil/core';
import { postcss } from '@stencil-community/postcss';
import { reactOutputTarget } from '@stencil/react-output-target';
import { angularOutputTarget } from '@stencil/angular-output-target';
import postcssCustomMedia from 'postcss-custom-media';
//import { resolve } from 'path';

export const config: Config = {
  namespace: 'endeavour',
  globalStyle: 'src/global/global.css',
  extras: {
    enableImportInjection: true,
  },
  buildEs5: true,
  plugins: [
    postcss({
      plugins: [postcssCustomMedia()],
    }),
  ],
  outputTargets: [
    {
      type: 'dist',
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
    angularOutputTarget({
      componentCorePackage: '@datacom/endeavour',
      outputType: 'standalone',
      customElementsDir: 'dist/components',
      directivesProxyFile: '../angular/src/stencil-generated/components.ts',
    }),
  ],
};
