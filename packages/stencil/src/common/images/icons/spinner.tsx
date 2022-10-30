import { h } from '@stencil/core';
import { SVGOpts } from '../icons-opts';

/* eslint-disable @typescript-eslint/no-unsafe-return */
export const Spinner = (opts?: SVGOpts) => 
    <svg class={opts?.class} viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
    </svg>;
