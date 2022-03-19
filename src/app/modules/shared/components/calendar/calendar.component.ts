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
  isSameWeek,
} from 'date-fns';

// import { CalendarData } from '../app.component';

export interface CalendarDataProps {
  start: string;
  end: string;
}

export type CalendarData<T> = ({ [Key: string]: T } & CalendarDataProps) | CalendarDataProps;

export type WeekType = 'actual' | 'past' | 'future';
export type DayType = 'today' | 'past' | 'future';

export interface Calendar {
  pastWeeksCount: number;
  weeks: Week[];
}

export interface Week {
  week: number;
  past: boolean;
  actual: boolean;
  future: boolean;
  type: WeekType;
  days: Day[];
  classList: string[];
}

export interface Day {
  date: string;
  title: string;
  visible: boolean;
  disabled: boolean;
  // selected: boolean;
  weekDay: number;
  monthDay: number;
  month: number;
  week: number;
  weekend: boolean;
  past: boolean;
  today: boolean;
  future: boolean;
  type: DayType;
  names: string[];
  classList: string[];
}

export interface CalendarEmit {
  weekIndex: number;
  dayIndex: number;
  day: Day;
  week: Week;
  calendar: Calendar;
  selection: number[][];
}

/*export interface CalendarOptions {
  sysDate: Date | string;
  sysTime: Date | string;
  rawDateFormat: string;
  titleDateFormat: string;
  header: boolean;
  separateMonths: boolean;
  collapsedWeeks: boolean;
  overrides: any;
}*/

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit, OnChanges {
  @Input() data: CalendarData<string[]>;
  @Input() options: any;
  @Output() cellAction: EventEmitter<any> = new EventEmitter<any>();

  calendar: any = null;
  sysDate: Date = null;
  sysTime = '';
  collapsedWeeks = false;

  dayNames: string[] = ['Pondelok', 'Utorok', 'Streda', 'Štvrtok', 'Piatok', 'Sobota', 'Nedeľa'];
  monthNames: string[] = [
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
    collapsedWeeks: false,
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

  onDateClick(weekIndex: number, dayIndex: number, day: Day, week: Week, calendar: Calendar): void {
    console.log(
      `Click on date ${day.date} fired! [weekIndex=${weekIndex}, dayIndex=${dayIndex}, ` +
        `visible=${day.visible}, disabled=${day.disabled}, type="${day.type}"]`
    );

    if (!day.visible || day.disabled) {
      return;
    }

    this.cellAction.emit({ weekIndex, dayIndex, day, week, calendar });
  }

  toggleWeeks(): void {
    this.collapsedWeeks = !this.collapsedWeeks;
  }

  private build(): void {
    const referenceDate: Date = new Date();

    if (this.options) {
      Object.assign(this.calendarOptions, this.defaultOptions, this.options);
    }

    this.sysDate = parse(
      this.calendarOptions?.sysDate,
      this.calendarOptions.rawDateFormat,
      referenceDate
    );
    this.sysTime = this.calendarOptions?.sysTime;

    this.collapsedWeeks = this.calendarOptions.collapsedWeeks;

    this.calendar = this.generateCalendarData(this.data?.start, this.data?.end, referenceDate);
  }

  private generateCalendarData(startDate: string, endDate: string, referenceDate: Date): Calendar {
    if (!startDate || !endDate || !referenceDate) {
      return {
        pastWeeksCount: 0,
        weeks: [],
      };
    }

    const firstDate: Date = parse(startDate, this.calendarOptions.rawDateFormat, referenceDate);
    const lastDate: Date = parse(endDate, this.calendarOptions.rawDateFormat, referenceDate);
    const start: Date = startOfISOWeek(firstDate);
    const end: Date = endOfISOWeek(lastDate);

    const weekStartDates: Date[] = eachWeekOfInterval({ start, end }, { weekStartsOn: 1 });
    const weeks: Week[] = weekStartDates.map(this.mapWeeks);

    const pastWeeksCount: number = weeks.reduce((acc, week) => acc + (week.past ? 1 : 0), 0);

    return {
      pastWeeksCount,
      weeks,
    };
  }

  private mapWeeks = (weekStartDate: Date): Week => {
    const start: Date = startOfISOWeek(weekStartDate);
    const end: Date = endOfISOWeek(weekStartDate);
    const days: Day[] = eachDayOfInterval({ start, end }).map(this.mapDays);
    const month: number = getMonth(weekStartDate) + 1; // counting from zero correction
    const monthName: string = format(weekStartDate, 'LLLL').toLowerCase(); // only month name
    const week: number = getISOWeek(weekStartDate);

    const comparison: number = compareAsc(weekStartDate, this.sysDate);
    const past: boolean =
      comparison < 0 && !isSameWeek(weekStartDate, this.sysDate, { weekStartsOn: 1 });
    const actual: boolean = isSameWeek(weekStartDate, this.sysDate, { weekStartsOn: 1 });
    const future: boolean =
      comparison > 0 && !isSameWeek(weekStartDate, this.sysDate, { weekStartsOn: 1 });
    const type: WeekType = actual ? 'actual' : past ? 'past' : 'future';

    const classList: string[] = [type, monthName, 'month-' + month, 'week-' + week].filter(Boolean);

    return {
      week,
      past,
      actual,
      future,
      type,
      days,
      classList,
    };
  };

  private mapDays = (day: Date): Day => {
    const date: string = format(day, this.calendarOptions.rawDateFormat);
    const monthDay: number = getDate(day);
    const weekDay: number = getDay(day) || 7; // with sunday correction 0 -> 7
    const month: number = getMonth(day) + 1; // counting from zero correction
    const weekend: boolean = isWeekend(day);
    const week: number = getISOWeek(day);

    const title: string = this.monthNames[month - 1] + ' ' + monthDay; // format(day, this.calendarOptions.titleDateFormat);

    const comparisonResult: number = compareAsc(day, this.sysDate);
    const past: boolean = comparisonResult < 0;
    const today: boolean = comparisonResult === 0;
    const future: boolean = comparisonResult > 0;
    const type: DayType = today ? 'today' : past ? 'past' : 'future';

    const monthName: string = format(day, 'LLLL').toLowerCase(); // only month name
    const dayName: string = format(day, 'iiii').toLowerCase(); // only day name

    const disabled: boolean = Number.isNaN(comparisonResult);
    const visible: boolean = !!this.data[date];
    // const selected: boolean = false;

    const names: string[] = this.data[date] || [];

    const classList: string[] = [
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

    const resultObj: Day = {
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
