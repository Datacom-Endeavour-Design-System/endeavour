import { Component, Host, h, Prop, Event, EventEmitter, State } from '@stencil/core';
import { getSvg } from '../../common/images';

@Component({
  tag: 'datacom-pagination',
  styleUrl: 'datacom-pagination.css',
  shadow: true,
})
export class DatacomPagination {
  @Prop({ mutable: true }) itemsPerPage?: number = 5;
  @Prop({ mutable: true }) totalItems?: number = 100;
  @State() currentPage?: number = 1;

  @Event() changedPagination: EventEmitter<number>;

  /**
   * Handle boundary cases such as only allowing to navigate between the range.
   */
  private goToPage(pageNumber: number) {
    if (pageNumber < 1 || pageNumber > this.totalPages) {
      return;
    }
    this.currentPage = pageNumber;
  }

  /**
   * calculate the total number of pages based on the total number of items and the items per page.
   */
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  onClickFirstPageHandler = () => {
    this.goToPage(1);
    this.changedPagination.emit(this.currentPage);
  };

  onClickPerviousPageHandler = () => {
    this.goToPage(this.currentPage - 1);
    this.changedPagination.emit(this.currentPage);
  };

  onClickNextPageHandler = () => {
    this.goToPage(+this.currentPage + 1);
    this.changedPagination.emit(this.currentPage);
  };

  onClickLastPageHandler = () => {
    this.currentPage = this.totalPages;
    this.changedPagination.emit(this.currentPage);
  };

  /**
   * Update the value when enter the page number in the input field.
   */
  onPageChangeHandler = (event: Event): void => {
    const inputNumber = (event.target as HTMLInputElement).value;
    const newPage = parseInt(inputNumber);

    if (isNaN(newPage)) {
      this.goToPage(this.currentPage);
    } else {
      this.goToPage(newPage);
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
          <button type="button" class="dc-first-btn" onClick={this.onClickFirstPageHandler} disabled={isStart}>
            {getSvg('last', { class: 'dc-icon-first' })}
          </button>
          <button type="button" class="dc-previous-btn" onClick={this.onClickPerviousPageHandler} disabled={isStart}>
            {getSvg('drill-down', { class: 'dc-icon-previous' })}
          </button>
          <div class="dc-pagination-content-wrapper">
            <input type="text" class="dc-pagination-current" value={this.currentPage} onChange={this.onPageChangeHandler}></input>of
            <span class="dc-total-page">{this.totalPages}</span>
          </div>
          <button type="button" class="dc-next-btn" onClick={this.onClickNextPageHandler} disabled={isEnd}>
            {getSvg('drill-down', { class: 'dc-icon-next' })}
          </button>
          <button type="button" class="dc-last-btn" onClick={this.onClickLastPageHandler} disabled={isEnd}>
            {getSvg('last', { class: 'dc-icon-last' })}
          </button>
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomPagination = HTMLElement & DatacomPagination;
