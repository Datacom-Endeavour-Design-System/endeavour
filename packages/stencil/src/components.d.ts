/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { CheckboxSize } from "./components/datacom-checkbox/datacom-checkbox";
export namespace Components {
    interface DatacomButton {
        "disabled": boolean;
        "text": string;
    }
    interface DatacomCheckbox {
        "autofocus": boolean;
        "checked": boolean;
        "disabled": boolean;
        "label": string;
        "required": boolean;
        "size": CheckboxSize;
        "small": string;
        "type": string;
        "value": string;
    }
    interface DatacomMenubar {
    }
    interface DatacomTab {
        "enabled": boolean;
        "isSelected": () => Promise<boolean>;
        "label": string;
        "setSelected": (value: boolean) => Promise<void>;
    }
    interface DatacomTabgroup {
    }
}
export interface DatacomCheckboxCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDatacomCheckboxElement;
}
export interface DatacomTabCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDatacomTabElement;
}
declare global {
    interface HTMLDatacomButtonElement extends Components.DatacomButton, HTMLStencilElement {
    }
    var HTMLDatacomButtonElement: {
        prototype: HTMLDatacomButtonElement;
        new (): HTMLDatacomButtonElement;
    };
    interface HTMLDatacomCheckboxElement extends Components.DatacomCheckbox, HTMLStencilElement {
    }
    var HTMLDatacomCheckboxElement: {
        prototype: HTMLDatacomCheckboxElement;
        new (): HTMLDatacomCheckboxElement;
    };
    interface HTMLDatacomMenubarElement extends Components.DatacomMenubar, HTMLStencilElement {
    }
    var HTMLDatacomMenubarElement: {
        prototype: HTMLDatacomMenubarElement;
        new (): HTMLDatacomMenubarElement;
    };
    interface HTMLDatacomTabElement extends Components.DatacomTab, HTMLStencilElement {
    }
    var HTMLDatacomTabElement: {
        prototype: HTMLDatacomTabElement;
        new (): HTMLDatacomTabElement;
    };
    interface HTMLDatacomTabgroupElement extends Components.DatacomTabgroup, HTMLStencilElement {
    }
    var HTMLDatacomTabgroupElement: {
        prototype: HTMLDatacomTabgroupElement;
        new (): HTMLDatacomTabgroupElement;
    };
    interface HTMLElementTagNameMap {
        "datacom-button": HTMLDatacomButtonElement;
        "datacom-checkbox": HTMLDatacomCheckboxElement;
        "datacom-menubar": HTMLDatacomMenubarElement;
        "datacom-tab": HTMLDatacomTabElement;
        "datacom-tabgroup": HTMLDatacomTabgroupElement;
    }
}
declare namespace LocalJSX {
    interface DatacomButton {
        "disabled"?: boolean;
        "text"?: string;
    }
    interface DatacomCheckbox {
        "autofocus"?: boolean;
        "checked"?: boolean;
        "disabled"?: boolean;
        "label"?: string;
        "onToggle"?: (event: DatacomCheckboxCustomEvent<boolean>) => void;
        "required"?: boolean;
        "size"?: CheckboxSize;
        "small"?: string;
        "type"?: string;
        "value"?: string;
    }
    interface DatacomMenubar {
    }
    interface DatacomTab {
        "enabled"?: boolean;
        "label"?: string;
        "onTabSelected"?: (event: DatacomTabCustomEvent<string>) => void;
    }
    interface DatacomTabgroup {
    }
    interface IntrinsicElements {
        "datacom-button": DatacomButton;
        "datacom-checkbox": DatacomCheckbox;
        "datacom-menubar": DatacomMenubar;
        "datacom-tab": DatacomTab;
        "datacom-tabgroup": DatacomTabgroup;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "datacom-button": LocalJSX.DatacomButton & JSXBase.HTMLAttributes<HTMLDatacomButtonElement>;
            "datacom-checkbox": LocalJSX.DatacomCheckbox & JSXBase.HTMLAttributes<HTMLDatacomCheckboxElement>;
            "datacom-menubar": LocalJSX.DatacomMenubar & JSXBase.HTMLAttributes<HTMLDatacomMenubarElement>;
            "datacom-tab": LocalJSX.DatacomTab & JSXBase.HTMLAttributes<HTMLDatacomTabElement>;
            "datacom-tabgroup": LocalJSX.DatacomTabgroup & JSXBase.HTMLAttributes<HTMLDatacomTabgroupElement>;
        }
    }
}
