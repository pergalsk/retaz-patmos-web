export interface CalendarDataProps {
  start: string;
  end: string;
  [key: string]: any;
}

export type CalendarDataEntries<T> = { [Key: string]: T };
export type CalendarData<T> = (CalendarDataEntries<T> & CalendarDataProps) | CalendarDataProps;

export type WeekType = 'actual' | 'past' | 'future';
export type DayType = 'today' | 'past' | 'future';

export interface Calendar {
  pastWeeksCount: number;
  classList: string[];
  weeks: Week[];
}

export interface Week {
  week: number;
  past: boolean;
  actual: boolean;
  future: boolean;
  type: WeekType;
  classList: string[];
  days: Day[];
}

export interface Day {
  date: string;
  title: string;
  visible: boolean;
  selected: boolean;
  disabled: boolean;
  weekDay: number;
  monthDay: number;
  month: number;
  week: number;
  weekend: boolean;
  past: boolean;
  today: boolean;
  future: boolean;
  type: DayType;
  classList: string[];
  names: string[] | [];
}

export interface SelectedDate {
  weekIndex: number;
  dayIndex: number;
  day: Day;
  // week: Week;
  // calendar: Calendar;
  // selection: number[][];
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
  multiselect: boolean;
}*/
