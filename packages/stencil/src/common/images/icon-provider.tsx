import * as icons from './icons';
import {SVGComponent, SVGOpts} from './icons-opts';
import { h } from '@stencil/core';

/**
 * Get Scalable vector graphics images (svg) dynamically. 
 * 
 * This file must be a tsx and it must explicitly use an svg tag (Empty)
 */
export const Empty = () => <svg></svg>;

let mapped;
export const getSvgComponent = (name: string): SVGComponent => {
    const transformed = name.toLowerCase();

    if (!mapped) {
        mapped = Object.keys(icons).reduce((p, k) => {p[k.toLowerCase()] = icons[k]; return p}, {});
    }

    if (!mapped[transformed]) {
        throw Error(`Icon ${name} not found`);
    }

    return mapped[transformed];
}

export const getSvg = (name: string, opts?: SVGOpts) => {
    return getSvgComponent(name)(opts);
}