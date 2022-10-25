import { VNode } from '@stencil/core';

export interface SVGOpts {
    class?: string;
    width?: string;
    height?: string;
}

export type SVGComponent = (SVGOpts) => VNode;