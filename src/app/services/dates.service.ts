import { Injectable } from '@angular/core';
import {
  isValid,
  isWithinInterval,
  parse,
  setHours,
  setMilliseconds,
  setMinutes,
  setSeconds,
} from 'date-fns';
import sk from 'date-fns/locale/sk';

// matches from 1000-01-01 to 2999-12-31 (with impossible dates like 2000-02-31)
const regExp = /^[1-2][0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;

@Injectable({
  providedIn: 'root',
})
export class DatesService {
  constructor() {}

  parseISODateBetween(
    date: string,
    options: { start: Date; end: Date },
    refDate?: Date
  ): Date | null {
    if (!date) {
      return null;
    }

    const parsed: Date | null = this.parseISODate(date, refDate);

    if (!parsed) {
      return null;
    }

    return isWithinInterval(parsed, options) ? parsed : null;
  }

  parseISODate(date: string, refDate?: Date): Date | null {
    if (!date) {
      return null;
    }

    if (!this.isISODateString(date)) {
      return null;
    }

    let parsed: Date | null;

    try {
      parsed = parse(date, 'yyyy-MM-dd', refDate || new Date(), { locale: sk });
    } catch (e) {
      parsed = null;
    }

    return isValid(parsed) ? parsed : null;
  }

  isISODateString(date: string): boolean {
    return regExp.test(date);
  }

  resetTime(
    dateTime: Date,
    hours: number = 0,
    minutes: number = 0,
    seconds: number = 0,
    ms: number = 0
  ): Date {
    return setMilliseconds(setSeconds(setMinutes(setHours(dateTime, hours), minutes), seconds), ms);
  }
}
