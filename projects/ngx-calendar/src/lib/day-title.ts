import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-cal-day-title',
  standalone: true,
  template: `<div class="title">
    <span class="d-lg-none">{{ mobileTitle || title }}</span
    ><span class="d-none d-lg-block">{{ title }}</span>
  </div> `,
})
export class NgxCalDayTitle {
  @Input() title: string = '';
  @Input() mobileTitle: string = '';
}
