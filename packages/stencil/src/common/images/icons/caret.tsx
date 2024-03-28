import { h } from '@stencil/core';
import { SVGOpts } from '../icons-opts';

export const Caret = (opts?: SVGOpts) => (
  <svg
    class={opts?.class}
    width={opts?.width}
    height={opts?.height}
    name={opts?.name}
    viewBox="0 0 10 4"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      name={opts?.name}
      d="M4.35491 3.8125C4.63616 4.0625 5.37053 4.0625 5.65178 3.8125L9.40178 0.5625C9.68303 0.3125 9.32366 0 8.74553 0L1.24553 0C0.683034 0 0.308034 0.3125 0.604909 0.5625L4.35491 3.8125Z"
      fill="#002BFE"
    />
  </svg>
);
