import { h } from '@stencil/core';
import { SVGOpts } from '../icons-opts';

/* eslint-disable @typescript-eslint/no-unsafe-return */
export const Upload = (opts?: SVGOpts) =>
    <svg xmlns="http://www.w3.org/2000/svg" class={opts?.class} viewBox="0 0 512 512"><path d="M416 159.9l-8-.1648c-13.25 0-24 10.75-24 24.02c0 13.26 10.75 24.02 24 24.02H416c8.836 0 16 7.169 16 16.01v224.2c0 8.842-7.164 16.01-16 16.01H96c-8.836 0-16-7.169-16-16.01V223.8c0-8.842 7.164-16.01 16-16.01h8c13.25 0 24-10.75 24-24.02c0-13.27-10.75-24.02-24-24.02L96 159.9c-35.35 0-64 28.51-64 63.88v224.2C32 483.3 60.65 512 96 512h320c35.35 0 64-28.68 64-64.04V223.8C480 188.4 451.3 159.9 416 159.9zM160 151.8c6.47 0 12.91-2.614 17.62-7.752L232 85.08v234.8c0 13.26 10.75 24.02 24 24.02s24-10.76 24-24.02V85.08l54.38 58.95C339.1 149.2 345.5 151.7 352 151.7c13.23 0 24-10.77 24-24.05c0-5.83-2.108-11.64-6.376-16.26l-96-104.1C269.1 2.455 262.5-.0002 256-.0002S242.9 2.455 238.4 7.365l-96 104.1C138.1 116.1 135.1 121.9 135.1 127.7C135.1 141.1 146.9 151.8 160 151.8z" /></svg>