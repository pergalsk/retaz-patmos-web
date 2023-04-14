import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  CommonApiService,
  SysdateResponse,
  DatesResponse,
  PutNameRequest,
  PutNameResponse,
} from '@services/common-api.service';
import { ModalContentComponent } from '../../../../modal-content/modal-content.component';
import { CalendarData, SelectedDate } from '../../../calendar/calendar.types';
import { CalendarComponent } from '../../../calendar/calendar.component';
import { NgxCalI18nSk } from '../../../calendar/i18n-sk';
import { NgxCalI18n } from '../../../calendar/i18n';

@Component({
  selector: 'app-page-year2023',
  templateUrl: './page-year2023.component.html',
  providers: [{ provide: NgxCalI18n, useClass: NgxCalI18nSk }],
})
export class PageYear2023Component implements OnInit, OnDestroy {
  @ViewChild(CalendarComponent) calendarRef: CalendarComponent;

  rawDates: DatesResponse[] = [];
  sysDate: string = null;
  sysTime: string = null;
  calendarData: CalendarData<string[]> = null;
  calendarOptions: any = null;
  modalRef: any = null;
  getCalendarError = false;
  submitError = false;
  storageKey = 'registration_name';
  overrides = {
    '2023-04-07': {
      title: 'Veľký piatok',
      highlighted: true,
    },
  };

  constructor(private modalService: NgbModal, private commonApiService: CommonApiService) {}

  ngOnInit(): void {
    this.getCalendarError = false;

    zip(this.commonApiService.getDates('2023'), this.commonApiService.getSysDateTime())
      .pipe(map(([rawDates, sysDateTime]) => ({ rawDates, sysDateTime })))
      .subscribe(this.handleSuccess, this.handleError); // todo: unsubscribe
  }

  ngOnDestroy() {
    this.modalService.dismissAll();
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
      // titleDateFormat: '',
      // separateMonths: false,
    };

    this.calendarData = this.generateCalendarData(this.rawDates);
  };

  private handleError(error: any): void {
    this.getCalendarError = true;
    console.log(error);
  }

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
    const dateA = a.date;
    const dateB = b.date;

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

    let dates: string[] = selectedDates.map((date) => date.day.date);
    let name: string = (window.localStorage.getItem(this.storageKey) || '').trim().substring(0, 25);

    this.modalRef = this.modalService.open(ModalContentComponent, {
      animation: true,
      centered: true,
    });

    this.modalRef.componentInstance.data = {
      name,
      dates,
    };

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

      const submitData: PutNameRequest = {
        dates,
        name,
      };

      window.localStorage.setItem(this.storageKey, name);

      this.submitError = false;
      this.commonApiService.submitAnswers(submitData).subscribe(
        (resp: PutNameResponse) => {
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

          console.log(resp);
        },
        (error: any) => {
          this.submitError = true;
          console.log(error);
        }
      );
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
