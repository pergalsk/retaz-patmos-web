import { NgxCalI18nSk } from './i18n-sk';

describe('NgxCalI18nSk service', () => {
  let i18nService: NgxCalI18nSk;

  beforeEach(() => {
    i18nService = new NgxCalI18nSk();
  });

  it('has to be instantiated', () => {
    expect(i18nService).toBeTruthy();
  });

  it('getMonthNames function should be defined', () => {
    expect(i18nService.getMonthNames).toBeDefined();
  });

  it('getMonthNames function should return correct data', () => {
    expect(i18nService.getMonthNames()).toEqual([
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
    ]);
  });

  it('getDayNames function should be defined', () => {
    expect(i18nService.getDayNames).toBeDefined();
  });

  it('getDayNames function should return correct data', () => {
    expect(i18nService.getDayNames()).toEqual([
      'Pondelok',
      'Utorok',
      'Streda',
      'Štvrtok',
      'Piatok',
      'Sobota',
      'Nedeľa',
    ]);
  });
});
