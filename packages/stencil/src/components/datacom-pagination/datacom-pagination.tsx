import { Component, Host, h, Prop, Element, Event, EventEmitter, State } from '@stencil/core';
import { getSvg } from '../../common/images';

@Component({
  tag: 'datacom-pagination',
  styleUrl: 'datacom-pagination.css',
  shadow: true,
})
export class DatacomPagination {
  @Element() host: HTMLElement;

  @Prop({ mutable: true }) itemsPerPage?: number = 5;
  @Prop({ mutable: true }) totalItems?: number = 100;
  @Prop() disabled?: boolean;
  @State() currentPage?: number = 1;

  @Event() changedPagination: EventEmitter<number>;

  private goToPage(pageNumber: number) {
    if (pageNumber < 1 || pageNumber > this.totalPages) {
      return;
    }
    this.currentPage = pageNumber;
  }
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  onClickFirstPageHandler = () => {
    this.currentPage = 1;
    this.goToPage(this.currentPage);
    this.changedPagination.emit(this.currentPage);
  };

  onClickPerviousPageHandler = () => {
    this.currentPage = --this.currentPage;
    this.changedPagination.emit(this.currentPage);
  };

  onClickNextPageHandler = () => {
    this.currentPage = ++this.currentPage;
    this.changedPagination.emit(this.currentPage);
  };

  onClickLastPageHandler = () => {
    this.totalPages;
    this.currentPage = this.totalPages;
    this.changedPagination.emit(this.currentPage);
  };

  pageChangeHandler = (event: Event): void => {
    const inputNumber = (event.target as HTMLInputElement).value;
    this.currentPage = parseInt(inputNumber);
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
          <button type="button" class="dc-first-btn" onClick={this.onClickFirstPageHandler} disabled={isStart}>
            {getSvg('remove', { class: 'dc-icon-line' })} {getSvg('drill-down', { class: 'dc-icon-first' })}
          </button>
          <button type="button" class="dc-previous-btn" onClick={this.onClickPerviousPageHandler} disabled={isStart}>
            {getSvg('drill-down', { class: 'dc-icon-previous' })}
          </button>
          <div class="dc-pagination-content-wrapper">
            <input type="text" class="dc-pagination-current" value={this.currentPage} onChange={this.pageChangeHandler}></input>of
            <span class="dc-total-page">{this.totalPages}</span>
          </div>
          <button type="button" class="dc-next-btn" onClick={this.onClickNextPageHandler} disabled={isEnd}>
            {getSvg('drill-down', { class: 'dc-icon-next' })}
          </button>
          <button type="button" class="dc-last-btn" onClick={this.onClickLastPageHandler} disabled={isEnd}>
            {getSvg('drill-down', { class: 'dc-icon-last' })}
            {getSvg('remove', { class: 'dc-icon-line' })}
          </button>
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomPagination = HTMLElement & DatacomPagination;
