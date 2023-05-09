import { Component, Host, h, Prop, Element, Event, EventEmitter, State } from '@stencil/core';
import { getSvg } from '../../common/images';

export type PaginationEventDirection = 'FIRST' | 'PREVIOUS' | 'NEXT' | 'LAST';

/**
 *
 */
@Component({
  tag: 'datacom-pagination',
  styleUrl: 'datacom-pagination.css',
  shadow: true,
})
export class DatacomPagination {
  @Element() host: HTMLElement;

  @Prop() itemsPerPage?: number = 10;

  @Prop() totalItems?: number = 100;
  @Prop() disabled?: boolean;
  @Prop({ mutable: true }) startPage?: number;
  @State() currentPage?: number = 1;
  @Prop({ mutable: true }) totalPages?: number;
  @Prop({ mutable: true }) direction?: PaginationEventDirection = 'FIRST';
  @Event() changedPagination: EventEmitter;

  onClickFirstPageHandler = () => {
    this.startPage;
    console.warn(this.startPage, 'rr');
    this.currentPage = this.startPage;
    console.warn(this.currentPage, 'rr');
    this.changedPagination.emit(this.currentPage);
    console.warn(this.direction, 'rr');
  };

  onClickPerviousPageHandler = () => {
    this.currentPage = --this.currentPage;
    console.warn(this.currentPage, 'rr');
    this.changedPagination.emit(this.currentPage);
  };

  onClickNextPageHandler = () => {
    // this.goToPage(this.currentPage);
    this.currentPage = ++this.currentPage;
    console.warn(this.currentPage, 'rr');
    this.changedPagination.emit(this.currentPage);
    console.log('next');
    return;
  };

  onClickLastPageHandler = () => {
    this.totalPages;
    this.currentPage === this.totalPages;
    if (this.direction === 'LAST') {
      this.totalPages;
    }
    this.changedPagination.emit(this.currentPage);
  };

  render() {
    const start = this.currentPage;
    const isStart = start === 1;
    const end = Math.min(this.currentPage, this.totalPages);
    const isEnd = end === this.totalPages;

    return (
      <Host>
        <div class="dc-pagination-wrapper">
          <button type="button" class="dc-start-btn" onClick={this.onClickFirstPageHandler} disabled={isStart}>
            <span class="dc-icon-dir">
              {getSvg('remove', { class: 'dc-icon-line' })} {getSvg('drill-down', { class: 'dc-icon-first' })}
            </span>{' '}
          </button>
          <button type="button" class="dc-previous-btn" onClick={this.onClickPerviousPageHandler} disabled={isStart}>
            {getSvg('drill-down', { class: 'dc-icon-previous' })}
          </button>
          <span class="dc-current-page">{this.currentPage} </span> of <span class="dc-total-page">{this.totalPages}</span>
          <button type="button" class="dc-next-btn" onClick={this.onClickNextPageHandler} disabled={isEnd}>
            {' '}
            {getSvg('drill-down', { class: 'dc-icon-next' })}
          </button>
          <button type="button" class="dc-end-btn" onClick={this.onClickLastPageHandler} disabled={isEnd}>
            {getSvg('drill-down', { class: 'dc-icon-last' })}
            {getSvg('remove', { class: 'dc-icon-line' })}{' '}
          </button>
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomPagination = HTMLElement & DatacomPagination;
