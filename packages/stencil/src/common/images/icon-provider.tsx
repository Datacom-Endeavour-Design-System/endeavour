import * as icons from './icons';
import {pascalToDashCase} from '../../utils';
import {SVGOpts} from './icons-opts';
import { h, FunctionalComponent, VNode } from '@stencil/core';

/**
 * Get Scalable vector graphics images (svg) dynamically. 
 * 
 * This file must be a tsx and it must explicitly use an svg tag (Empty)
 */
export const Empty: FunctionalComponent = () => <svg></svg>;
type IconComponentMapType = {[key: string]: FunctionalComponent<SVGOpts>}

let mapped: IconComponentMapType;
export const getSvgComponent = (name: string): FunctionalComponent<SVGOpts> => {
    if (name?.length == 0) {
        throw new Error('Icon name must not be empty');
    }
    const imageName = name.toLowerCase();

    if (mapped == undefined) {
        mapped = Object
                    .keys(icons)
                    .reduce((p, k) => {
                        p[pascalToDashCase(k)] = (icons[k] as FunctionalComponent<SVGOpts>); 
                        return p;
                    }, {});
    }

    const component = mapped[imageName];
    if (component == undefined) {
        throw new Error(`Icon ${name} not found`);
    }

    return component;
}

export const getSvg = (name: string, opts?: SVGOpts): VNode => {
    return getSvgComponent(name)(opts, [], null) as VNode;
}