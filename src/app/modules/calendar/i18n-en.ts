import { Injectable } from '@angular/core';
import { I18n } from './i18n-abstract';

@Injectable({
  providedIn: 'root',
})
export class I18nEn implements I18n {
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
