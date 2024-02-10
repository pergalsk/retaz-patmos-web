import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-page-year2024',
  styleUrls: ['page-year2024.component.scss'],
  template: `
    <div class="theme2024">
      <app-main-content2024></app-main-content2024>
      <app-calendar-signup [year]="year" [overrides]="overrides" />
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class PageYear2024Component {
  year: string = '2024';
  overrides = {
    '2024-03-29': {
      title: 'Veľký piatok',
      highlighted: true,
    },
  };
}
