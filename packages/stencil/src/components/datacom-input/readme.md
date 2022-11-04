# datacom-input

<!-- Auto Generated Below -->

## Overview

Datacom Input field

The control is scoped rather than shadow so the input field can participate in a form submit.

## Properties

| Property         | Attribute        | Description                                                                                       | Type                                                                                           | Default     |
| ---------------- | ---------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ----------- |
| `completed`      | `completed`      | Show completed tick                                                                               | `boolean`                                                                                      | `undefined` |
| `disabled`       | `disabled`       |                                                                                                   | `boolean`                                                                                      | `false`     |
| `form`           | `form`           |                                                                                                   | `string`                                                                                       | `undefined` |
| `formaction`     | `formaction`     |                                                                                                   | `string`                                                                                       | `undefined` |
| `formenctype`    | `formenctype`    |                                                                                                   | `string`                                                                                       | `undefined` |
| `formmethod`     | `formmethod`     |                                                                                                   | `string`                                                                                       | `undefined` |
| `formnovalidate` | `formnovalidate` |                                                                                                   | `boolean`                                                                                      | `false`     |
| `formtarget`     | `formtarget`     |                                                                                                   | `string`                                                                                       | `undefined` |
| `help`           | `help`           | Optional help text                                                                                | `string`                                                                                       | `undefined` |
| `indicator`      | `indicator`      | Feedback indicator                                                                                | `"done" \| "none" \| "working"`                                                                | `'none'`    |
| `inputmode`      | `inputmode`      |                                                                                                   | `string`                                                                                       | `undefined` |
| `isValid`        | `valid`          |                                                                                                   | `boolean`                                                                                      | `undefined` |
| `label`          | `label`          | Optional label for control. This can be omitted if the host element has a text children.          | `string`                                                                                       | `undefined` |
| `max`            | `max`            |                                                                                                   | `number`                                                                                       | `undefined` |
| `maxlength`      | `maxlength`      |                                                                                                   | `number`                                                                                       | `undefined` |
| `message`        | `message`        | Error message to display in the case of input validity checks or explicitly with 'valid' property | `string`                                                                                       | `undefined` |
| `min`            | `min`            |                                                                                                   | `number`                                                                                       | `undefined` |
| `minlength`      | `minlength`      |                                                                                                   | `number`                                                                                       | `undefined` |
| `name`           | `name`           | HTML element input properties                                                                     | `string`                                                                                       | `undefined` |
| `pattern`        | `pattern`        |                                                                                                   | `string`                                                                                       | `undefined` |
| `placeholder`    | `placeholder`    |                                                                                                   | `string`                                                                                       | `undefined` |
| `readonly`       | `readonly`       |                                                                                                   | `boolean`                                                                                      | `false`     |
| `required`       | `required`       |                                                                                                   | `boolean`                                                                                      | `false`     |
| `size`           | `size`           |                                                                                                   | `number`                                                                                       | `undefined` |
| `title`          | `title`          |                                                                                                   | `string`                                                                                       | `undefined` |
| `type`           | `type`           |                                                                                                   | `"email" \| "month" \| "number" \| "password" \| "tel" \| "text" \| "time" \| "url" \| "week"` | `'text'`    |
| `value`          | `value`          |                                                                                                   | `string`                                                                                       | `undefined` |

## Events

| Event     | Description                                                                                                                                | Type                  |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- |
| `changed` | Emit changed event when input changes. This relays up the 'input' event, but with the control's current value rather than the input value. | `CustomEvent<string>` |

---

_Built with [StencilJS](https://stenciljs.com/)_
