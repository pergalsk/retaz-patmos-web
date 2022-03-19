import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, zip, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from '../../../../modal-content/modal-content.component';
import { CalendarData } from '../../../shared/components/calendar/calendar.component';
import { PanelMenuItem } from '../../components/panel-menu/panel-menu.component';
import { SysdateResponse, CommonApiService } from '../../../../services/common-api.service';

export interface DatesResponse {
  id: number;
  date: string;
  names: string[];
  timestamp: string;
}

export interface PutNameRequest {
  date: string;
  name: string;
}

export interface CalendarOptions {
  sysDate: string;
  sysTime: string;
  header: true;
  separateMonths: boolean;
  collapsedWeeks: boolean;
  // multiselect: true;
  // rawDateFormat: string,
  // titleDateFormat: string,
  overrides: {
    '2021-04-02': {
      title: string;
      classes: string[];
    };
  };
}

@Component({
  selector: 'app-page-year2021',
  templateUrl: './page-year2021.component.html',
  styleUrls: ['./page-year2021.component.scss'],
})
export class PageYear2021Component implements OnInit {
  rawDates: DatesResponse[] = [];
  sysDate: string = null;
  sysTime: string = null;
  calendarData: CalendarData<string[]> = null;
  calendarOptions: any = null;
  modalRef: any = null;
  getCalendarError = false;
  submitError = false;
  panelContentIndex = 0;

  panelMenuItems: PanelMenuItem[] = [
    {
      title: 'Návrat k Bohu celým srdcom',
      subtitle: 'Modlitebná téma | 17.2. - 21.2.',
    },
    {
      title: 'Služby v našom zbore',
      subtitle: 'Modlitebná téma | 22.2. - 28.2.',
    },
    {
      title: 'Misijné zameranie',
      subtitle: 'Modlitebná téma | 1.3. - 7.3.',
    },
    {
      title: 'Vykupujte čas!',
      subtitle: 'Modlitebná téma | 8.3. - 14.3.',
    },
    {
      title: 'Vrchnosti',
      subtitle: 'Modlitebná téma | 15.3. - 21.3.',
    },
    {
      title: 'Vzťahy',
      subtitle: 'Modlitebná téma | 22.3. - 28.3.',
    },
    {
      title: 'Obživenie',
      subtitle: 'Modlitebná téma | 29.3. - 2.4.',
    },
  ];

  constructor(
    private httpClient: HttpClient,
    private modalService: NgbModal,
    private commonApiService: CommonApiService
  ) {}

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
        '2021-04-02': {
          title: 'Veľký piatok',
          classes: ['highlighted'],
        },
      },
    };

    this.calendarData = this.generateCalendarData(this.rawDates);
  };

  onDateClick(event: any): void {
    if (this.modalRef || !event) {
      return;
    }

    const { weekIndex, dayIndex, day, week, calendar } = event;

    if (!day?.date || !day?.future) {
      return;
    }

    const { date } = day;

    this.modalRef = this.modalService.open(ModalContentComponent, {
      centered: true,
      size: 'sm',
    });

    this.modalRef.componentInstance.date = {
      date,
    };

    this.modalRef.result.then(this.onClickModalResult(date)).catch(this.onClickModalCatch);
  }

  onClickModalResult(date): (result: string) => void {
    return (result: string) => {
      this.modalRef = null;

      console.log('Entered text: ', result);

      if (!result || typeof result !== 'string') {
        return;
      }

      const name: string = result.trim().substring(0, 25);

      const submitData: PutNameRequest = {
        date,
        name,
      };

      this.submitError = false;
      this.submitAnswers(submitData).subscribe(
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
    this.modalRef = null;
    console.log(dismiss);
  };

  selectPanelContent(menuItemSelectedId: number): void {
    this.panelContentIndex = menuItemSelectedId;
  }

  ngOnInit(): void {
    this.getCalendarError = false;
    this.panelContentIndex = this.panelMenuItems.length - 1;

    zip(this.getDates(), this.commonApiService.getSysDateTime())
      .pipe(map(([rawDates, sysDateTime]) => ({ rawDates, sysDateTime })))
      .subscribe(this.handleSuccess, this.handleError); // todo: unsubscribe
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

  private handleError(error: any): void {
    this.getCalendarError = true;
    console.log(error);
  }

  private getDates(): any {
    return this.loadDates() /*.pipe(
      // map((formSchema) => this.processFormSchema(formSchema)),
      // catchError(this.handleError('Formulár sa nepodarilo načítať.'))
    )*/;
  }

  private loadDates(): Observable<DatesResponse[]> {
    return this.httpClient.get<DatesResponse[]>('/api/dates');
  }

  private submitAnswers(submitData: PutNameRequest): Observable<string[]> {
    return this.httpClient.put<string[]>('/api/dates', submitData);
  }
}
