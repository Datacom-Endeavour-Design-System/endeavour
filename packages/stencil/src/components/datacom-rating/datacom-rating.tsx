import { Component, Host, h, Prop, Event, EventEmitter, getAssetPath, State, Fragment } from '@stencil/core';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'large' | 'small';
export type ImagePosition = 'left' | 'right';
export type ButtonType = 'button' | 'submit' | 'reset';

/**
 * Rating element is used to either display a rating
 * or act as an input for a user to give a rating.
 */
@Component({
  tag: 'datacom-rating',
  styleUrl: 'datacom-rating.css',
})
export class DatacomRating {
  @Prop() ratingValue = 0;
  @Prop() readonly = false;

  @State() selectedRating = 0;

  @Event() ratingChanged: EventEmitter<number>;

  private starEmptyImgSrc = getAssetPath(`/assets/images/rating/rating-star-empty.png`);
  private starFullImgSrc = getAssetPath(`/assets/images/rating/rating-star-full.png`);

  private onRatingSelected = (value: number) => () => {
    this.selectedRating = value;
    this.ratingChanged.emit(value);
    console.log('Rating selected: ', value);
  };

  private renderRatingInput = (value: number) => {
    const inputId = `rating${value}`;
    return (
      <Fragment>
        <input class="dc-rating-input" type="radio" name="rating" value={value} id={inputId} onChange={this.onRatingSelected(value)} />
        <label class="dc-rating-label" htmlFor={inputId}>
          <img class="dc-rating-star empty" src={this.starEmptyImgSrc} />
          <img class="dc-rating-star full" src={this.starFullImgSrc} />
          <span class="dc-rating-input-label">{value} stars</span>
        </label>
      </Fragment>
    );
  };

  private renderRatingInputs = () => {
    const elementList = [];

    for (let i = 1; i < 6; i++) {
      elementList.push(this.renderRatingInput(i));
    }

    return <div class="dc-rating-inputs">{elementList}</div>;
  };

  private renderRatingDisplay = () => {
    const emptyStars = [];
    const fullStars = [];

    for (let i = 1; i < 6; i++) {
      emptyStars.push(<img class="dc-rating-star" src={this.starEmptyImgSrc} />);
      fullStars.push(<img class="dc-rating-star" src={this.starFullImgSrc} />);
    }

    return (
      <div class="dc-rating-display">
        <div class="dc-rating-display-empty-stars">{emptyStars}</div>
        <div class="dc-rating-display-full-stars" style={{ width: `${this.ratingValue * 20}%` }}>
          {fullStars}
        </div>
      </div>
    );
  };

  render() {
    return (
      <Host>
        <div class="dc-rating">{this.readonly ? this.renderRatingDisplay() : this.renderRatingInputs()}</div>
      </Host>
    );
  }
}

export type HTMLDatacomRatingElement = HTMLElement & DatacomRating;
