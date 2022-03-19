import { Component, OnInit } from '@angular/core';
import {
  parse,
  format,
  setHours,
  setMinutes,
  setSeconds,
  compareAsc,
  addDays,
  eachDayOfInterval,
  setMilliseconds,
} from 'date-fns';
import sk from 'date-fns/locale/sk';
import { CommonApiService } from 'src/app/services/common-api.service';

interface DateBadge {
  id: string;
  date: Date;
  past: boolean;
  actual: boolean;
  future: boolean;
  comparisonResult: number;
  day: number;
  format_A: string;
  format_B: string;
}

@Component({
  selector: 'app-page-year2022',
  templateUrl: './page-year2022.component.html',
  styleUrls: ['./page-year2022.component.scss'],
})
export class PageYear2022Component implements OnInit {
  now: Date;
  datesList: DateBadge[];
  displayDateId: string;

  dateFormat = 'yyyy-MM-dd';
  startDateRaw = '2022-03-02';
  endDateRaw = '2022-04-15';
  changeHour = 1; // at 1 AM content will change
  getDateError = false;

  constructor(private commonApiService: CommonApiService) {}

  ngOnInit(): void {
    // this.loadDate();
    this.successHandler();
  }

  loadDate() {
    this.commonApiService.getSysDateTime().subscribe(this.successHandler, this.errorHandler);
  }

  successHandler() {
    this.getDateError = false;
    this.now = new Date();

    const startDate: Date = this.parseDate(this.startDateRaw);
    const endDate: Date = this.parseDate(this.endDateRaw);
    const refTime: Date = this.resetTime(this.now, this.changeHour);
    const afterChangeHour: boolean = compareAsc(this.now, refTime) >= 0;
    const displayDate: Date = addDays(this.now, afterChangeHour ? 0 : -1);

    this.displayDateId = format(displayDate, this.dateFormat);
    this.datesList = this.generateDatesList(startDate, endDate, displayDate);
  }

  errorHandler() {
    this.getDateError = true;
  }

  dateClickHandler(dateId: string) {
    this.displayDateId = dateId;
  }

  private generateDatesList(start: Date, end: Date, displayDate: Date): DateBadge[] {
    return eachDayOfInterval({ start, end })
      .reverse()
      .map((date: Date) => this.createDate(date, this.resetTime(displayDate)));
  }

  private parseDate(date: string): Date {
    return parse(date, this.dateFormat, this.now);
  }

  private resetTime(
    dateTime: Date,
    hours: number = 0,
    minutes: number = 0,
    seconds: number = 0,
    ms: number = 0
  ): Date {
    return setMilliseconds(setSeconds(setMinutes(setHours(dateTime, hours), minutes), seconds), ms);
  }

  private createDate(date: Date, displayDate: Date): DateBadge {
    const comparisonResult: number = compareAsc(date, displayDate);

    return {
      id: format(date, this.dateFormat),
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
