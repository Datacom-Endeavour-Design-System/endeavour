import { h } from '@stencil/core';
import { SVGOpts } from '../icons-opts';

export const Chevron = (opts?: SVGOpts) => (
  <svg class={opts?.class} width={opts?.width} height={opts?.height} viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.8726 1.26751L15.1573 0.552155C14.9875 0.382355 14.7129 0.382355 14.5431 0.552155L8 7.08078L1.45693 0.552155C1.28712 0.382355 1.01254 0.382355 0.842727 0.552155L0.127357 1.26751C-0.0424525 1.43733 -0.0424525 1.71191 0.127357 1.88172L7.6929 9.44726C7.86271 9.61708 8.13729 9.61708 8.3071 9.44726L15.8726 1.88172C16.0424 1.7119 16.0424 1.43732 15.8726 1.26751Z"
      fill="#0055FF"
    />
  </svg>
);
