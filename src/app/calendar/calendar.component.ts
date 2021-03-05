import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  parse,
  getDay,
  getDate,
  compareAsc,
  eachDayOfInterval,
  startOfISOWeek,
  endOfISOWeek,
  eachWeekOfInterval,
  format,
  getMonth,
  isWeekend,
  getISOWeek,
} from 'date-fns';

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
  monthNames = [
    'Január',
    'Február',
    'Marec',
    'Apríl',
    'Máj',
    'Jún',
    'Júl',
    'August',
    'September',
    'Október',
    'November',
    'December',
  ];

  calendarOptions: any = {};
  defaultOptions = {
    header: true,
    separateMonths: true,
    sysDate: new Date(),
    sysTime: new Date(),
    rawDateFormat: 'yyyy-MM-dd',
    titleDateFormat: 'LLLL d',
    overrides: null,
  };

  constructor() {}

  ngOnInit(): void {
    if (!this.data) {
      return;
    }

    this.build();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.build();
  }

  onDateClick = (weekIndex, dayIndex, day, week, calendar) => {
    console.log(
      `CLick on date ${day.date} fired! [weekIndex=${weekIndex}, dayIndex=${dayIndex}, visible=${day.visible}, disabled=${day.disabled}, type="${day.type}"]`
    );

    if (!day.visible || day.disabled) {
      return;
    }

    this.cellAction.emit({ weekIndex, dayIndex, day, week, calendar });
  };

  private build(): void {
    const referenceDate = new Date();

    if (this.options) {
      Object.assign(this.calendarOptions, this.defaultOptions, this.options);
    }

    this.sysDate = parse(
      this.calendarOptions?.sysDate,
      this.calendarOptions.rawDateFormat,
      referenceDate
    );
    this.sysTime = this.calendarOptions?.sysTime;

    this.calendar = this.generateCalendarData(this.data?.start, this.data?.end, referenceDate);
  }

  private generateCalendarData(startDate, endDate, referenceDate): any {
    if (!startDate || !endDate || !referenceDate) {
      return [];
    }

    const firstDate = parse(startDate, this.calendarOptions.rawDateFormat, referenceDate);
    const lastDate = parse(endDate, this.calendarOptions.rawDateFormat, referenceDate);

    const weekStartDates = eachWeekOfInterval(
      {
        start: startOfISOWeek(firstDate),
        end: endOfISOWeek(lastDate),
      },
      { weekStartsOn: 1 }
    );

    return weekStartDates.map((weekStartDate) =>
      eachDayOfInterval({
        start: startOfISOWeek(weekStartDate),
        end: endOfISOWeek(weekStartDate),
      }).map(this.mapDays)
    );
  }

  private mapDays = (day): object => {
    const date = format(day, this.calendarOptions.rawDateFormat);
    const monthDay = getDate(day);
    const weekDay = getDay(day) || 7; // with sunday correction 0 -> 7
    const month = getMonth(day) + 1; // counting from zero correction
    const weekend = isWeekend(day);
    const week = getISOWeek(day);
    const title = this.monthNames[month - 1] + ' ' + monthDay; //format(day, this.calendarOptions.titleDateFormat);

    const comparisonResult = compareAsc(day, this.sysDate);
    const today = comparisonResult === 0;
    const past = comparisonResult < 0;
    const future = comparisonResult > 0;
    const type = today ? 'today' : past ? 'past' : 'future';

    const disabled = Number.isNaN(comparisonResult);
    const visible = !!this.data[date];

    const names = this.data[date] || [];

    const monthName = format(day, 'LLLL').toLowerCase(); // only month name
    const dayName = format(day, 'iiii').toLowerCase(); // only day name

    const classList = [
      type,
      names.length ? 'filled' : null,
      weekend ? 'weekend' : null,
      disabled ? 'disabled' : null,
      weekDay === 7 ? 'highlighted' : null,
      visible ? null : 'invisible',
      dayName,
      monthName,
      'date-' + date,
      'week-' + week,
      'month-' + month,
      'week-day-' + weekDay,
      'month-day-' + monthDay,
    ].filter(Boolean);

    let resultObj = {
      date,
      title,
      visible,
      disabled,
      weekDay,
      monthDay,
      month,
      week,
      weekend,
      past,
      today,
      future,
      type,
      names,
      classList,
    };

    if (this.calendarOptions?.overrides?.[date]) {
      Object.assign(resultObj, this.calendarOptions.overrides[date]);
      // todo refactor:
      resultObj.classList = resultObj.classList.concat(
        this.calendarOptions?.overrides?.[date]?.classes
      );
    }

    return resultObj;
  };
}
