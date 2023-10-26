import { Injectable } from '@angular/core';

export abstract class NgxCalAbstractI18n {
  getDayNames: () => string[];
  getMonthNames: () => string[];
}

@Injectable({
  providedIn: 'root',
})
export class NgxCalI18n implements NgxCalAbstractI18n {
  getMonthNames(): string[] {
    return [
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
    ];
  }
  getDayNames(): string[] {
    return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  }
}
