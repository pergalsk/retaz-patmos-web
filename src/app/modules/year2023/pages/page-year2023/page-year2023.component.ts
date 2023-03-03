import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  CommonApiService,
  SysdateResponse,
  DatesResponse,
  PutNameRequest,
} from '../../../../services/common-api.service';
import { ModalContentComponent } from '../../../../modal-content/modal-content.component';
import { CalendarData } from '../../../shared/components/calendar/calendar.component';

@Component({
  selector: 'app-page-year2023',
  templateUrl: './page-year2023.component.html',
  styleUrls: ['./page-year2023.component.scss'],
})
export class PageYear2023Component implements OnInit, OnDestroy {
  rawDates: DatesResponse[] = [];
  sysDate: string = null;
  sysTime: string = null;
  calendarData: CalendarData<string[]> = null;
  calendarOptions: any = null;
  modalRef: any = null;
  getCalendarError = false;
  submitError = false;
  storageKey = 'registration_name';

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
      header: true,
      separateMonths: false,
      collapsedWeeks: true,
      // rawDateFormat: '',
      // titleDateFormat: '',
      overrides: {
        '2023-04-07': {
          title: 'Veľký piatok',
          classes: ['highlighted'],
        },
      },
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

  onDateClick(event: any): void {
    if (!event) {
      return;
    }

    const { day } = event;

    if (!day?.date || !day?.future) {
      return;
    }

    const { date } = day;

    this.modalRef = this.modalService.open(ModalContentComponent, {
      animation: true,
      centered: true,
    });

    const storageData = window.localStorage.getItem(this.storageKey);
    if (storageData && storageData !== '') {
      this.modalRef.componentInstance.name = storageData;
    }

    this.modalRef.componentInstance.date = {
      date,
    };

    this.modalRef.result.then(this.onClickModalResult(date)).catch(this.onClickModalCatch);
  }

  onClickModalResult(date: string): (result: string) => void {
    return (result: string) => {
      this.modalRef.close();

      console.log('Entered text: ', result);

      if (!result || typeof result !== 'string') {
        return;
      }

      const name: string = result.trim().substring(0, 25);

      const submitData: PutNameRequest = {
        date,
        name,
      };

      window.localStorage.setItem(this.storageKey, name);

      this.submitError = false;
      this.commonApiService.submitAnswers(submitData).subscribe(
        (resp: string[]) => {
          if (Array.isArray(resp)) {
            this.calendarData = {
              ...this.calendarData,
              [date]: [...resp],
            };
          }

          this.submitError = false;
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
