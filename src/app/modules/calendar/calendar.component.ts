import {
  ChangeDetectorRef,
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
import sk from 'date-fns/locale/sk';
import {
  Calendar,
  CalendarDataProps,
  CalendarDataEntries,
  CalendarData,
  WeekType,
  DayType,
  Week,
  Day,
  SelectedDate,
} from './calendar.types';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit, OnChanges {
  @Input() data: CalendarData<string[]>;
  @Input() options: any;
  @Output() cellAction: EventEmitter<SelectedDate[]> = new EventEmitter<SelectedDate[]>();

  calendar: any = null;
  sysDate: Date = null;
  sysTime = '';
  collapsedWeeks = false;
  selectedDates: SelectedDate[] = [];

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
    sysDate: new Date(),
    sysTime: new Date(),
    rawDateFormat: 'yyyy-MM-dd',
    titleDateFormat: 'd. LLLL',
    header: true,
    separateMonths: false,
    overrides: null as any,
    collapsedWeeks: false,
    multiselect: false,
    disabledPast: false,
    disabledToday: false,
    disabledFuture: false,
  };

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (!this.data) {
      return;
    }

    this.build();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.build();
  }

  onDateClick(selectedDate: SelectedDate): void {
    const { day, weekIndex, dayIndex } = selectedDate;

    console.log(
      `Click on date ${day.date} fired! [weekIndex=${weekIndex}, dayIndex=${dayIndex}, ` +
        `visible=${day.visible}, disabled=${day.disabled}, type="${day.type}"]`
    );

    if (!this.isDayClickable(day)) {
      return;
    }

    this.addSelectedDate(selectedDate);

    if (this.calendarOptions.multiselect) {
      this.toggleDateProperty(selectedDate, 'selected');
      return;
    }

    this.emitAction(this.selectedDates);
    this.selectedDates = [];
  }

  onMultiselectActionClick(): void {
    this.emitAction(this.selectedDates);
  }

  onMultiselectCancelClick(): void {
    this.clearSelections();
  }

  clearSelections() {
    this.selectedDates = [];
    this.setAllDatesProperty('selected', false);
    this.cdr.markForCheck();
  }

  emitAction(selectedDates: SelectedDate[]): void {
    this.cellAction.emit(selectedDates);
  }

  toggleWeeks(): void {
    this.collapsedWeeks = !this.collapsedWeeks;
  }

  addSelectedDate(selectedDate: SelectedDate): void {
    const { day } = selectedDate;

    const index = this.selectedDates.findIndex(
      (selDate: SelectedDate) => selDate.day?.date === day.date
    );

    if (index === -1) {
      this.selectedDates = [...this.selectedDates, selectedDate];
      return;
    }

    this.selectedDates.splice(index, 1);
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

  private isDayClickable(day: Day): boolean {
    return day.visible && !day.disabled;
  }

  private setAllDatesProperty(property: string, value: any): void {
    for (const week of this.calendar.weeks) {
      for (const day of week.days) {
        day[property] = value;
      }
    }

    this.calendar = this.____shallowCopy(this.calendar);
  }

  private toggleDateProperty(selectedDate: SelectedDate, property: string): void {
    const { weekIndex, dayIndex } = selectedDate;

    this.calendar.weeks[weekIndex].days[dayIndex][property] =
      !this.calendar.weeks[weekIndex].days[dayIndex][property];

    this.calendar = this.____shallowCopy(this.calendar);
  }

  private ____shallowCopy(obj: Object): Object {
    // TODO: WARNING! this is just a shallow copy!
    // it's necessary to make a child element to not to regenerate whole calendar
    // or do a proper deep copy
    return Object.assign({}, obj);
  }

  private generateCalendarData(startDate: string, endDate: string, referenceDate: Date): Calendar {
    if (!startDate || !endDate || !referenceDate) {
      return {
        pastWeeksCount: 0,
        classList: [],
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

    const classList: string[] = [
      this.calendarOptions.header ? 'with-header' : null,
      this.calendarOptions.separateMonths ? 'separate-months' : null,
      this.calendarOptions.multiselect ? 'multiselect' : null,
      // this.calendarOptions.collapsedWeeks ? 'collapsed-weeks' : null, // todo: better choice is new option 'collapsibleWeeks'
      this.calendarOptions.disabledPast ? 'disabled-past' : null,
      this.calendarOptions.disabledToday ? 'disabled-today' : null,
      this.calendarOptions.disabledFuture ? 'disabled-future' : null,
    ].filter(Boolean);

    return {
      pastWeeksCount,
      classList,
      weeks,
    };
  }

  private mapWeeks = (weekStartDate: Date): Week => {
    const start: Date = startOfISOWeek(weekStartDate);
    const end: Date = endOfISOWeek(weekStartDate);
    const days: Day[] = eachDayOfInterval({ start, end }).map(this.mapDays);
    const month: number = getMonth(weekStartDate) + 1; // counting from zero correction
    const monthName: string = format(weekStartDate, 'LLLL', { locale: sk }).toLowerCase(); // only month name
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
      classList,
      days,
    };
  };

  private mapDays = (day: Date): Day => {
    const date: string = format(day, this.calendarOptions.rawDateFormat, { locale: sk });
    const monthDay: number = getDate(day);
    const weekDay: number = getDay(day) || 7; // with sunday correction 0 -> 7
    const month: number = getMonth(day) + 1; // counting from zero correction
    const weekend: boolean = isWeekend(day);
    const week: number = getISOWeek(day);
    const monthName: string = format(day, 'LLLL', { locale: sk }).toLowerCase(); // only month name
    const dayName: string = format(day, 'iiii', { locale: sk }).toLowerCase(); // only day name

    const title: string = /*this.monthNames[month - 1] + ' ' + monthDay;*/ format(
      day,
      this.calendarOptions.titleDateFormat,
      { locale: sk }
    );

    const comparisonResult: number = compareAsc(day, this.sysDate);
    const past: boolean = comparisonResult < 0;
    const today: boolean = comparisonResult === 0;
    const future: boolean = comparisonResult > 0;
    const type: DayType = today ? 'today' : past ? 'past' : 'future';

    const visible: boolean = !!this.data[date as keyof CalendarData<string[]>];
    const selected: boolean = false;
    const disabled: boolean =
      (this.calendarOptions.disabledPast && past) ||
      (this.calendarOptions.disabledToday && today) ||
      (this.calendarOptions.disabledFuture && future) ||
      Number.isNaN(comparisonResult);

    const names: any = this.data[date as keyof CalendarData<string[]>] || [];

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
      selected,
      weekDay,
      monthDay,
      month,
      week,
      weekend,
      past,
      today,
      future,
      type,
      classList,
      names,
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
