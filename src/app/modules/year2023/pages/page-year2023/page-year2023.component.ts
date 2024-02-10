import { Component } from '@angular/core';
import { CalendarSignupComponent } from '../../../shared/components/calendar-signup/calendar-signup.component';
import { MainContent2023Component } from '../../contents/main-content2023/main-content2023.component';

@Component({
  selector: 'app-page-year2023',
  template: `
    <app-main-content2023></app-main-content2023>
    <app-calendar-signup [year]="year" [overrides]="overrides" />
  `,
  standalone: true,
  imports: [MainContent2023Component, CalendarSignupComponent],
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
