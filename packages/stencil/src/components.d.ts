/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { ButtonSize, ButtonVariant, ImagePosition } from "./components/datacom-button/datacom-button";
import { CheckboxSizeType } from "./components/datacom-checkbox/datacom-checkbox";
import { ContentTagVariant } from "./components/datacom-content-tag/datacom-content-tag";
import { DatacomDropDownVariantType } from "./components/datacom-dropdown/datacom-dropdown";
import { DatacomInputType, IndicatorType } from "./components/datacom-input/datacom-input";
import { ListVariant, TypeList } from "./components/datacom-list/datacom-list";
import { ImagePosition as ImagePosition1, RadioSize, RadioVariant } from "./components/datacom-radio/datacom-radio";
import { LabelPositionType, ToggleSizeType } from "./components/datacom-toggle/datacom-toggle";
export namespace Components {
    interface DatacomAccordion {
        "disabled": boolean;
        "expanded": boolean;
        "index": number;
        /**
          * Function returns whether or not this accordion is currently expanded.
         */
        "isExpanded": () => Promise<boolean>;
        "label": string;
        /**
          * Function sets the expanded state of this individual accordion item.
          * @param expanded
         */
        "setExpanded": (expanded: boolean) => Promise<void>;
    }
    interface DatacomAccordionGroup {
        "allowMultiExpand"?: boolean;
    }
    interface DatacomBreadcrumb {
        "text": string;
        "url"?: string;
    }
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
          * Show control in indeterminate state (dash)
         */
        "indeterminate"?: boolean;
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
          * Force validation on the form control to display any error messages
          * @returns boolean
         */
        "validate": () => Promise<boolean>;
        "value"?: string;
        /**
          * Checkbox is either standard size (default) or small
         */
        "variant": CheckboxSizeType;
    }
    interface DatacomCheckboxGroup {
    }
    interface DatacomContentTag {
        "solid": boolean;
        "variant": ContentTagVariant;
    }
    interface DatacomDropdown {
        /**
          * Automatically show error state if invalid on form submit
         */
        "autoValidate"?: boolean;
        /**
          * Check if the control is valid
         */
        "checkValidity": () => Promise<boolean>;
        "disabled"?: boolean;
        "form"?: string;
        /**
          * Get a list of select values
          * @returns string[]
         */
        "getSelected": () => Promise<string[]>;
        /**
          * Optional help text
         */
        "help"?: string;
        "isValid"?: boolean;
        /**
          * Control label
         */
        "label": string;
        /**
          * Error message to display in the case of input validity checks or explicitly with 'valid' property
         */
        "message"?: string;
        /**
          * HTML element input properties
         */
        "name": string;
        "placeholder"?: string;
        "readonly"?: boolean;
        "required"?: boolean;
        /**
          * Enable type ahead search for options.
         */
        "search": boolean;
        /**
          * Drop down size
         */
        "size": DropdownSize;
        "title": string;
        /**
          * Force validation on the form control to display any error messages
          * @returns boolean
         */
        "validate": () => Promise<boolean>;
        "value"?: string;
        /**
          * Drop down variant
         */
        "variant": DatacomDropDownVariantType;
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
    interface DatacomLi {
        /**
          * Heading  for list inside of paragraph.
         */
        "heading": false;
    }
    interface DatacomList {
        /**
          * type used for ordered list style.
         */
        "type": TypeList;
        "variant": ListVariant;
    }
    interface DatacomMenubar {
    }
    interface DatacomOption {
        /**
          * Icon name
         */
        "icon"?: string;
        /**
          * Option id
         */
        "index": number;
        /**
          * Display label
         */
        "label": string;
        /**
          * Display type (mostly private) - list = display as item in drop down list (default) - standalone = display a standalone item outside of the list.
         */
        "mode": DropdownOptionMode;
        /**
          * Text for use in option search
         */
        "search"?: string;
        /**
          * True if the option is selected
         */
        "selected": boolean;
        /**
          * Icon source
         */
        "src"?: string;
        /**
          * Form submit value
         */
        "value": string;
        /**
          * Show the item
         */
        "visible": boolean;
    }
    interface DatacomRadio {
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
        "disabled": boolean;
        "form": string;
        "formaction": string;
        "formenctype": string;
        "formmethod": string;
        "formnovalidate"?: boolean;
        "formtarget": string;
        "icon": string;
        "imagePosition": ImagePosition;
        "label": string;
        /**
          * Custom error message if control is invalid
         */
        "message": string;
        "name": string;
        "readonly"?: boolean;
        "required": boolean;
        /**
          * control use for radio button group
         */
        "setGrouped": (grouped: boolean) => Promise<boolean>;
        "size": RadioSize;
        "src": string;
        "type": string;
        /**
          * Force validation on the field. If validation fails then show error message.
         */
        "validate": () => Promise<boolean>;
        "value": string;
        "variant": RadioVariant;
    }
    interface DatacomRadioGroup {
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
    interface DatacomTextarea {
        /**
          * Automatically show error state if invalid on form submit
         */
        "autoValidate"?: boolean;
        "autocorrect": boolean;
        /**
          * Check if the control is valid
         */
        "checkValidity": () => Promise<boolean>;
        "cols": number;
        "disabled"?: boolean;
        /**
          * Sets edit state for element
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
        "inputAutofocus"?: boolean;
        "isValid"?: boolean;
        "label"?: string;
        "maxlength"?: number;
        /**
          * Error message to display in the case of validity checks or explicitly with 'valid' property
         */
        "message"?: string;
        "minlength"?: number;
        /**
          * HTML element textarea properties
         */
        "name": string;
        "placeholder"?: string;
        "readonly"?: boolean;
        "required"?: boolean;
        "rows": number;
        /**
          * Force validation on the form control to display any error messages
          * @returns boolean
         */
        "validate": () => Promise<boolean>;
        "value": string;
    }
    interface DatacomToggle {
        /**
          * True if the toggle element must be disabled
         */
        "disabled": boolean;
        /**
          * Label of the toggle element
         */
        "label": string;
        /**
          * Sets whether the label is rendered on the left or right (default) of the toggle element
         */
        "labelPosition": LabelPositionType;
        /**
          * Name attribute of the toggle element
         */
        "name": string;
        /**
          * True if the toggle element is initially toggled on.
         */
        "toggled": boolean;
        /**
          * Toggle element is either standard size (default) or small
         */
        "variant": ToggleSizeType;
    }
}
export interface DatacomAccordionCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDatacomAccordionElement;
}
export interface DatacomCheckboxCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDatacomCheckboxElement;
}
export interface DatacomInputCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDatacomInputElement;
}
export interface DatacomOptionCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDatacomOptionElement;
}
export interface DatacomRadioCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDatacomRadioElement;
}
export interface DatacomTextareaCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDatacomTextareaElement;
}
export interface DatacomToggleCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDatacomToggleElement;
}
declare global {
    interface HTMLDatacomAccordionElement extends Components.DatacomAccordion, HTMLStencilElement {
    }
    var HTMLDatacomAccordionElement: {
        prototype: HTMLDatacomAccordionElement;
        new (): HTMLDatacomAccordionElement;
    };
    interface HTMLDatacomAccordionGroupElement extends Components.DatacomAccordionGroup, HTMLStencilElement {
    }
    var HTMLDatacomAccordionGroupElement: {
        prototype: HTMLDatacomAccordionGroupElement;
        new (): HTMLDatacomAccordionGroupElement;
    };
    interface HTMLDatacomBreadcrumbElement extends Components.DatacomBreadcrumb, HTMLStencilElement {
    }
    var HTMLDatacomBreadcrumbElement: {
        prototype: HTMLDatacomBreadcrumbElement;
        new (): HTMLDatacomBreadcrumbElement;
    };
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
    interface HTMLDatacomContentTagElement extends Components.DatacomContentTag, HTMLStencilElement {
    }
    var HTMLDatacomContentTagElement: {
        prototype: HTMLDatacomContentTagElement;
        new (): HTMLDatacomContentTagElement;
    };
    interface HTMLDatacomDropdownElement extends Components.DatacomDropdown, HTMLStencilElement {
    }
    var HTMLDatacomDropdownElement: {
        prototype: HTMLDatacomDropdownElement;
        new (): HTMLDatacomDropdownElement;
    };
    interface HTMLDatacomInputElement extends Components.DatacomInput, HTMLStencilElement {
    }
    var HTMLDatacomInputElement: {
        prototype: HTMLDatacomInputElement;
        new (): HTMLDatacomInputElement;
    };
    interface HTMLDatacomLiElement extends Components.DatacomLi, HTMLStencilElement {
    }
    var HTMLDatacomLiElement: {
        prototype: HTMLDatacomLiElement;
        new (): HTMLDatacomLiElement;
    };
    interface HTMLDatacomListElement extends Components.DatacomList, HTMLStencilElement {
    }
    var HTMLDatacomListElement: {
        prototype: HTMLDatacomListElement;
        new (): HTMLDatacomListElement;
    };
    interface HTMLDatacomMenubarElement extends Components.DatacomMenubar, HTMLStencilElement {
    }
    var HTMLDatacomMenubarElement: {
        prototype: HTMLDatacomMenubarElement;
        new (): HTMLDatacomMenubarElement;
    };
    interface HTMLDatacomOptionElement extends Components.DatacomOption, HTMLStencilElement {
    }
    var HTMLDatacomOptionElement: {
        prototype: HTMLDatacomOptionElement;
        new (): HTMLDatacomOptionElement;
    };
    interface HTMLDatacomRadioElement extends Components.DatacomRadio, HTMLStencilElement {
    }
    var HTMLDatacomRadioElement: {
        prototype: HTMLDatacomRadioElement;
        new (): HTMLDatacomRadioElement;
    };
    interface HTMLDatacomRadioGroupElement extends Components.DatacomRadioGroup, HTMLStencilElement {
    }
    var HTMLDatacomRadioGroupElement: {
        prototype: HTMLDatacomRadioGroupElement;
        new (): HTMLDatacomRadioGroupElement;
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
    interface HTMLDatacomTextareaElement extends Components.DatacomTextarea, HTMLStencilElement {
    }
    var HTMLDatacomTextareaElement: {
        prototype: HTMLDatacomTextareaElement;
        new (): HTMLDatacomTextareaElement;
    };
    interface HTMLDatacomToggleElement extends Components.DatacomToggle, HTMLStencilElement {
    }
    var HTMLDatacomToggleElement: {
        prototype: HTMLDatacomToggleElement;
        new (): HTMLDatacomToggleElement;
    };
    interface HTMLElementTagNameMap {
        "datacom-accordion": HTMLDatacomAccordionElement;
        "datacom-accordion-group": HTMLDatacomAccordionGroupElement;
        "datacom-breadcrumb": HTMLDatacomBreadcrumbElement;
        "datacom-button": HTMLDatacomButtonElement;
        "datacom-checkbox": HTMLDatacomCheckboxElement;
        "datacom-checkbox-group": HTMLDatacomCheckboxGroupElement;
        "datacom-content-tag": HTMLDatacomContentTagElement;
        "datacom-dropdown": HTMLDatacomDropdownElement;
        "datacom-input": HTMLDatacomInputElement;
        "datacom-li": HTMLDatacomLiElement;
        "datacom-list": HTMLDatacomListElement;
        "datacom-menubar": HTMLDatacomMenubarElement;
        "datacom-option": HTMLDatacomOptionElement;
        "datacom-radio": HTMLDatacomRadioElement;
        "datacom-radio-group": HTMLDatacomRadioGroupElement;
        "datacom-tab": HTMLDatacomTabElement;
        "datacom-tabgroup": HTMLDatacomTabgroupElement;
        "datacom-textarea": HTMLDatacomTextareaElement;
        "datacom-toggle": HTMLDatacomToggleElement;
    }
}
declare namespace LocalJSX {
    interface DatacomAccordion {
        "disabled"?: boolean;
        "expanded"?: boolean;
        "index"?: number;
        "label"?: string;
        "onItemClicked"?: (event: DatacomAccordionCustomEvent<number>) => void;
    }
    interface DatacomAccordionGroup {
        "allowMultiExpand"?: boolean;
    }
    interface DatacomBreadcrumb {
        "text"?: string;
        "url"?: string;
    }
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
          * Show control in indeterminate state (dash)
         */
        "indeterminate"?: boolean;
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
        "value"?: string;
        /**
          * Checkbox is either standard size (default) or small
         */
        "variant"?: CheckboxSizeType;
    }
    interface DatacomCheckboxGroup {
    }
    interface DatacomContentTag {
        "solid"?: boolean;
        "variant"?: ContentTagVariant;
    }
    interface DatacomDropdown {
        /**
          * Automatically show error state if invalid on form submit
         */
        "autoValidate"?: boolean;
        "disabled"?: boolean;
        "form"?: string;
        /**
          * Optional help text
         */
        "help"?: string;
        "isValid"?: boolean;
        /**
          * Control label
         */
        "label"?: string;
        /**
          * Error message to display in the case of input validity checks or explicitly with 'valid' property
         */
        "message"?: string;
        /**
          * HTML element input properties
         */
        "name"?: string;
        "placeholder"?: string;
        "readonly"?: boolean;
        "required"?: boolean;
        /**
          * Enable type ahead search for options.
         */
        "search"?: boolean;
        /**
          * Drop down size
         */
        "size"?: DropdownSize;
        "title"?: string;
        "value"?: string;
        /**
          * Drop down variant
         */
        "variant"?: DatacomDropDownVariantType;
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
    interface DatacomLi {
        /**
          * Heading  for list inside of paragraph.
         */
        "heading"?: false;
    }
    interface DatacomList {
        /**
          * type used for ordered list style.
         */
        "type"?: TypeList;
        "variant"?: ListVariant;
    }
    interface DatacomMenubar {
    }
    interface DatacomOption {
        /**
          * Icon name
         */
        "icon"?: string;
        /**
          * Option id
         */
        "index"?: number;
        /**
          * Display label
         */
        "label"?: string;
        /**
          * Display type (mostly private) - list = display as item in drop down list (default) - standalone = display a standalone item outside of the list.
         */
        "mode"?: DropdownOptionMode;
        "onDeselected"?: (event: DatacomOptionCustomEvent<number>) => void;
        "onSelected"?: (event: DatacomOptionCustomEvent<number>) => void;
        /**
          * Text for use in option search
         */
        "search"?: string;
        /**
          * True if the option is selected
         */
        "selected"?: boolean;
        /**
          * Icon source
         */
        "src"?: string;
        /**
          * Form submit value
         */
        "value"?: string;
        /**
          * Show the item
         */
        "visible"?: boolean;
    }
    interface DatacomRadio {
        /**
          * Auto-validate and display error message on form submit
         */
        "autoValidate"?: boolean;
        "autocomplete"?: boolean;
        "autofocus"?: boolean;
        "checked"?: boolean;
        "disabled"?: boolean;
        "form"?: string;
        "formaction"?: string;
        "formenctype"?: string;
        "formmethod"?: string;
        "formnovalidate"?: boolean;
        "formtarget"?: string;
        "icon"?: string;
        "imagePosition"?: ImagePosition;
        "label"?: string;
        /**
          * Custom error message if control is invalid
         */
        "message"?: string;
        "name"?: string;
        "onChanged"?: (event: DatacomRadioCustomEvent<number>) => void;
        "readonly"?: boolean;
        "required"?: boolean;
        "size"?: RadioSize;
        "src"?: string;
        "type"?: string;
        "value"?: string;
        "variant"?: RadioVariant;
    }
    interface DatacomRadioGroup {
    }
    interface DatacomTab {
        "disabled"?: boolean;
        "label"?: string;
        "selected"?: boolean;
    }
    interface DatacomTabgroup {
    }
    interface DatacomTextarea {
        /**
          * Automatically show error state if invalid on form submit
         */
        "autoValidate"?: boolean;
        "autocorrect"?: boolean;
        "cols"?: number;
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
        "inputAutofocus"?: boolean;
        "isValid"?: boolean;
        "label"?: string;
        "maxlength"?: number;
        /**
          * Error message to display in the case of validity checks or explicitly with 'valid' property
         */
        "message"?: string;
        "minlength"?: number;
        /**
          * HTML element textarea properties
         */
        "name"?: string;
        "onChanged"?: (event: DatacomTextareaCustomEvent<string>) => void;
        "placeholder"?: string;
        "readonly"?: boolean;
        "required"?: boolean;
        "rows"?: number;
        "value"?: string;
    }
    interface DatacomToggle {
        /**
          * True if the toggle element must be disabled
         */
        "disabled"?: boolean;
        /**
          * Label of the toggle element
         */
        "label"?: string;
        /**
          * Sets whether the label is rendered on the left or right (default) of the toggle element
         */
        "labelPosition"?: LabelPositionType;
        /**
          * Name attribute of the toggle element
         */
        "name"?: string;
        /**
          * Event emitter to let external components know when the toggle element state has changed
         */
        "onToggleChanged"?: (event: DatacomToggleCustomEvent<boolean>) => void;
        /**
          * True if the toggle element is initially toggled on.
         */
        "toggled"?: boolean;
        /**
          * Toggle element is either standard size (default) or small
         */
        "variant"?: ToggleSizeType;
    }
    interface IntrinsicElements {
        "datacom-accordion": DatacomAccordion;
        "datacom-accordion-group": DatacomAccordionGroup;
        "datacom-breadcrumb": DatacomBreadcrumb;
        "datacom-button": DatacomButton;
        "datacom-checkbox": DatacomCheckbox;
        "datacom-checkbox-group": DatacomCheckboxGroup;
        "datacom-content-tag": DatacomContentTag;
        "datacom-dropdown": DatacomDropdown;
        "datacom-input": DatacomInput;
        "datacom-li": DatacomLi;
        "datacom-list": DatacomList;
        "datacom-menubar": DatacomMenubar;
        "datacom-option": DatacomOption;
        "datacom-radio": DatacomRadio;
        "datacom-radio-group": DatacomRadioGroup;
        "datacom-tab": DatacomTab;
        "datacom-tabgroup": DatacomTabgroup;
        "datacom-textarea": DatacomTextarea;
        "datacom-toggle": DatacomToggle;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "datacom-accordion": LocalJSX.DatacomAccordion & JSXBase.HTMLAttributes<HTMLDatacomAccordionElement>;
            "datacom-accordion-group": LocalJSX.DatacomAccordionGroup & JSXBase.HTMLAttributes<HTMLDatacomAccordionGroupElement>;
            "datacom-breadcrumb": LocalJSX.DatacomBreadcrumb & JSXBase.HTMLAttributes<HTMLDatacomBreadcrumbElement>;
            "datacom-button": LocalJSX.DatacomButton & JSXBase.HTMLAttributes<HTMLDatacomButtonElement>;
            "datacom-checkbox": LocalJSX.DatacomCheckbox & JSXBase.HTMLAttributes<HTMLDatacomCheckboxElement>;
            "datacom-checkbox-group": LocalJSX.DatacomCheckboxGroup & JSXBase.HTMLAttributes<HTMLDatacomCheckboxGroupElement>;
            "datacom-content-tag": LocalJSX.DatacomContentTag & JSXBase.HTMLAttributes<HTMLDatacomContentTagElement>;
            "datacom-dropdown": LocalJSX.DatacomDropdown & JSXBase.HTMLAttributes<HTMLDatacomDropdownElement>;
            "datacom-input": LocalJSX.DatacomInput & JSXBase.HTMLAttributes<HTMLDatacomInputElement>;
            "datacom-li": LocalJSX.DatacomLi & JSXBase.HTMLAttributes<HTMLDatacomLiElement>;
            "datacom-list": LocalJSX.DatacomList & JSXBase.HTMLAttributes<HTMLDatacomListElement>;
            "datacom-menubar": LocalJSX.DatacomMenubar & JSXBase.HTMLAttributes<HTMLDatacomMenubarElement>;
            "datacom-option": LocalJSX.DatacomOption & JSXBase.HTMLAttributes<HTMLDatacomOptionElement>;
            "datacom-radio": LocalJSX.DatacomRadio & JSXBase.HTMLAttributes<HTMLDatacomRadioElement>;
            "datacom-radio-group": LocalJSX.DatacomRadioGroup & JSXBase.HTMLAttributes<HTMLDatacomRadioGroupElement>;
            "datacom-tab": LocalJSX.DatacomTab & JSXBase.HTMLAttributes<HTMLDatacomTabElement>;
            "datacom-tabgroup": LocalJSX.DatacomTabgroup & JSXBase.HTMLAttributes<HTMLDatacomTabgroupElement>;
            "datacom-textarea": LocalJSX.DatacomTextarea & JSXBase.HTMLAttributes<HTMLDatacomTextareaElement>;
            "datacom-toggle": LocalJSX.DatacomToggle & JSXBase.HTMLAttributes<HTMLDatacomToggleElement>;
        }
    }
}
