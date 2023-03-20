import { Component, Input } from '@angular/core';

@Component({
  selector: '[ngx-cal-day-title]',
  standalone: true,
  template: `<div class="title">{{ title }}</div> `,
})
export class NgxCalDayTitle {
  @Input() title: string = '';
}
