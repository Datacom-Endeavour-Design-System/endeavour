/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { ButtonSize, ButtonVariant, ImagePosition } from "./components/datacom-button/datacom-button";
import { DatacomInputType, IndicatorType } from "./components/datacom-input/datacom-input";
export namespace Components {
    interface DatacomButton {
        "autofocus": boolean;
        /**
          * HTML button element properties
         */
        "disabled": boolean;
        "form": string;
        "formaction": string;
        "formenctype": string;
        "formmethod": string;
        "formtarget": string;
        /**
          * Name of built-in icon named using dash case. E.g. "back-to-top"
         */
        "icon": string;
        /**
          * Image position: - left - right
         */
        "imagePosition": ImagePosition;
        /**
          * If true, show loading icon
         */
        "loading": boolean;
        "name": string;
        /**
          * Button size: - large - small
         */
        "size": ButtonSize;
        /**
          * Image source as either relative or obsolute URI
         */
        "src": string;
        /**
          * Button text content. If not present use component children
         */
        "text"?: string;
        "type": string;
        "value": string;
        /**
          * Button variant: - primary - seconday - ghost
         */
        "variant": ButtonVariant;
    }
    interface DatacomCheckbox {
        "checked": boolean;
        "label": string;
    }
    interface DatacomInput {
        /**
          * Automatically show error state if invalid on form submit
         */
        "autoValidate"?: boolean;
        "disabled"?: boolean;
        /**
          * Switch the control to edit mode if it is not already editing.
         */
        "edit": () => Promise<void>;
        "form"?: string;
        "formaction"?: string;
        "formenctype"?: string;
        "formmethod"?: string;
        "formnovalidate"?: boolean;
        "formtarget"?: string;
        /**
          * Optional help text
         */
        "help"?: string;
        /**
          * Feedback indicator
         */
        "indicator"?: IndicatorType;
        "inputmode"?: string;
        "isValid"?: boolean;
        /**
          * Optional label for control. This can be omitted if the host element has a text children.
         */
        "label"?: string;
        "max"?: number;
        "maxlength"?: number;
        /**
          * Error message to display in the case of input validity checks or explicitly with 'valid' property
         */
        "message"?: string;
        "min"?: number;
        "minlength"?: number;
        /**
          * HTML element input properties
         */
        "name": string;
        "pattern"?: string;
        "placeholder"?: string;
        "readonly"?: boolean;
        "required"?: boolean;
        "size"?: number;
        "title": string;
        "type": DatacomInputType;
        /**
          * Force validation on the form control to display any error messages
          * @param opts
          * @returns boolean
         */
        "validate": () => Promise<boolean>;
        "value"?: string;
    }
    interface DatacomMenubar {
    }
    interface DatacomTab {
        "disabled": boolean;
        /**
          * Is this tab currently selected
          * @returns boolean
         */
        "isSelected": () => Promise<boolean>;
        "label": string;
        "selected"?: boolean;
        /**
          * Select this tab
          * @param value
         */
        "setSelected": (value: boolean) => Promise<void>;
    }
    interface DatacomTabgroup {
        /**
          * Select a tab with focus (zero index based)
          * @param index
          * @returns void
         */
        "select": (index: number) => Promise<void>;
    }
}
export interface DatacomCheckboxCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDatacomCheckboxElement;
}
export interface DatacomInputCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDatacomInputElement;
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
    interface HTMLDatacomInputElement extends Components.DatacomInput, HTMLStencilElement {
    }
    var HTMLDatacomInputElement: {
        prototype: HTMLDatacomInputElement;
        new (): HTMLDatacomInputElement;
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
        "datacom-input": HTMLDatacomInputElement;
        "datacom-menubar": HTMLDatacomMenubarElement;
        "datacom-tab": HTMLDatacomTabElement;
        "datacom-tabgroup": HTMLDatacomTabgroupElement;
    }
}
declare namespace LocalJSX {
    interface DatacomButton {
        "autofocus"?: boolean;
        /**
          * HTML button element properties
         */
        "disabled"?: boolean;
        "form"?: string;
        "formaction"?: string;
        "formenctype"?: string;
        "formmethod"?: string;
        "formtarget"?: string;
        /**
          * Name of built-in icon named using dash case. E.g. "back-to-top"
         */
        "icon"?: string;
        /**
          * Image position: - left - right
         */
        "imagePosition"?: ImagePosition;
        /**
          * If true, show loading icon
         */
        "loading"?: boolean;
        "name"?: string;
        /**
          * Button size: - large - small
         */
        "size"?: ButtonSize;
        /**
          * Image source as either relative or obsolute URI
         */
        "src"?: string;
        /**
          * Button text content. If not present use component children
         */
        "text"?: string;
        "type"?: string;
        "value"?: string;
        /**
          * Button variant: - primary - seconday - ghost
         */
        "variant"?: ButtonVariant;
    }
    interface DatacomCheckbox {
        "checked"?: boolean;
        "label"?: string;
        "onToggle"?: (event: DatacomCheckboxCustomEvent<boolean>) => void;
    }
    interface DatacomInput {
        /**
          * Automatically show error state if invalid on form submit
         */
        "autoValidate"?: boolean;
        "disabled"?: boolean;
        "form"?: string;
        "formaction"?: string;
        "formenctype"?: string;
        "formmethod"?: string;
        "formnovalidate"?: boolean;
        "formtarget"?: string;
        /**
          * Optional help text
         */
        "help"?: string;
        /**
          * Feedback indicator
         */
        "indicator"?: IndicatorType;
        "inputmode"?: string;
        "isValid"?: boolean;
        /**
          * Optional label for control. This can be omitted if the host element has a text children.
         */
        "label"?: string;
        "max"?: number;
        "maxlength"?: number;
        /**
          * Error message to display in the case of input validity checks or explicitly with 'valid' property
         */
        "message"?: string;
        "min"?: number;
        "minlength"?: number;
        /**
          * HTML element input properties
         */
        "name"?: string;
        /**
          * Emit changed event when input changes. This relays up the 'input' event, but with the control's current value rather than the input value.
         */
        "onChanged"?: (event: DatacomInputCustomEvent<string>) => void;
        "pattern"?: string;
        "placeholder"?: string;
        "readonly"?: boolean;
        "required"?: boolean;
        "size"?: number;
        "title"?: string;
        "type"?: DatacomInputType;
        "value"?: string;
    }
    interface DatacomMenubar {
    }
    interface DatacomTab {
        "disabled"?: boolean;
        "label"?: string;
        "onSelected"?: (event: DatacomTabCustomEvent<string>) => void;
        "selected"?: boolean;
    }
    interface DatacomTabgroup {
    }
    interface IntrinsicElements {
        "datacom-button": DatacomButton;
        "datacom-checkbox": DatacomCheckbox;
        "datacom-input": DatacomInput;
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
            "datacom-input": LocalJSX.DatacomInput & JSXBase.HTMLAttributes<HTMLDatacomInputElement>;
            "datacom-menubar": LocalJSX.DatacomMenubar & JSXBase.HTMLAttributes<HTMLDatacomMenubarElement>;
            "datacom-tab": LocalJSX.DatacomTab & JSXBase.HTMLAttributes<HTMLDatacomTabElement>;
            "datacom-tabgroup": LocalJSX.DatacomTabgroup & JSXBase.HTMLAttributes<HTMLDatacomTabgroupElement>;
        }
    }
}
