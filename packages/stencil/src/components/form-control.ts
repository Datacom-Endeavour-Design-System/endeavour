export interface HTMLFormControl {
  name?: string;
  value?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  form?: string;
  formaction?: string;
  formenctype?: string;
  formmethod?: string;
  formnovalidate?: boolean;
  formtarget?: string;
}

/**
 * Common interface for form controls
 */
export interface FormControl extends HTMLFormControl {
  /**
   * Validation error message
   */
  message?: string;

  /**
   * Automatically show field error message on control if invalid during form submit
   */
  autoValidate?: boolean;

  /**
   * Force validation on the field. If validation fails then show error message.
   */
  validate(): Promise<boolean>;

  /**
   * Check validity of the control
   */
  checkValidity(): Promise<boolean>;
}
