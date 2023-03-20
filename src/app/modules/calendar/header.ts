import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'ngx-cal-header',
  standalone: true,
  imports: [NgForOf],
  template: `
    <div class="calendar-header">
      <ng-container *ngFor="let title of titles">
        <div class="header-cell">{{ title }}</div>
      </ng-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxCalHeader {
  @Input() titles: string[] = [];
}
