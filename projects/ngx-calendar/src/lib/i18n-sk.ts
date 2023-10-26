import { Injectable } from '@angular/core';
import { NgxCalAbstractI18n } from './i18n';

@Injectable({
  providedIn: 'root',
})
export class NgxCalI18nSk implements NgxCalAbstractI18n {
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
