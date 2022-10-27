import * as icons from './icons';
import {pascalToDashCase} from '../../utils';
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
    if (!name) {
        throw new Error('Icon name must not be empty');
    }
    const imageName = name.toLowerCase();

    if (!mapped) {
        mapped = Object.keys(icons).reduce((p, k) => {p[pascalToDashCase(k)] = icons[k]; return p}, {});
    }

    if (!mapped[imageName]) {
        throw new Error(`Icon ${name} not found`);
    }

    return mapped[imageName];
}

export const getSvg = (name: string, opts?: SVGOpts) => {
    return getSvgComponent(name)(opts);
}