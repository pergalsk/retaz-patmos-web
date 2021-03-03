import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {
  parse,
  getDay,
  compareAsc,
  eachDayOfInterval,
  startOfISOWeek,
  endOfISOWeek,
  eachWeekOfInterval,
  format, getMonth, isWeekend, getISOWeek
} from 'date-fns';
import {sk} from 'date-fns/locale';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() options: any;
  @Output() cellAction: EventEmitter<any> = new EventEmitter<any>();

  calendar: any = null;
  dates: any = null;
  sysDate: Date = null;
  sysTime = '';

  dayNames = ['Pondelok', 'Utorok', 'Streda', 'Štvrtok', 'Piatok', 'Sobota', 'Nedeľa'];

  private rawDateFormat = 'yyyy-MM-dd';
  private titleDateFormat = 'LLLL d';

  constructor() { }

  ngOnInit(): void {
    if (!this.data) {
      return;
    }

    this.build();
  }

  private build(): void {
    const referenceDate = new Date();
    this.sysDate = parse(this.options?.sysDate, this.rawDateFormat, referenceDate);
    this.sysTime = this.options?.sysTime;

    this.calendar = this.generateCalendarData(this.data?.start, this.data?.end, referenceDate);
  }

  private generateCalendarData(startDate, endDate, referenceDate): any {
    if (!startDate || !endDate || !referenceDate) {
      return [];
    }

    const firstDate = parse(startDate, this.rawDateFormat, referenceDate);
    const lastDate = parse(endDate, this.rawDateFormat, referenceDate);

    const weekStartDates = eachWeekOfInterval({
      start: startOfISOWeek(firstDate),
      end: endOfISOWeek(lastDate)
    }, { weekStartsOn: 1 });

    return weekStartDates.map(
      weekStartDate => eachDayOfInterval({
        start: startOfISOWeek(weekStartDate),
        end: endOfISOWeek(weekStartDate)
      }).map(this.mapDays)
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.build();
  }

  getDayNum(date: Date): number {
    return getDay(date) || 7;
  }

  onDateClick = (weekIndex, dayIndex, day, week, calendar) => {
    console.log(`CLick on date ${day.date} fired! [weekIndex=${weekIndex}, dayIndex=${dayIndex}, visible=${day.visible}, disabled=${day.disabled}, type="${day.type}"]`);

    if (!day.visible || day.disabled) {
      return;
    }

    this.cellAction.emit({ weekIndex, dayIndex, day, week, calendar });
  }

  private mapDays = (day): object => {
    const date = format(day, this.rawDateFormat);
    const title = format(day, this.titleDateFormat, { locale: sk });
    const weekDay = getDay(day) || 7; // with sunday correction 0 -> 7
    const month = getMonth(day) + 1; // counting from zero correction
    const weekend = isWeekend(day);
    const week = getISOWeek(day);

    const comparisonResult = compareAsc(day, this.sysDate);
    const today = comparisonResult === 0;
    const past = comparisonResult < 0;
    const future = comparisonResult > 0;
    const type = today ? 'today' : (past ? 'past' : 'future');

    const disabled = Number.isNaN(comparisonResult);
    const visible = !!this.data[date];

    const names = this.data[date] || [];

    return {
      date,
      title,
      visible,
      disabled,
      weekDay,
      month,
      week,
      weekend,
      past,
      today,
      future,
      type,
      names
    };
  }
}
