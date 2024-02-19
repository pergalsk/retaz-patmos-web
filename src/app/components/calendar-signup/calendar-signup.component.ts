import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { Subscription, tap, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {
  CommonApiService,
  DatesResponse,
  PutNameRequest,
  PutNameResponse,
  SysdateResponse,
} from '@services/common-api.service';
import { NgxCalI18n } from 'projects/ngx-calendar/src/lib/i18n';
import { NgxCalI18nSk } from 'projects/ngx-calendar/src/lib/i18n-sk';
import { CalendarComponent } from 'projects/ngx-calendar/src/lib/calendar.component';
import { CalendarData, SelectedDate } from 'projects/ngx-calendar/src/lib/calendar.types';
import { ModalContentComponent } from '../modal-content/modal-content.component';
import { NgxCalDayTitle } from 'projects/ngx-calendar/src/lib/day-title';
import { CalendarComponent as CalendarComponent_1 } from 'projects/ngx-calendar/src/lib/calendar.component';
import { SvgCalendarComponent } from '@components/svg-calendar/svg-calendar.component';

export interface CalendarOptions {
  sysDate: string;
  sysTime: string;
  header: true;
  separateMonths: boolean;
  collapsedWeeks: boolean;
  multiselect: false;
  // rawDateFormat: string,
  titleDateFormat: string;
  mobileTitleDateFormat: string;
  overrides: {
    '2021-04-02': {
      title: string;
      classes: string[];
    };
  };
}

@Component({
  selector: 'app-calendar-signup',
  templateUrl: './calendar-signup.component.html',
  styleUrls: ['./calendar-signup.component.scss'],
  providers: [{ provide: NgxCalI18n, useClass: NgxCalI18nSk }],
  standalone: true,
  imports: [SvgCalendarComponent, NgIf, CalendarComponent_1, NgxCalDayTitle, NgFor],
})
export class CalendarSignupComponent implements OnInit, OnDestroy {
  @Input() year: string = null;
  @Input() overrides: any = null;
  @Output() cellAction: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(CalendarComponent) calendarRef: CalendarComponent;

  rawDates: DatesResponse[] = [];
  sysDate: string = null;
  sysTime: string = null;
  calendarData: CalendarData<string[]> = null;
  calendarOptions: any = null;
  modalRef: any = null;
  getCalendarError: boolean = false;
  submitError: boolean = false;
  storageKey = 'registration_name';

  subscription$: Subscription;

  constructor(
    private modalService: NgbModal,
    private commonApiService: CommonApiService,
  ) {}

  ngOnInit(): void {
    this.getCalendarError = false;

    this.subscription$ = zip(
      this.commonApiService.getDates(this.year),
      this.commonApiService.getSysDateTime(),
    )
      .pipe(
        map(([rawDates, sysDateTime]) => ({ rawDates, sysDateTime })),
        tap({ error: this.handleError }),
      )
      .subscribe(this.handleSuccess);
  }

  ngOnDestroy() {
    this.modalService.dismissAll();
    this.subscription$?.unsubscribe();
  }

  private handleSuccess = (data: { rawDates: DatesResponse[]; sysDateTime: SysdateResponse }) => {
    this.getCalendarError = false;

    this.rawDates = data?.rawDates;
    this.sysDate = data?.sysDateTime?.sysdate;
    this.sysTime = data?.sysDateTime?.systime;

    this.calendarOptions = {
      sysDate: this.sysDate,
      sysTime: this.sysTime,
      collapsedWeeks: true,
      // rawDateFormat: '',
      titleDateFormat: 'd. LLLL',
      mobileTitleDateFormat: 'eeeeee, d. LLLL',
      // separateMonths: false,
    };

    this.calendarData = this.generateCalendarData(this.rawDates);
  };

  private handleError = (error: any): void => {
    this.getCalendarError = true;
    console.log(error);
  };

  private generateCalendarData(rawDates: DatesResponse[]): any {
    const calendarData: CalendarData<string[]> = {
      start: null,
      end: null,
    };

    if (Array.isArray(rawDates) && rawDates.length > 0) {
      rawDates.sort(this.sortString).forEach((item: DatesResponse) => {
        if (item.date) {
          calendarData[item.date] = item.names || [];
        }
      });
      calendarData.start = rawDates[0]?.date;
      calendarData.end = rawDates[rawDates.length - 1]?.date;
    }

    return calendarData;
  }

  private sortString(a: DatesResponse, b: DatesResponse): number {
    const dateA: string = a.date;
    const dateB: string = b.date;

    if (dateA < dateB) {
      return -1;
    }

    if (dateA > dateB) {
      return 1;
    }

    return 0;
  }

  onDateClick(selectedDates: SelectedDate[]): void {
    if (!Array.isArray(selectedDates) || selectedDates.length < 1) {
      return;
    }

    let dates: string[] = selectedDates.map((date: SelectedDate) => date.day.date);
    let name: string = (window.localStorage.getItem(this.storageKey) || '').trim().substring(0, 25);

    this.modalRef = this.modalService.open(ModalContentComponent, {
      animation: true,
      centered: true,
    });

    this.modalRef.componentInstance.data = { name, dates };

    this.modalRef.result.then(this.onClickModalResult(dates)).catch(this.onClickModalCatch);
  }

  onClickModalResult(dates: string[]): (result: string) => void {
    return (result: string) => {
      this.modalRef.close();

      console.log('Entered text: ', result);

      if (!result || typeof result !== 'string') {
        return;
      }

      const name: string = result.trim().substring(0, 25);

      const submitData: PutNameRequest = { dates, name };

      window.localStorage.setItem(this.storageKey, name);

      this.submitError = false;
      this.commonApiService.submitAnswers(submitData).subscribe({
        next: (resp: PutNameResponse) => {
          if (!resp) {
            return;
          }
          if (typeof resp !== 'object' || Array.isArray(resp)) {
            return;
          }

          for (const date in resp) {
            this.calendarData = {
              ...this.calendarData,
              [date]: [...resp[date]],
            };
          }

          this.submitError = false;
          this.calendarRef.clearSelections();
          this.cellAction.emit(dates);

          console.log(resp);
        },
        error: (error: any) => {
          this.submitError = true;
          console.log(error);
        },
      });
    };
  }

  onClickModalCatch = (dismiss: any): void => {
    this.modalRef.close();
    if (!this.modalRef.componentInstance?.name) {
      window.localStorage.removeItem('registration_name');
    }
    console.log(dismiss);
  };
}
