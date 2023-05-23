import { h } from '@stencil/core';
import { SVGOpts } from '../icons-opts';

export const Last = (opts?: SVGOpts) => (
  <svg xmlns="http://www.w3.org/2000/svg" class={opts?.class} viewBox="0 0 18.37 24" fill="#000a14">
    <rect x="15.81" width="2.56" height="24" rx=".75" ry=".75" />
    <path d="m2.13.49c-.24-.24-.65-.24-.9,0L.19,1.54c-.24.24-.24.65,0,.9l9.55,9.57L.18,21.58c-.24.24-.24.65,0,.9l1.04,1.04c.24.24.65.24.9,0l11.07-11.06c.24-.24.24-.65,0-.9L2.13.49Z" />
  </svg>
);
