import { Component, ViewEncapsulation } from '@angular/core';
import { CalendarSignupComponent } from '@shared/components/calendar-signup/calendar-signup.component';
import { MainContent2024Component } from '../../contents/main-content2024/main-content2024.component';

@Component({
  selector: 'app-page-year2024',
  standalone: true,
  imports: [MainContent2024Component, CalendarSignupComponent],
  styleUrls: ['page-year2024.component.scss'],
  host: { '[class]': "'theme2024'" },
  template: `
    <app-main-content2024 />
    <app-calendar-signup
      [year]="year"
      [overrides]="overrides"
      (cellAction)="onCellAction($event)"
    />
  `,
  encapsulation: ViewEncapsulation.None,
})
export class PageYear2024Component {
  year: string = '2024';
  overrides = {
    '2024-03-29': {
      title: 'Veľký piatok',
      mobileTitle: 'Veľký piatok',
      highlighted: true,
    },
  };

  onCellAction(event: any) {}
}
