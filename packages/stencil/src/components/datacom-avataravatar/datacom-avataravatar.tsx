import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'datacom-avataravatar',
  styleUrl: 'datacom-avataravatar.css',
  shadow: true,
})
export class DatacomAvataravatar {
  /* Custom properties */
  @Prop() firstName: string;
  @Prop() lastName: string;
  @Prop() jobTitle: string;
  @Prop() companyName: string;
  @Prop() src: string;

  render() {
    let avtImage;
    let F;
    let L;

    if (this.src?.length > 0) {
      avtImage = <img src={this.src} />;
    } else {
      F = this.firstName.split('');
      L = this.lastName.split('');
      avtImage = (
        <div class="avatar-initial">
          {F[0]}
          {L[0]}
        </div>
      );
    }

    return (
      <Host>
        <div class="avatar">
          <div class="avatar-image">{avtImage}</div>
          <div class="avatar-details">
            <div class="avatar-name">
              {this.firstName} {this.lastName}
            </div>
            <div class="avatar-title">
              {this.jobTitle}, {this.companyName}
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
