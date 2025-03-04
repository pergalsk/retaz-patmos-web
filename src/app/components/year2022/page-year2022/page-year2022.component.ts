import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { format, compareAsc, addDays, eachDayOfInterval } from 'date-fns';
import sk from 'date-fns/locale/sk';

import { DatesService } from '@services/dates.service';
import { ColorSchemeService } from '@modules/color-scheme/color-scheme.service';
import { Scheme } from '@modules/color-scheme/color-scheme.types';
import { DateBadge, BadgeStripComponent } from '../badge-strip/badge-strip.component';
import { UkraineContent2022Component } from '../ukraine-content2022/ukraine-content2022.component';
import { DayContentPanelComponent } from '../day-content-panel/day-content-panel.component';
import { MainContent2022Component } from '../main-content2022/main-content2022.component';

@Component({
  selector: 'app-page-year2022',
  standalone: true,
  imports: [
    MainContent2022Component,
    BadgeStripComponent,
    DayContentPanelComponent,
    UkraineContent2022Component,
  ],
  template: `
    <main class="container narrow">
      <!-- Title content - prolog -->
      <app-main-content2022></app-main-content2022>

      <!-- Buttons for each day -->
      <app-badge-strip
        [list]="datesList"
        [actual]="selectedDateISO"
        (itemClick)="dateClickHandler($event)"
      ></app-badge-strip>

      <!-- Dynamic content for each day -->
      <app-day-content-panel [date]="selectedDateISO"></app-day-content-panel>

      <!-- Prayers for Ukraine -->
      <app-ukraine-content2022></app-ukraine-content2022>
    </main>
  `,
})
export class PageYear2022Component implements OnInit, OnDestroy {
  refDate: Date = new Date();
  startDate: Date = new Date(2022, 2, 2); // 2022-03-02
  endDate: Date = new Date(2022, 3, 15); // 2022-04-15

  todayDate: Date;
  datesList: DateBadge[];
  selectedDateISO: string;

  dateFormatISO: string = 'yyyy-MM-dd';
  changeHour: number = 1; // at 1 AM content will change

  scheme: Scheme;
  colorSchemeChange$: Subscription;

  datesService: DatesService = inject(DatesService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  location: Location = inject(Location);
  colorSchemeService: ColorSchemeService = inject(ColorSchemeService);

  ngOnInit(): void {
    this.todayDate = this.calculateSelectedDate(this.refDate);
    this.selectedDateISO = this.calculateSelectedDateISO(this.refDate);
    this.datesList = this.generateDatesList(this.startDate, this.endDate, this.todayDate);

    this.activatedRoute.params.subscribe(this.handleRouteParams.bind(this));

    this.colorSchemeChange$ = this.colorSchemeService.schemeChange.subscribe((scheme: Scheme) => {
      this.scheme = scheme;
    });
  }

  ngOnDestroy() {
    this.colorSchemeChange$.unsubscribe();
  }

  dateClickHandler(dateBadge: DateBadge): void {
    // clicked on the same (already selected) date
    if (this.selectedDateISO === dateBadge.id) {
      return;
    }

    this.selectedDateISO = dateBadge.id;
    this.replaceLocation(['2022', this.selectedDateISO]);
  }

  private handleRouteParams(params: Params): void {
    const parsedDate = this.datesService.parseISODateBetween(
      params.date,
      {
        start: this.startDate,
        end: this.todayDate,
      },
      this.refDate,
    );

    if (parsedDate) {
      this.selectedDateISO = params.date;
    } else {
      this.selectedDateISO = this.calculateSelectedDateISO(this.refDate);
      this.replaceLocation(['2022']);
    }
  }

  private replaceLocation(commands: any[]): void {
    const url: string = this.router.createUrlTree(commands).toString();
    this.location.replaceState(url);
  }

  private calculateSelectedDateISO(refDate: Date): string {
    return format(this.calculateSelectedDate(refDate), this.dateFormatISO);
  }

  private calculateSelectedDate(refDate: Date): Date {
    // Check if today's date is after last day of interval. If it's so, set actual date to end date.
    const today: Date = this.datesService.resetTime(refDate);
    if (compareAsc(today, this.endDate) > 0) {
      return this.endDate;
    }

    // Calculation of actual date.
    const refDateNoTime: Date = this.datesService.resetTime(refDate, this.changeHour);
    const afterChangeHour: boolean = compareAsc(refDate, refDateNoTime) >= 0;
    const shiftedDate = addDays(refDate, afterChangeHour ? 0 : -1);
    return this.datesService.resetTime(shiftedDate);
  }

  private generateDatesList(start: Date, end: Date, displayDate: Date): DateBadge[] {
    return eachDayOfInterval({ start, end })
      .reverse()
      .map((date: Date) => this.createDate(date, this.datesService.resetTime(displayDate)));
  }

  private createDate(date: Date, displayDate: Date): DateBadge {
    const comparisonResult: number = compareAsc(date, displayDate);

    return {
      id: format(date, this.dateFormatISO),
      date,
      past: comparisonResult === -1,
      actual: comparisonResult === 0,
      future: comparisonResult === 1,
      comparisonResult,
      day: date.getDay() || 7,
      format_A: format(date, 'EEEE d.L.', { locale: sk }), // Monday 28.10.
      format_B: format(date, 'E d.L.', { locale: sk }), // Mo 28.10.
    };
  }
}
