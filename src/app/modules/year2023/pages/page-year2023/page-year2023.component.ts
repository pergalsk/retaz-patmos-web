import { Component } from '@angular/core';

@Component({
  selector: 'app-page-year2023',
  template: `
    <app-main-content2023></app-main-content2023>
    <app-calendar-signup [year]="year" [overrides]="overrides" />
  `,
})
export class PageYear2023Component {
  year: string = '2023';
  overrides = {
    '2023-04-07': {
      title: 'Veľký piatok',
      highlighted: true,
    },
  };
}
