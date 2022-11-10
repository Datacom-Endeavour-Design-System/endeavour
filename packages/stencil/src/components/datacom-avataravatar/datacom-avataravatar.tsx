import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'datacom-avataravatar',
  styleUrl: 'datacom-avataravatar.css',
  shadow: true,
})
export class DatacomAvataravatar {
  /* Custom properties */
  @Prop() FirstName: string;
  @Prop() LastName: string;
  @Prop() Src: string;

  render() {
    let Image;
    let F;
    let L;

    if (this.Src?.length > 0) {
      Image = <img src={this.Src} />;
    } else {
      F = this.FirstName.split('');
      L = this.LastName.split('');
      Image = (
        <div class="avatar-initial">
          {F[0]}
          {L[0]}
        </div>
      );
    }

    return (
      <Host>
        <div class="avatar">
          <div class="avatar-image">{Image}</div>
          <div class="avatar-details">
            <div class="avatar-name">
              {this.FirstName} {this.LastName}
            </div>
            <div class="avatar-title">Job title, Company name</div>
          </div>
        </div>
      </Host>
    );
  }
}
