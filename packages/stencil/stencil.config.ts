import { Config } from '@stencil/core';
import { reactOutputTarget as react } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'datacom',
  globalStyle: 'src/global/css/light.css',
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
          src: 'global/*'
        }
      ],
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'www',
      copy: [
        {
          src: '**/*.{jpg,png,svg}',
        },
        {
          src: '**/*.ttf'
        },
        {
          src: '**/*.css'
        }        
      ],
      serviceWorker: null    
    },
  ],
};
