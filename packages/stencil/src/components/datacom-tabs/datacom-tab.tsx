import {
  Component,
  h,
  Prop,
  Method,
  Host,
  Watch,
  Event,
  EventEmitter,
} from '@stencil/core';

/**
 * The tab element describes the tab, but does not render the tab label.
 *
 * @see DatacomTabGroup
 */
@Component({
  tag: 'datacom-tab',
  styleUrl: 'datacom-tab.css',
  shadow: true,
})
export class DatacomTab {
  @Prop() label = 'Not Set';
  @Prop({ mutable: true }) disabled: boolean;
  @Prop({ mutable: true }) selected?: boolean;

  /**
   * Event to force re render tab group
   */
  @Event({ bubbles: true, composed: true }) forceReRenderTabGroup: EventEmitter;

  @Watch('label')
  @Watch('disabled')
  watchMultiplePropsHandler() {
    this.forceReRenderTabGroup.emit();
  }

  /**
   * Select this tab
   *
   * @param value
   */
  @Method()
  public async setSelected(value: boolean): Promise<void> {
    this.selected = value;
  }

  render() {
    return (
      <Host>
        <div
          class={{
            'tab-content': true,
            selected: this.selected,
          }}>
          <slot />
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomTabElement = HTMLElement & DatacomTab;
