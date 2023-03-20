import { Component, Host, h, Prop, Event, EventEmitter, State, Fragment } from '@stencil/core';
import { RatingStarEmpty } from './icons/rating-star-empty';
import { RatingStarFull } from './icons/rating-star-full';

export type RatingSizeType = 'standard' | 'large';

/**
 * Rating element is used to either display a rating
 * or act as an input for a user to give a rating.
 */
@Component({
  tag: 'datacom-rating',
  styleUrl: 'datacom-rating.css',
  shadow: true,
})
export class DatacomRating {
  @Prop() label;
  @Prop() size: RatingSizeType = 'standard';
  @Prop() ratingValue = 0;
  @Prop() readonly = false;

  @State() selectedRating = 0;

  @Event() ratingChanged: EventEmitter<number>;

  /**
   * Event handler for when rating is changed.
   */
  private onRatingSelected = (value: number) => () => {
    this.selectedRating = value;
    this.ratingChanged.emit(value);
  };

  /**
   * Renders rating input elements for when component takes user input.
   * @returns Input elements for rating.
   */
  private renderRatingInputs = () => {
    const elementList = [];

    for (let i = 1; i < 6; i++) {
      const inputId = `rating${i}`;

      elementList.push(
        <Fragment>
          <input class="dc-rating-input" type="radio" name="rating" value={i} id={inputId} onChange={this.onRatingSelected(i)} />
          <label class="dc-rating-input-label" htmlFor={inputId}>
            <div class="dc-rating-star">
              <RatingStarEmpty />
            </div>
            <div class="dc-rating-star full-star">
              <RatingStarFull />
            </div>
            <span class="dc-rating-sr-label">{i} stars</span>
          </label>
        </Fragment>,
      );
    }

    return <div class="dc-rating-inputs">{elementList}</div>;
  };

  /**
   * Renders rating display elements when component is readonly.
   * @returns Display elements for rating.
   */
  private renderRatingDisplay = () => {
    const emptyStars = [];
    const fullStars = [];

    for (let i = 1; i < 6; i++) {
      emptyStars.push(
        <div class="dc-rating-star-wrapper">
          <div class="dc-rating-star">
            <RatingStarEmpty />
          </div>
        </div>,
      );

      // Must calculate percentage of visible with based on ratingValue prop.

      // Initially assume star will be full width.
      let visibleStarWidth = 100;
      if (i > this.ratingValue) {
        if (i - this.ratingValue > 1) {
          // Set width to zero if star value is greater than ratingValue...
          visibleStarWidth = 0;
        } else {
          // ...else calculate visible percentage width needed for star.
          visibleStarWidth = (this.ratingValue - (i - 1)) * 100;
        }
      }

      fullStars.push(
        <div class="dc-rating-star-wrapper">
          <div class="dc-rating-star" style={{ width: `${visibleStarWidth}%` }}>
            <RatingStarFull />
          </div>
        </div>,
      );
    }

    return (
      <div class="dc-rating-display">
        <div class="dc-rating-display-empty-stars">{emptyStars}</div>
        <div class="dc-rating-display-full-stars">{fullStars}</div>
      </div>
    );
  };

  render() {
    const mainClasses = {
      'dc-rating': true,
      'large': this.size === 'large',
    };

    return (
      <Host>
        <div class={mainClasses}>
          {this.readonly ? this.renderRatingDisplay() : this.renderRatingInputs()}
          {this.label && <div class="dc-rating-label">{this.label}</div>}
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomRatingElement = HTMLElement & DatacomRating;
