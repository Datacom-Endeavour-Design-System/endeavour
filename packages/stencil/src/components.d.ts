/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { ButtonSize, ButtonVariant, ImagePosition } from "./components/datacom-button/datacom-button";
import { CheckboxSize } from "./components/datacom-checkbox/datacom-checkbox";
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
        /**
          * Auto-validate and display error message on form submit
         */
        "autoValidate"?: boolean;
        "autocomplete"?: boolean;
        "autofocus": boolean;
        /**
          * Check if the control is valid
         */
        "checkValidity": () => Promise<boolean>;
        "checked": boolean;
        /**
          * True if the checkbox is a child and should be indented
         */
        "child": boolean;
        "disabled": boolean;
        "form"?: string;
        "formaction"?: string;
        "formenctype"?: string;
        "formmethod"?: string;
        "formnovalidate"?: boolean;
        "formtarget"?: string;
        /**
          * True if the checkbox is part of a group
         */
        "grouped": boolean;
        /**
          * Index of the checkbox in the group
         */
        "index": number;
        /**
          * Checkbox label (right of tickbox)
         */
        "label": string;
        /**
          * Custom error message if control is invalid
         */
        "message": string;
        "name": string;
        /**
          * Standard form props
         */
        "readonly"?: boolean;
        "required": boolean;
        /**
          * Checkbox is either standard size (default) or small
         */
        "size": CheckboxSize;
        /**
          * Show control in unknown state (dash)
         */
        "unknown"?: boolean;
        /**
          * Force validation on the form control to display any error messages
          * @returns boolean
         */
        "validate": () => Promise<boolean>;
        "value"?: string;
    }
    interface DatacomCheckboxGroup {
    }
    interface DatacomDropdown {
    }
    interface DatacomDropdownOption {
    }
    interface DatacomInput {
        /**
          * Automatically show error state if invalid on form submit
         */
        "autoValidate"?: boolean;
        /**
          * Check if the control is valid
         */
        "checkValidity": () => Promise<boolean>;
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
          * Disable tab
          * @returns void
         */
        "disableTab": (index: number) => Promise<void>;
        /**
          * Enable tab
          * @returns void
         */
        "enableTab": (index: number) => Promise<void>;
        /**
          * Select a tab with focus (zero index based)
          * @param index
          * @returns void
         */
        "select": (index: number) => Promise<void>;
        /**
          * Return selected tab (zero index based)
          * @returns number
         */
        "selected": () => Promise<number>;
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
    interface HTMLDatacomCheckboxGroupElement extends Components.DatacomCheckboxGroup, HTMLStencilElement {
    }
    var HTMLDatacomCheckboxGroupElement: {
        prototype: HTMLDatacomCheckboxGroupElement;
        new (): HTMLDatacomCheckboxGroupElement;
    };
    interface HTMLDatacomDropdownElement extends Components.DatacomDropdown, HTMLStencilElement {
    }
    var HTMLDatacomDropdownElement: {
        prototype: HTMLDatacomDropdownElement;
        new (): HTMLDatacomDropdownElement;
    };
    interface HTMLDatacomDropdownOptionElement extends Components.DatacomDropdownOption, HTMLStencilElement {
    }
    var HTMLDatacomDropdownOptionElement: {
        prototype: HTMLDatacomDropdownOptionElement;
        new (): HTMLDatacomDropdownOptionElement;
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
        "datacom-checkbox-group": HTMLDatacomCheckboxGroupElement;
        "datacom-dropdown": HTMLDatacomDropdownElement;
        "datacom-dropdown-option": HTMLDatacomDropdownOptionElement;
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
        /**
          * Auto-validate and display error message on form submit
         */
        "autoValidate"?: boolean;
        "autocomplete"?: boolean;
        "autofocus"?: boolean;
        "checked"?: boolean;
        /**
          * True if the checkbox is a child and should be indented
         */
        "child"?: boolean;
        "disabled"?: boolean;
        "form"?: string;
        "formaction"?: string;
        "formenctype"?: string;
        "formmethod"?: string;
        "formnovalidate"?: boolean;
        "formtarget"?: string;
        /**
          * True if the checkbox is part of a group
         */
        "grouped"?: boolean;
        /**
          * Index of the checkbox in the group
         */
        "index"?: number;
        /**
          * Checkbox label (right of tickbox)
         */
        "label"?: string;
        /**
          * Custom error message if control is invalid
         */
        "message"?: string;
        "name"?: string;
        /**
          * Emit a changed event with the index number if the control changes state
         */
        "onChanged"?: (event: DatacomCheckboxCustomEvent<number>) => void;
        /**
          * Standard form props
         */
        "readonly"?: boolean;
        "required"?: boolean;
        /**
          * Checkbox is either standard size (default) or small
         */
        "size"?: CheckboxSize;
        /**
          * Show control in unknown state (dash)
         */
        "unknown"?: boolean;
        "value"?: string;
    }
    interface DatacomCheckboxGroup {
    }
    interface DatacomDropdown {
    }
    interface DatacomDropdownOption {
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
        "selected"?: boolean;
    }
    interface DatacomTabgroup {
    }
    interface IntrinsicElements {
        "datacom-button": DatacomButton;
        "datacom-checkbox": DatacomCheckbox;
        "datacom-checkbox-group": DatacomCheckboxGroup;
        "datacom-dropdown": DatacomDropdown;
        "datacom-dropdown-option": DatacomDropdownOption;
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
            "datacom-checkbox-group": LocalJSX.DatacomCheckboxGroup & JSXBase.HTMLAttributes<HTMLDatacomCheckboxGroupElement>;
            "datacom-dropdown": LocalJSX.DatacomDropdown & JSXBase.HTMLAttributes<HTMLDatacomDropdownElement>;
            "datacom-dropdown-option": LocalJSX.DatacomDropdownOption & JSXBase.HTMLAttributes<HTMLDatacomDropdownOptionElement>;
            "datacom-input": LocalJSX.DatacomInput & JSXBase.HTMLAttributes<HTMLDatacomInputElement>;
            "datacom-menubar": LocalJSX.DatacomMenubar & JSXBase.HTMLAttributes<HTMLDatacomMenubarElement>;
            "datacom-tab": LocalJSX.DatacomTab & JSXBase.HTMLAttributes<HTMLDatacomTabElement>;
            "datacom-tabgroup": LocalJSX.DatacomTabgroup & JSXBase.HTMLAttributes<HTMLDatacomTabgroupElement>;
        }
    }
}
