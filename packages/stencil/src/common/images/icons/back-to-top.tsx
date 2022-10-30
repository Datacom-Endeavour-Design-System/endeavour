import { h } from '@stencil/core';
import { SVGOpts } from '../icons-opts';

/* eslint-disable @typescript-eslint/no-unsafe-return */
export const BackToTop = (opts?: SVGOpts) =>
    <svg xmlns="http://www.w3.org/2000/svg" class={opts?.class} viewBox="0 0 384 512"><path d="M24 80.03h336c13.25 0 24-10.76 24-24.02S373.3 32 360 32H24C10.75 32 0 42.76 0 56.02S10.75 80.03 24 80.03zM81.47 304.2L168 212.1v243.8C168 469.2 178.8 480 192 480s24-10.77 24-24.04V212.1l86.53 92.05C307.3 309.2 313.6 311.7 320 311.7c5.906 0 11.81-2.16 16.44-6.541c9.656-9.076 10.12-24.29 1.031-33.96l-128-136.2c-9.062-9.702-25.88-9.702-34.94 0L46.53 271.2C37.44 280.9 37.91 296.1 47.56 305.2C57.19 314.3 72.38 313.9 81.47 304.2z"/></svg>