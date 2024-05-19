import { h } from '@stencil/core';
import { SVGOpts } from '../icons-opts';

export const Clock = (opts?: SVGOpts) => (
  <svg
    class={opts?.class}
    width={opts?.width}
    height={opts?.height}
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 0.578125C3.71875 0.578125 0.25 4.04688 0.25 8.32812C0.25 12.6094 3.71875 16.0781 8 16.0781C12.2812 16.0781 15.75 12.6094 15.75 8.32812C15.75 4.04688 12.2812 0.578125 8 0.578125ZM14.75 8.32812C14.75 12.0375 11.7469 15.0781 8 15.0781C4.29063 15.0781 1.25 12.075 1.25 8.32812C1.25 4.61875 4.25313 1.57812 8 1.57812C11.7094 1.57812 14.75 4.58125 14.75 8.32812ZM10.0969 11.0875L7.55937 9.24375C7.4625 9.17188 7.40625 9.05937 7.40625 8.94063V3.95312C7.40625 3.74688 7.575 3.57812 7.78125 3.57812H8.21875C8.425 3.57812 8.59375 3.74688 8.59375 3.95312V8.525L10.7969 10.1281C10.9656 10.25 11 10.4844 10.8781 10.6531L10.6219 11.0063C10.5 11.1719 10.2656 11.2094 10.0969 11.0875Z"
      fill="#666666"
    />
  </svg>
);