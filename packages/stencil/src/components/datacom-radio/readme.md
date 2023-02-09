# datacom-radio

<!-- Auto Generated Below -->


## Properties

| Property         | Attribute        | Description                                            | Type                    | Default      |
| ---------------- | ---------------- | ------------------------------------------------------ | ----------------------- | ------------ |
| `autoValidate`   | `auto-validate`  | Auto-validate and display error message on form submit | `boolean`               | `true`       |
| `autocomplete`   | `autocomplete`   |                                                        | `boolean`               | `undefined`  |
| `autofocus`      | `autofocus`      |                                                        | `boolean`               | `false`      |
| `checked`        | `checked`        |                                                        | `boolean`               | `false`      |
| `disabled`       | `disabled`       |                                                        | `boolean`               | `false`      |
| `form`           | `form`           |                                                        | `string`                | `undefined`  |
| `formaction`     | `formaction`     |                                                        | `string`                | `undefined`  |
| `formenctype`    | `formenctype`    |                                                        | `string`                | `undefined`  |
| `formmethod`     | `formmethod`     |                                                        | `string`                | `undefined`  |
| `formnovalidate` | `formnovalidate` |                                                        | `boolean`               | `false`      |
| `formtarget`     | `formtarget`     |                                                        | `string`                | `undefined`  |
| `icon`           | `icon`           |                                                        | `string`                | `undefined`  |
| `imagePosition`  | `image-position` |                                                        | `"left" \| "right"`     | `'left'`     |
| `label`          | `label`          |                                                        | `string`                | `undefined`  |
| `message`        | `message`        | Custom error message if control is invalid             | `string`                | `undefined`  |
| `name`           | `name`           |                                                        | `string`                | `undefined`  |
| `readonly`       | `readonly`       |                                                        | `boolean`               | `undefined`  |
| `required`       | `required`       |                                                        | `boolean`               | `false`      |
| `size`           | `size`           |                                                        | `"small" \| "standard"` | `'standard'` |
| `src`            | `src`            |                                                        | `string`                | `undefined`  |
| `type`           | `type`           |                                                        | `string`                | `'radio'`    |
| `value`          | `value`          |                                                        | `string`                | `undefined`  |
| `variant`        | `variant`        |                                                        | `"buttons" \| "radios"` | `'radios'`   |


## Events

| Event     | Description | Type                  |
| --------- | ----------- | --------------------- |
| `changed` |             | `CustomEvent<number>` |


## Methods

### `checkValidity() => Promise<boolean>`

Check if the control is valid

#### Returns

Type: `Promise<boolean>`



### `validate() => Promise<boolean>`

Check if control is valid (for form submit)

#### Returns

Type: `Promise<boolean>`

Promise of validity


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
