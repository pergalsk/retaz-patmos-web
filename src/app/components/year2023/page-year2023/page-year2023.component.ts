import { Component } from '@angular/core';
import { CalendarSignupComponent } from '@components/calendar-signup/calendar-signup.component';
import { MainContent2023Component } from '../main-content2023/main-content2023.component';

@Component({
  selector: 'app-page-year2023',
  template: `
    <main class="container narrow">
      <app-main-content2023></app-main-content2023>
      <app-calendar-signup [year]="year" [overrides]="overrides" />
    </main>
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
