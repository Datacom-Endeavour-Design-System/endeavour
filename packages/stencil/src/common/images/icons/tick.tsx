import { h } from '@stencil/core';
import { SVGOpts } from '../icons-opts';

export const Tick = (opts?: SVGOpts) => (
  <svg class={opts?.class} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
    <g transform="translate(-4 -4)">
      <rect width="16" height="16" transform="translate(4 4)" fill="none" />
      <path
        d="M41.676,80.074l-9.2,9.2L29.089,85.9a.42.42,0,0,0-.594,0l-.99.99a.42.42,0,0,0,0,.594l4.669,4.669a.42.42,0,0,0,.594,0L43.26,81.658a.42.42,0,0,0,0-.594l-.99-.99A.42.42,0,0,0,41.676,80.074Z"
        transform="translate(-23.382 -73.952)"
        fill="#05f"
      />
    </g>
  </svg>
);
