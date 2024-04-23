import {
  Component,
  Host,
  h,
  Prop,
  Event,
  EventEmitter,
  Listen,
} from '@stencil/core';
import { getSvg } from '../../common/images';

@Component({
  tag: 'datacom-pagination',
  styleUrl: 'datacom-pagination.css',
  scoped: true,
})
export class DatacomPagination {
  @Prop({ mutable: true }) itemsPerPage?: number;
  @Prop({ mutable: true }) totalItems?: number;
  @Prop({ mutable: true }) currentPage?: number;
  @Event({
    composed: true,
  })
  private pageChanged: EventEmitter<number>;

  /**
   * Handle boundary cases such as only allowing to navigate between the range.
   */
  private goToPage(pageNumber: number) {
    if (pageNumber < 1 || pageNumber > this.totalPages) {
      return;
    }
    this.currentPage = pageNumber;
    this.pageChanged.emit(this.currentPage);
  }

  /**
   * calculate the total number of pages based on the total number of items and the items per page.
   */
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  onClickFirstPageHandler = () => {
    this.goToPage(1);
    this.pageChanged.emit(this.currentPage);
  };

  onClickPerviousPageHandler = () => {
    this.goToPage(this.currentPage - 1);
    this.pageChanged.emit(this.currentPage);
  };

  onClickNextPageHandler = () => {
    this.goToPage(+this.currentPage + 1);
    this.pageChanged.emit(this.currentPage);
  };

  onClickLastPageHandler = () => {
    this.currentPage = this.totalPages;
    this.pageChanged.emit(this.currentPage);
  };

  /**
   * Update the value when enter the page number in the input field.
   */
  onPageChangeHandler = (event: MouseEvent | KeyboardEvent): void => {
    const inputNumber = (event.target as HTMLInputElement).value;
    const newPage = parseInt(inputNumber);
    if (isNaN(newPage)) {
      this.goToPage(this.currentPage);
    } else {
      this.goToPage(newPage);
    }
    this.pageChanged.emit(this.currentPage);
  };

  @Listen('input', { capture: true })
  onInput(event: InputEvent): void {
    const inputElement = event.target as HTMLInputElement;
    const newValue =
      inputElement.value !== '' ? +inputElement.value : undefined;
    this.currentPage = newValue;
    this.pageChanged.emit(this.currentPage);
  }

  handleInputBlur = (event: MouseEvent | KeyboardEvent): void => {
    const inputNumber = (event.target as HTMLInputElement).value;
    let newEnteredHigher = parseInt(inputNumber);
    if (newEnteredHigher > this.totalPages) {
      newEnteredHigher = this.totalPages;
    }
    this.currentPage = newEnteredHigher;
  };

  render() {
    const start = this.currentPage;
    const isStart = start === 1;
    const end = Math.min(this.currentPage, this.totalPages);
    const isEnd = end === this.totalPages;

    return (
      <Host>
        <div class="dc-pagination-wrapper">
          <button
            type="button"
            class="dc-first-btn"
            onClick={this.onClickFirstPageHandler}
            disabled={isStart}>
            {getSvg('last', { class: 'dc-icon-first' })}
          </button>
          <button
            type="button"
            class="dc-previous-btn"
            onClick={this.onClickPerviousPageHandler}
            disabled={isStart}>
            {getSvg('drill-down', { class: 'dc-icon-previous' })}
          </button>
          <div class="dc-pagination-content-wrapper">
            <input
              type="number"
              class="dc-pagination-current"
              value={this.currentPage}
              onChange={() => this.onPageChangeHandler}
              onBlur={() => this.handleInputBlur}></input>
            of
            <span class="dc-total-page">{this.totalPages}</span>
          </div>
          <button
            type="button"
            class="dc-next-btn"
            onClick={this.onClickNextPageHandler}
            disabled={isEnd}>
            {getSvg('drill-down', { class: 'dc-icon-next' })}
          </button>
          <button
            type="button"
            class="dc-last-btn"
            onClick={this.onClickLastPageHandler}
            disabled={isEnd}>
            {getSvg('last', { class: 'dc-icon-last' })}
          </button>
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomPagination = HTMLElement & DatacomPagination;
