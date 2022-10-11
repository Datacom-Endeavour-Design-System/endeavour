import { Config } from '@stencil/core';
import { reactOutputTarget as react } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'datacom',
  globalStyle: 'src/global/light.css',
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
          src: 'global/light.css'
        }
      ],
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null,
    },
  ],
};
