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
  TemplateRef,
  ViewContainerRef,
  ViewChild,
  inject,
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
  CalendarData,
  WeekType,
  WeekTypes,
  DayType,
  DayTypes,
  Week,
  Day,
  SelectedDate,
} from './calendar.types';
import { NgxCalI18n } from './i18n';
import { HeaderCellContext, HeaderContext, NgxCalHeader } from './header';
import { DayTemplateContext, NgxCalDay } from './day';
import { NgIf, NgClass, NgFor, NgTemplateOutlet } from '@angular/common';

export interface MultiToolbarContext {
  $implicit: number;
  actions: {
    cancelClick: () => void;
    actionClick: () => void;
  };
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, NgClass, NgxCalHeader, NgFor, NgxCalDay, NgTemplateOutlet],
})
export class CalendarComponent implements OnInit, OnChanges {
  @Input()
  data: CalendarData<string[]>;

  @Input()
  overrides: any = null;

  @Input()
  options: any;

  @Input()
  header: boolean = true;

  @Input()
  multiselect: boolean = false;

  @Input()
  disabledPast: boolean = false;

  @Input()
  disabledToday: boolean = false;

  @Input()
  disabledFuture: boolean = false;

  @Input('headerTemplate')
  headerTpl?: TemplateRef<HeaderContext>;

  @Input('headerCellTemplate')
  headerCellTpl?: TemplateRef<HeaderCellContext>;

  @Input('dayTemplate')
  dayTpl?: TemplateRef<DayTemplateContext>;

  @Input('dayTemplateData')
  dayTplData?: any;

  @Input('multiToolbarTemplate')
  multiToolbarTpl: TemplateRef<MultiToolbarContext>;

  @Output()
  cellAction: EventEmitter<SelectedDate[]> = new EventEmitter<SelectedDate[]>();

  @ViewChild('multiToolbarTpl')
  multiToolbarTplRef!: TemplateRef<any>;

  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private i18n: NgxCalI18n = inject(NgxCalI18n);

  calendar: any = null;
  sysDate: Date = null;
  sysTime: string = '';
  collapsedWeeks: boolean = false;
  selectedDates: SelectedDate[] = [];
  dayNames: string[] = this.i18n.getDayNames();
  monthNames: string[] = this.i18n.getMonthNames();

  context: MultiToolbarContext = {
    $implicit: this.selectedDates.length,
    actions: {
      cancelClick: () => this.onMultiselectCancelClick(),
      actionClick: () => this.onMultiselectActionClick(),
    },
  };

  calendarOptions: any = {};
  defaultOptions = {
    sysDate: new Date(),
    sysTime: new Date(),
    rawDateFormat: 'yyyy-MM-dd',
    titleDateFormat: 'd. LLLL',
    separateMonths: false,
    collapsedWeeks: false,
  };

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
        `visible=${day.visible}, disabled=${day.disabled}, type="${day.type}"]`,
    );

    if (!this.isDayClickable(day)) {
      return;
    }

    this.addSelectedDate(selectedDate);

    if (this.multiselect) {
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
      (selDate: SelectedDate) => selDate.day?.date === day.date,
    );

    if (index === -1) {
      this.selectedDates = [...this.selectedDates, selectedDate];
      this.context.$implicit = this.selectedDates.length;
      return;
    }

    this.selectedDates.splice(index, 1);
    this.context.$implicit = this.selectedDates.length;
  }

  private build(): void {
    const referenceDate: Date = new Date();

    if (this.options) {
      Object.assign(this.calendarOptions, this.defaultOptions, this.options);
    }

    this.sysDate = parse(
      this.calendarOptions?.sysDate,
      this.calendarOptions.rawDateFormat,
      referenceDate,
    );
    this.sysTime = this.calendarOptions?.sysTime;

    this.collapsedWeeks = this.calendarOptions.collapsedWeeks;

    this.calendar = this.generateCalendarData(this.data?.start, this.data?.end, referenceDate);
  }

  getSelectedDatesText(num: number): string {
    if (!num) {
      return '';
    }

    if (num === 1) {
      return 'označený dátum';
    } else if (num <= 4) {
      return 'označené dátumy';
    }
    return 'označených dátumov';
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
      this.header ? 'with-header' : null,
      this.calendarOptions.separateMonths ? 'separate-months' : null,
      this.multiselect ? 'multiselect' : null,
      // this.calendarOptions.collapsedWeeks ? 'collapsed-weeks' : null, // todo: better choice is new option 'collapsibleWeeks'
      this.disabledPast ? 'disabled-past' : null,
      this.disabledToday ? 'disabled-today' : null,
      this.disabledFuture ? 'disabled-future' : null,
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
    const type: WeekType = actual ? WeekTypes.ACTUAL : past ? WeekTypes.PAST : WeekTypes.FUTURE;

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
      { locale: sk },
    );

    const comparisonResult: number = compareAsc(day, this.sysDate);
    const past: boolean = comparisonResult < 0;
    const today: boolean = comparisonResult === 0;
    const future: boolean = comparisonResult > 0;
    const type: DayType = today ? DayTypes.TODAY : past ? DayTypes.PAST : DayTypes.FUTURE;

    const visible: boolean = !!this.data[date as keyof CalendarData<string[]>];
    const highlighted: boolean = weekDay === 7;
    const selected: boolean = false;
    const disabled: boolean =
      (this.disabledPast && past) ||
      (this.disabledToday && today) ||
      (this.disabledFuture && future) ||
      Number.isNaN(comparisonResult);

    const classList: string[] = [];

    const names: any = this.data[date as keyof CalendarData<string[]>] || [];

    const resultObj: Day = {
      date,
      title,
      visible,
      highlighted,
      selected,
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
      classList,
      names,
    };

    // todo refactor:
    if (this.overrides?.[date]) {
      Object.assign(resultObj, this.overrides?.[date]);
      resultObj.classList = resultObj.classList.concat(this.overrides?.[date]?.classes);
    }

    return resultObj;
  };
}
