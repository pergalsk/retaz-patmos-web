import { Component, ViewEncapsulation } from '@angular/core';
import { CalendarSignupComponent } from '@components/calendar-signup/calendar-signup.component';
import { MainContent2026Component } from '../main-content2026/main-content2026.component';

@Component({
  selector: 'app-page-year2026',
  standalone: true,
  imports: [MainContent2026Component, CalendarSignupComponent],
  styleUrls: ['page-year2026.component.scss'],
  host: { '[class]': "'theme2026'" },
  template: `
    <app-main-content2026 />
    <main class="container narrow">
      <app-calendar-signup
        [year]="year"
        [overrides]="overrides"
        (cellAction)="onCellAction($event)"
      />
    </main>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class PageYear2026Component {
  year: string = '2026';
  overrides = {
    '2026-04-03': {
      title: 'Veľký piatok',
      mobileTitle: 'Veľký piatok',
      highlighted: true,
    },
  };

  onCellAction(event: any) {}
}
