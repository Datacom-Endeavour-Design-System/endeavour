import { h } from '@stencil/core';
import { SVGOpts } from '../icons-opts';

export const Error = (opts?: SVGOpts) => (
  <svg class={opts?.class} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 13.5C10 12.125 8.875 11 7.5 11C6.09375 11 5 12.125 5 13.5C5 14.9062 6.09375 16 7.5 16C8.875 16 10 14.9062 10 13.5ZM5.28125 0.8125L5.6875 9.3125C5.71875 9.6875 6.0625 10 6.4375 10H8.53125C8.90625 10 9.25 9.6875 9.28125 9.3125L9.6875 0.8125C9.71875 0.375 9.375 0 8.9375 0H6.03125C5.59375 0 5.25 0.375 5.28125 0.8125Z"
      fill="#CF364E"
    />
  </svg>
);
