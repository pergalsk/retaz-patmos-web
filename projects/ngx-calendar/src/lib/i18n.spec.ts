import { NgxCalI18n } from './i18n';

describe('NgxCalI18n service', () => {
  let i18nService: NgxCalI18n;

  beforeEach(() => {
    i18nService = new NgxCalI18n();
  });

  it('has to be instantiated', () => {
    expect(i18nService).toBeTruthy();
  });

  it('getMonthNames function should be defined', () => {
    expect(i18nService.getMonthNames).toBeDefined();
  });

  it('getMonthNames function should return correct data', () => {
    expect(i18nService.getMonthNames()).toEqual([
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]);
  });

  it('getDayNames function should be defined', () => {
    expect(i18nService.getDayNames).toBeDefined();
  });

  it('getDayNames function should return correct data', () => {
    expect(i18nService.getDayNames()).toEqual([
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ]);
  });
});
