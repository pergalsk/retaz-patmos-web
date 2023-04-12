import { Injectable } from '@angular/core';
import { I18n } from './i18n-abstract';

@Injectable({
  providedIn: 'root',
})
export class I18nSk implements I18n {
  getMonthNames(): string[] {
    return [
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
  }
  getDayNames(): string[] {
    return ['Pondelok', 'Utorok', 'Streda', 'Štvrtok', 'Piatok', 'Sobota', 'Nedeľa'];
  }
}
