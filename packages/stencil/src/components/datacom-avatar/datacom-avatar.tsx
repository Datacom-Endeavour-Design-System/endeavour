import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'datacom-avatar',
  styleUrl: 'datacom-avatar.css',
  shadow: true,
})
export class DatacomAvatar {
  /* Custom properties */
  @Prop() firstName: string;
  @Prop() lastName: string;
  @Prop() jobTitle: string;
  @Prop() companyName: string;
  @Prop() src: string;
  @Prop() alt: string;

  render() {
    let avatarImage;

    if (this.src?.length > 0) {
      avatarImage = <img alt={this.alt} src={this.src} />;
    } else {
      avatarImage = (
        <div class="avatar-initial">
          {this.firstName?.substring(0, 1)}
          {this.lastName?.substring(0, 1)}
        </div>
      );
    }

    return (
      <Host>
        <div class="avatar">
          <div class="avatar-image">{avatarImage}</div>
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
