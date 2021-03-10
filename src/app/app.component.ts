import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, zip, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from './modal-content/modal-content.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  rawDates: Array<any> = [];
  sysDate: string = null;
  sysTime: string = null;
  calendarData: any = null;
  calendarOptions: any = null;
  modalRef = null;
  getCalendarError = false;
  submitError = false;
  panelContentIndex = 0;

  panelMenuItems = [
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
  ];

  constructor(private httpClient: HttpClient, private modalService: NgbModal) {}

  private handleSuccess = (data) => {
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

  onDateClick(event): void {
    if (this.modalRef || !event) {
      return;
    }

    const { weekIndex, dayIndex, day, week, calendar } = event;

    if (!day || !day.date || !day.future) {
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

    this.modalRef.result
      .then((result) => {
        this.modalRef = null;
        console.log(result);

        if (!result || typeof result !== 'string') {
          return;
        }

        const name = result.trim().substring(0, 25);

        const submitData = {
          date,
          name,
        };

        this.submitError = false;
        this.submitAnswers(submitData).subscribe(
          (resp) => {
            if (Array.isArray(resp)) {
              this.calendarData = {
                ...this.calendarData,
                [date]: [...resp],
              };
            }

            this.submitError = false;
            console.log(resp);
          },
          (error) => {
            this.submitError = true;
            console.log(error);
          }
        );
      })
      .catch((dismiss) => {
        this.modalRef = null;
        console.log(dismiss);
      });
  }

  selectPanelContent(menuItemSelectedId: number): void {
    this.panelContentIndex = menuItemSelectedId;
  }

  ngOnInit(): void {
    this.getCalendarError = false;
    this.panelContentIndex = this.panelMenuItems.length - 1;

    zip(this.getDates(), this.getSysDateTime())
      .pipe(map(([rawDates, sysDateTime]) => ({ rawDates, sysDateTime })))
      .subscribe(this.handleSuccess, this.handleError); // todo: unsubscribe
  }

  private generateCalendarData(rawDates): any {
    const calendarData: any = {};

    if (Array.isArray(rawDates) && rawDates.length > 0) {
      rawDates.sort(this.sortString).forEach((item) => {
        if (item.date) {
          calendarData[item.date] = item.names || [];
        }
      });
      calendarData.start = rawDates[0]?.date;
      calendarData.end = rawDates[rawDates.length - 1]?.date;
    }

    return calendarData;
  }

  private sortString = (a, b) => {
    const dateA = a.date;
    const dateB = b.date;

    if (dateA < dateB) {
      return -1;
    }

    if (dateA > dateB) {
      return 1;
    }

    return 0;
  };

  private handleError = (error) => {
    this.getCalendarError = true;
    console.log(error);
  };

  private getDates = () => {
    return this.loadDates() /*.pipe(
      // map((formSchema) => this.processFormSchema(formSchema)),
      // catchError(this.handleError('Formulár sa nepodarilo načítať.'))
    )*/;
  };

  private getSysDateTime(): Observable<any> {
    return this.httpClient.get('/api/sysdate');
  }

  private loadDates(): Observable<any> {
    return this.httpClient.get('/api/dates');
  }

  private submitAnswers(submitData): Observable<any> {
    return this.httpClient.put('/api/dates', submitData);
  }
}
