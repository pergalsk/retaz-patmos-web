import { Component, ViewEncapsulation } from '@angular/core';
import { CalendarSignupComponent } from '@components/calendar-signup/calendar-signup.component';
import { MainContent2025Component } from '../main-content2025/main-content2025.component';

@Component({
  selector: 'app-page-year2025',
  standalone: true,
  imports: [MainContent2025Component, CalendarSignupComponent],
  styleUrls: ['page-year2025.component.scss'],
  host: { '[class]': "'theme2025'" },
  template: `
    <app-main-content2025 />
    <app-calendar-signup
      [year]="year"
      [overrides]="overrides"
      (cellAction)="onCellAction($event)"
    />
  `,
  encapsulation: ViewEncapsulation.None,
})
export class PageYear2025Component {
  year: string = '2025';
  overrides = {
    '2025-04-18': {
      title: 'Veľký piatok',
      mobileTitle: 'Veľký piatok',
      highlighted: true,
    },
  };

  onCellAction(event: any) {}
}
