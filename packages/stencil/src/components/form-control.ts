/**
 * Common interface for form controls
 */
export interface FormControl {
  /**
   * name within form
   */
  name?: string;

  /**
   * value submitted
   */
  value?: string;

  /**
   * Assitance text
   */
  help?: string;

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
   *
   * opts:
   * * withEdit - place the control in edit mode
   * * focus - focus edit on the field
   */
  validate(): Promise<boolean>;
}
