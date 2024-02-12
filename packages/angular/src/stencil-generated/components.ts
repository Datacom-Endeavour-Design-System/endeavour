/* tslint:disable */
/* auto-generated angular directive proxies */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  NgZone,
} from '@angular/core';

import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import type { Components } from '@datacom/endeavour';

import { defineCustomElement as defineDatacomAccordion } from '@datacom/endeavour/dist/components/datacom-accordion.js';
import { defineCustomElement as defineDatacomAccordionGroup } from '@datacom/endeavour/dist/components/datacom-accordion-group.js';
import { defineCustomElement as defineDatacomAvatar } from '@datacom/endeavour/dist/components/datacom-avatar.js';
import { defineCustomElement as defineDatacomBreadcrumb } from '@datacom/endeavour/dist/components/datacom-breadcrumb.js';
import { defineCustomElement as defineDatacomButton } from '@datacom/endeavour/dist/components/datacom-button.js';
import { defineCustomElement as defineDatacomCardGroup } from '@datacom/endeavour/dist/components/datacom-card-group.js';
import { defineCustomElement as defineDatacomCheckbox } from '@datacom/endeavour/dist/components/datacom-checkbox.js';
import { defineCustomElement as defineDatacomCheckboxGroup } from '@datacom/endeavour/dist/components/datacom-checkbox-group.js';
import { defineCustomElement as defineDatacomContentCard } from '@datacom/endeavour/dist/components/datacom-content-card.js';
import { defineCustomElement as defineDatacomContentTag } from '@datacom/endeavour/dist/components/datacom-content-tag.js';
import { defineCustomElement as defineDatacomDisplayCard } from '@datacom/endeavour/dist/components/datacom-display-card.js';
import { defineCustomElement as defineDatacomDisplayCardGroup } from '@datacom/endeavour/dist/components/datacom-display-card-group.js';
import { defineCustomElement as defineDatacomDropdown } from '@datacom/endeavour/dist/components/datacom-dropdown.js';
import { defineCustomElement as defineDatacomFeatureHighlight } from '@datacom/endeavour/dist/components/datacom-feature-highlight.js';
import { defineCustomElement as defineDatacomFeatureHighlightGroup } from '@datacom/endeavour/dist/components/datacom-feature-highlight-group.js';
import { defineCustomElement as defineDatacomIcon } from '@datacom/endeavour/dist/components/datacom-icon.js';
import { defineCustomElement as defineDatacomInput } from '@datacom/endeavour/dist/components/datacom-input.js';
import { defineCustomElement as defineDatacomLi } from '@datacom/endeavour/dist/components/datacom-li.js';
import { defineCustomElement as defineDatacomLink } from '@datacom/endeavour/dist/components/datacom-link.js';
import { defineCustomElement as defineDatacomList } from '@datacom/endeavour/dist/components/datacom-list.js';
import { defineCustomElement as defineDatacomLoader } from '@datacom/endeavour/dist/components/datacom-loader.js';
import { defineCustomElement as defineDatacomMenubar } from '@datacom/endeavour/dist/components/datacom-menubar.js';
import { defineCustomElement as defineDatacomNumberInput } from '@datacom/endeavour/dist/components/datacom-number-input.js';
import { defineCustomElement as defineDatacomOption } from '@datacom/endeavour/dist/components/datacom-option.js';
import { defineCustomElement as defineDatacomProductCard } from '@datacom/endeavour/dist/components/datacom-product-card.js';
import { defineCustomElement as defineDatacomRadio } from '@datacom/endeavour/dist/components/datacom-radio.js';
import { defineCustomElement as defineDatacomRadioGroup } from '@datacom/endeavour/dist/components/datacom-radio-group.js';
import { defineCustomElement as defineDatacomRating } from '@datacom/endeavour/dist/components/datacom-rating.js';
import { defineCustomElement as defineDatacomScrollButton } from '@datacom/endeavour/dist/components/datacom-scroll-button.js';
import { defineCustomElement as defineDatacomSelectionCard } from '@datacom/endeavour/dist/components/datacom-selection-card.js';
import { defineCustomElement as defineDatacomTab } from '@datacom/endeavour/dist/components/datacom-tab.js';
import { defineCustomElement as defineDatacomTabgroup } from '@datacom/endeavour/dist/components/datacom-tabgroup.js';
import { defineCustomElement as defineDatacomTextarea } from '@datacom/endeavour/dist/components/datacom-textarea.js';
import { defineCustomElement as defineDatacomToggle } from '@datacom/endeavour/dist/components/datacom-toggle.js';
import { defineCustomElement as defineDatacomTooltip } from '@datacom/endeavour/dist/components/datacom-tooltip.js';
@ProxyCmp({
  defineCustomElementFn: defineDatacomAccordion,
  inputs: ['disabled', 'expanded', 'index', 'label'],
  methods: ['isExpanded', 'setExpanded'],
})
@Component({
  selector: 'datacom-accordion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'expanded', 'index', 'label'],
  standalone: true,
})
export class DatacomAccordion {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['itemClicked']);
  }
}

export declare interface DatacomAccordion extends Components.DatacomAccordion {
  itemClicked: EventEmitter<CustomEvent<number>>;
}

@ProxyCmp({
  defineCustomElementFn: defineDatacomAccordionGroup,
  inputs: ['allowMultiExpand'],
})
@Component({
  selector: 'datacom-accordion-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['allowMultiExpand'],
  standalone: true,
})
export class DatacomAccordionGroup {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface DatacomAccordionGroup
  extends Components.DatacomAccordionGroup {}

@ProxyCmp({
  defineCustomElementFn: defineDatacomAvatar,
  inputs: [
    'alt',
    'companyName',
    'firstName',
    'jobTitle',
    'lastName',
    'src',
    'url',
  ],
})
@Component({
  selector: 'datacom-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'alt',
    'companyName',
    'firstName',
    'jobTitle',
    'lastName',
    'src',
    'url',
  ],
  standalone: true,
})
export class DatacomAvatar {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface DatacomAvatar extends Components.DatacomAvatar {}

@ProxyCmp({
  defineCustomElementFn: defineDatacomBreadcrumb,
  inputs: ['separator', 'url'],
})
@Component({
  selector: 'datacom-breadcrumb',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['separator', 'url'],
  standalone: true,
})
export class DatacomBreadcrumb {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface DatacomBreadcrumb
  extends Components.DatacomBreadcrumb {}

@ProxyCmp({
  defineCustomElementFn: defineDatacomButton,
  inputs: [
    'autofocus',
    'disabled',
    'form',
    'formaction',
    'formenctype',
    'formmethod',
    'formtarget',
    'icon',
    'iconPosition',
    'loading',
    'name',
    'size',
    'src',
    'text',
    'type',
    'url',
    'value',
    'variant',
  ],
})
@Component({
  selector: 'datacom-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'autofocus',
    'disabled',
    'form',
    'formaction',
    'formenctype',
    'formmethod',
    'formtarget',
    'icon',
    'iconPosition',
    'loading',
    'name',
    'size',
    'src',
    'text',
    'type',
    'url',
    'value',
    'variant',
  ],
  standalone: true,
})
export class DatacomButton {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface DatacomButton extends Components.DatacomButton {}

@ProxyCmp({
  defineCustomElementFn: defineDatacomCardGroup,
  inputs: ['itemsPerRow'],
})
@Component({
  selector: 'datacom-card-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['itemsPerRow'],
  standalone: true,
})
export class DatacomCardGroup {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface DatacomCardGroup extends Components.DatacomCardGroup {}

@ProxyCmp({
  defineCustomElementFn: defineDatacomCheckbox,
  inputs: [
    'autoValidate',
    'autocomplete',
    'autofocus',
    'checked',
    'child',
    'disabled',
    'form',
    'formaction',
    'formenctype',
    'formmethod',
    'formnovalidate',
    'formtarget',
    'grouped',
    'indeterminate',
    'index',
    'label',
    'message',
    'name',
    'readonly',
    'required',
    'value',
    'variant',
  ],
  methods: ['validate', 'checkValidity'],
})
@Component({
  selector: 'datacom-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'autoValidate',
    'autocomplete',
    'autofocus',
    'checked',
    'child',
    'disabled',
    'form',
    'formaction',
    'formenctype',
    'formmethod',
    'formnovalidate',
    'formtarget',
    'grouped',
    'indeterminate',
    'index',
    'label',
    'message',
    'name',
    'readonly',
    'required',
    'value',
    'variant',
  ],
  standalone: true,
})
export class DatacomCheckbox {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['changed']);
  }
}

export declare interface DatacomCheckbox extends Components.DatacomCheckbox {
  /**
   * Emit a changed event with the index number if the control changes state
   */
  changed: EventEmitter<CustomEvent<number>>;
}

@ProxyCmp({
  defineCustomElementFn: defineDatacomCheckboxGroup,
})
@Component({
  selector: 'datacom-checkbox-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
  standalone: true,
})
export class DatacomCheckboxGroup {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface DatacomCheckboxGroup
  extends Components.DatacomCheckboxGroup {}

@ProxyCmp({
  defineCustomElementFn: defineDatacomContentCard,
  inputs: ['cardTitle', 'ctaText', 'date', 'icon', 'imageUrl', 'url'],
})
@Component({
  selector: 'datacom-content-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['cardTitle', 'ctaText', 'date', 'icon', 'imageUrl', 'url'],
  standalone: true,
})
export class DatacomContentCard {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['actionIconClicked']);
  }
}

export declare interface DatacomContentCard
  extends Components.DatacomContentCard {
  actionIconClicked: EventEmitter<CustomEvent<string>>;
}

@ProxyCmp({
  defineCustomElementFn: defineDatacomContentTag,
  inputs: ['url', 'variant'],
})
@Component({
  selector: 'datacom-content-tag',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['url', 'variant'],
  standalone: true,
})
export class DatacomContentTag {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface DatacomContentTag
  extends Components.DatacomContentTag {}

@ProxyCmp({
  defineCustomElementFn: defineDatacomDisplayCard,
  inputs: ['ctaText', 'heading', 'imageUrl', 'url'],
})
@Component({
  selector: 'datacom-display-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['ctaText', 'heading', 'imageUrl', 'url'],
  standalone: true,
})
export class DatacomDisplayCard {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface DatacomDisplayCard
  extends Components.DatacomDisplayCard {}

@ProxyCmp({
  defineCustomElementFn: defineDatacomDisplayCardGroup,
})
@Component({
  selector: 'datacom-display-card-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
  standalone: true,
})
export class DatacomDisplayCardGroup {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface DatacomDisplayCardGroup
  extends Components.DatacomDisplayCardGroup {}

@ProxyCmp({
  defineCustomElementFn: defineDatacomDropdown,
  inputs: [
    'autoValidate',
    'disabled',
    'form',
    'help',
    'isValid',
    'label',
    'message',
    'name',
    'placeholder',
    'readonly',
    'required',
    'title',
    'value',
    'variant',
  ],
  methods: ['getSelected', 'validate', 'checkValidity'],
})
@Component({
  selector: 'datacom-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'autoValidate',
    'disabled',
    'form',
    'help',
    'isValid',
    'label',
    'message',
    'name',
    'placeholder',
    'readonly',
    'required',
    'title',
    'value',
    'variant',
  ],
  standalone: true,
})
export class DatacomDropdown {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['changed']);
  }
}

export declare interface DatacomDropdown extends Components.DatacomDropdown {
  /**
   * Event for when select option has been changed
   */
  changed: EventEmitter<CustomEvent<string[]>>;
}

@ProxyCmp({
  defineCustomElementFn: defineDatacomFeatureHighlight,
  inputs: ['ctaText', 'featureTitle', 'icon', 'imageUrl', 'url'],
})
@Component({
  selector: 'datacom-feature-highlight',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['ctaText', 'featureTitle', 'icon', 'imageUrl', 'url'],
  standalone: true,
})
export class DatacomFeatureHighlight {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface DatacomFeatureHighlight
  extends Components.DatacomFeatureHighlight {}

@ProxyCmp({
  defineCustomElementFn: defineDatacomFeatureHighlightGroup,
  inputs: ['itemsPerRow'],
})
@Component({
  selector: 'datacom-feature-highlight-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['itemsPerRow'],
  standalone: true,
})
export class DatacomFeatureHighlightGroup {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface DatacomFeatureHighlightGroup
  extends Components.DatacomFeatureHighlightGroup {}

@ProxyCmp({
  defineCustomElementFn: defineDatacomIcon,
  inputs: ['icon'],
})
@Component({
  selector: 'datacom-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['icon'],
  standalone: true,
})
export class DatacomIcon {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface DatacomIcon extends Components.DatacomIcon {}

@ProxyCmp({
  defineCustomElementFn: defineDatacomInput,
  inputs: [
    'autoValidate',
    'disabled',
    'form',
    'formaction',
    'formenctype',
    'formmethod',
    'formnovalidate',
    'formtarget',
    'help',
    'indicator',
    'inputmode',
    'isValid',
    'label',
    'max',
    'maxlength',
    'message',
    'min',
    'minlength',
    'name',
    'pattern',
    'placeholder',
    'readonly',
    'required',
    'size',
    'step',
    'title',
    'type',
    'value',
  ],
  methods: ['validate', 'checkValidity', 'edit'],
})
@Component({
  selector: 'datacom-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'autoValidate',
    'disabled',
    'form',
    'formaction',
    'formenctype',
    'formmethod',
    'formnovalidate',
    'formtarget',
    'help',
    'indicator',
    'inputmode',
    'isValid',
    'label',
    'max',
    'maxlength',
    'message',
    'min',
    'minlength',
    'name',
    'pattern',
    'placeholder',
    'readonly',
    'required',
    'size',
    'step',
    'title',
    'type',
    'value',
  ],
  standalone: true,
})
export class DatacomInput {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['changed']);
  }
}

export declare interface DatacomInput extends Components.DatacomInput {
  /**
   * Emit changed event when input changes. This relays up the 'input' event, but with
the control's current value rather than the input value.
   */
  changed: EventEmitter<CustomEvent<string>>;
}

@ProxyCmp({
  defineCustomElementFn: defineDatacomLi,
  inputs: ['heading'],
})
@Component({
  selector: 'datacom-li',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['heading'],
  standalone: true,
})
export class DatacomLi {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface DatacomLi extends Components.DatacomLi {}

@ProxyCmp({
  defineCustomElementFn: defineDatacomLink,
  inputs: ['disabled', 'icon', 'iconPosition', 'url', 'variant'],
})
@Component({
  selector: 'datacom-link',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'icon', 'iconPosition', 'url', 'variant'],
  standalone: true,
})
export class DatacomLink {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface DatacomLink extends Components.DatacomLink {}

@ProxyCmp({
  defineCustomElementFn: defineDatacomList,
  inputs: ['type', 'variant'],
})
@Component({
  selector: 'datacom-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['type', 'variant'],
  standalone: true,
})
export class DatacomList {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface DatacomList extends Components.DatacomList {}

@ProxyCmp({
  defineCustomElementFn: defineDatacomLoader,
  inputs: ['loadingStatus', 'size'],
})
@Component({
  selector: 'datacom-loader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['loadingStatus', 'size'],
  standalone: true,
})
export class DatacomLoader {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface DatacomLoader extends Components.DatacomLoader {}

@ProxyCmp({
  defineCustomElementFn: defineDatacomMenubar,
})
@Component({
  selector: 'datacom-menubar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
  standalone: true,
})
export class DatacomMenubar {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface DatacomMenubar extends Components.DatacomMenubar {}

@ProxyCmp({
  defineCustomElementFn: defineDatacomNumberInput,
  inputs: [
    'disabled',
    'help',
    'label',
    'max',
    'message',
    'min',
    'name',
    'numberTitle',
    'placeholder',
    'readonly',
    'required',
    'step',
    'value',
  ],
})
@Component({
  selector: 'datacom-number-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'disabled',
    'help',
    'label',
    'max',
    'message',
    'min',
    'name',
    'numberTitle',
    'placeholder',
    'readonly',
    'required',
    'step',
    'value',
  ],
  standalone: true,
})
export class DatacomNumberInput {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['valueChanged']);
  }
}

export declare interface DatacomNumberInput
  extends Components.DatacomNumberInput {
  /**
   * Emit valueChanged event when number input changes.
   */
  valueChanged: EventEmitter<CustomEvent<number>>;
}

@ProxyCmp({
  defineCustomElementFn: defineDatacomOption,
  inputs: [
    'icon',
    'index',
    'label',
    'mode',
    'search',
    'selected',
    'src',
    'value',
    'visible',
  ],
})
@Component({
  selector: 'datacom-option',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'icon',
    'index',
    'label',
    'mode',
    'search',
    'selected',
    'src',
    'value',
    'visible',
  ],
  standalone: true,
})
export class DatacomOption {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['select', 'deselect']);
  }
}

export declare interface DatacomOption extends Components.DatacomOption {
  select: EventEmitter<CustomEvent<number>>;

  deselect: EventEmitter<CustomEvent<number>>;
}

@ProxyCmp({
  defineCustomElementFn: defineDatacomProductCard,
  inputs: [
    'hideAddToCart',
    'hideProductCompare',
    'hideQuickView',
    'imageUrl',
    'price',
    'productTitle',
    'promoPrice',
    'ratingLabel',
    'ratingValue',
    'stockStatus',
    'url',
  ],
})
@Component({
  selector: 'datacom-product-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'hideAddToCart',
    'hideProductCompare',
    'hideQuickView',
    'imageUrl',
    'price',
    'productTitle',
    'promoPrice',
    'ratingLabel',
    'ratingValue',
    'stockStatus',
    'url',
  ],
  standalone: true,
})
export class DatacomProductCard {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, [
      'addToCartClicked',
      'quickViewClicked',
      'productCompareClicked',
    ]);
  }
}

export declare interface DatacomProductCard
  extends Components.DatacomProductCard {
  addToCartClicked: EventEmitter<CustomEvent<any>>;

  quickViewClicked: EventEmitter<CustomEvent<any>>;

  productCompareClicked: EventEmitter<CustomEvent<any>>;
}

@ProxyCmp({
  defineCustomElementFn: defineDatacomRadio,
  inputs: [
    'autoValidate',
    'autocomplete',
    'autofocus',
    'checked',
    'disabled',
    'form',
    'formaction',
    'formenctype',
    'formmethod',
    'formnovalidate',
    'formtarget',
    'icon',
    'iconPosition',
    'label',
    'message',
    'name',
    'readonly',
    'required',
    'size',
    'src',
    'type',
    'value',
    'variant',
  ],
  methods: ['setGrouped', 'validate', 'checkValidity'],
})
@Component({
  selector: 'datacom-radio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'autoValidate',
    'autocomplete',
    'autofocus',
    'checked',
    'disabled',
    'form',
    'formaction',
    'formenctype',
    'formmethod',
    'formnovalidate',
    'formtarget',
    'icon',
    'iconPosition',
    'label',
    'message',
    'name',
    'readonly',
    'required',
    'size',
    'src',
    'type',
    'value',
    'variant',
  ],
  standalone: true,
})
export class DatacomRadio {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['selected']);
  }
}

export declare interface DatacomRadio extends Components.DatacomRadio {
  selected: EventEmitter<CustomEvent<string>>;
}

@ProxyCmp({
  defineCustomElementFn: defineDatacomRadioGroup,
})
@Component({
  selector: 'datacom-radio-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
  standalone: true,
})
export class DatacomRadioGroup {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface DatacomRadioGroup
  extends Components.DatacomRadioGroup {}

@ProxyCmp({
  defineCustomElementFn: defineDatacomRating,
  inputs: ['label', 'ratingValue', 'readonly', 'size'],
  methods: ['getSelectedRating'],
})
@Component({
  selector: 'datacom-rating',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['label', 'ratingValue', 'readonly', 'size'],
  standalone: true,
})
export class DatacomRating {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ratingChanged']);
  }
}

export declare interface DatacomRating extends Components.DatacomRating {
  ratingChanged: EventEmitter<CustomEvent<number>>;
}

@ProxyCmp({
  defineCustomElementFn: defineDatacomScrollButton,
  inputs: ['anchorId', 'btnTitle'],
})
@Component({
  selector: 'datacom-scroll-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['anchorId', 'btnTitle'],
  standalone: true,
})
export class DatacomScrollButton {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface DatacomScrollButton
  extends Components.DatacomScrollButton {}

@ProxyCmp({
  defineCustomElementFn: defineDatacomSelectionCard,
  inputs: ['cardTitle', 'ctaText', 'imageUrl'],
})
@Component({
  selector: 'datacom-selection-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['cardTitle', 'ctaText', 'imageUrl'],
  standalone: true,
})
export class DatacomSelectionCard {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['submitClicked']);
  }
}

export declare interface DatacomSelectionCard
  extends Components.DatacomSelectionCard {
  submitClicked: EventEmitter<CustomEvent<string>>;
}

@ProxyCmp({
  defineCustomElementFn: defineDatacomTab,
  inputs: ['disabled', 'label', 'selected'],
  methods: ['isSelected', 'setSelected'],
})
@Component({
  selector: 'datacom-tab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'label', 'selected'],
  standalone: true,
})
export class DatacomTab {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface DatacomTab extends Components.DatacomTab {}

@ProxyCmp({
  defineCustomElementFn: defineDatacomTabgroup,
  methods: ['select', 'selected', 'disableTab', 'enableTab'],
})
@Component({
  selector: 'datacom-tabgroup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
  standalone: true,
})
export class DatacomTabgroup {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface DatacomTabgroup extends Components.DatacomTabgroup {}

@ProxyCmp({
  defineCustomElementFn: defineDatacomTextarea,
  inputs: [
    'autoValidate',
    'autocorrect',
    'cols',
    'disabled',
    'form',
    'formaction',
    'formenctype',
    'formmethod',
    'formnovalidate',
    'formtarget',
    'help',
    'inputAutofocus',
    'isValid',
    'label',
    'maxlength',
    'message',
    'minlength',
    'name',
    'placeholder',
    'readonly',
    'required',
    'rows',
    'value',
  ],
  methods: ['validate', 'checkValidity', 'edit'],
})
@Component({
  selector: 'datacom-textarea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'autoValidate',
    'autocorrect',
    'cols',
    'disabled',
    'form',
    'formaction',
    'formenctype',
    'formmethod',
    'formnovalidate',
    'formtarget',
    'help',
    'inputAutofocus',
    'isValid',
    'label',
    'maxlength',
    'message',
    'minlength',
    'name',
    'placeholder',
    'readonly',
    'required',
    'rows',
    'value',
  ],
  standalone: true,
})
export class DatacomTextarea {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['changed']);
  }
}

export declare interface DatacomTextarea extends Components.DatacomTextarea {
  changed: EventEmitter<CustomEvent<string>>;
}

@ProxyCmp({
  defineCustomElementFn: defineDatacomToggle,
  inputs: ['disabled', 'label', 'labelPosition', 'name', 'toggled', 'variant'],
})
@Component({
  selector: 'datacom-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'label', 'labelPosition', 'name', 'toggled', 'variant'],
  standalone: true,
})
export class DatacomToggle {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['toggleChanged']);
  }
}

export declare interface DatacomToggle extends Components.DatacomToggle {
  /**
   * Event emitter to let external components know when the toggle element state has changed
   */
  toggleChanged: EventEmitter<CustomEvent<boolean>>;
}

@ProxyCmp({
  defineCustomElementFn: defineDatacomTooltip,
  inputs: ['dark', 'hideArrow', 'id', 'label', 'position', 'width'],
})
@Component({
  selector: 'datacom-tooltip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['dark', 'hideArrow', 'id', 'label', 'position', 'width'],
  standalone: true,
})
export class DatacomTooltip {
  protected el: HTMLElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface DatacomTooltip extends Components.DatacomTooltip {}
