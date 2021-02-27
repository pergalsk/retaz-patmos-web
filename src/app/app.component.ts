import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, zip, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from './modal-content/modal-content.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  datesRaw: Array<any> = [];
  calendarStructure: Array<any> = [];
  dates: any = null;
  calendarOpt: any = null;
  modalRef = null;
  sysDate: string = null;
  sysTime: string = null;
  getCalendarError = false;
  submitError = false;
  panelContent = 0;

  panelMenuItems = [{
    title: 'Návrat k Bohu celým srdcom',
    subtitle: 'Modlitebná téma | 17.2. - 21.2.',
  }, {
    title: 'Služby v našom zbore',
    subtitle: 'Modlitebná téma | 22.2. - 28.2.',
  }/*, {
    title: 'Téma 3',
    subtitle: 'Modlitebná téma | 1.3. - 7.3.',
  }*/];

  constructor(
    private httpClient: HttpClient,
    private modalService: NgbModal
  ) {}

  private handleSuccess = (data) => {

    this.getCalendarError = false;

    this.datesRaw = data?.dates;
    this.sysDate = data?.sysDateTime?.sysdate;
    this.sysTime = data?.sysDateTime?.systime;

    if (Array.isArray(this.datesRaw)) {
      this.dates = {};

      this.datesRaw.sort(this.sortString);

      this.datesRaw.forEach((item) => {
        const { date, names } = item;

        if (date) {
          const namesLength = Array.isArray(names) ? names.length : 0;

          const sysDate = new Date(this.sysDate + 'T00:00:00');
          const jsDate = new Date(date + 'T00:00:00'); // appendix maybe not necessary
          const weekDay = jsDate.getDay() || 7; // 0 - sunday
          const month = parseInt(date.substring(5, 7) || 0, 10); // parse month number

          const today = date === this.sysDate;
          const past = sysDate.getTime() > jsDate.getTime();
          const future = sysDate.getTime() < jsDate.getTime();
          const type = today ? 'today' : (past ? 'past' : 'future');

          this.dates[item.date] = {
            names: names || [],
            namesLength,
            weekDay,
            month,
            past,
            today,
            future,
            type
          };
        }
      });
    }

    /* comp */
    this.calendarOpt =  {
      separateMonths: false,
      header: true,
      sysDate: this.sysDate,
      sysTime: this.sysTime
    };
    /* .comp */

  }

  private handleError = (error) => {
    this.getCalendarError = true;
    console.log(error);
  }

  private getDates = () => {
    return this.loadDates()/*.pipe(
      // map((formSchema) => this.processFormSchema(formSchema)),
      // catchError(this.handleError('Formulár sa nepodarilo načítať.'))
    )*/;
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
  }

  onDateClick(date): void {
    const dateObj = { ...this.dates[date] };

    if (this.modalRef || !date || ! dateObj || !dateObj.future) {
      return;
    }

    this.modalRef = this.modalService.open(ModalContentComponent, {
      centered: true,
      size: 'sm'
    });

    this.modalRef.componentInstance.date = {
      date
    };

    this.modalRef.result.then((result) => {
      this.modalRef = null;
      console.log(result);

      if (!result || typeof result !== 'string') {
        return;
      }

      const name = result.trim().substring(0, 25);

      const submitData = {
        date,
        name
      };

      this.submitError = false;
      this.submitAnswers(submitData).subscribe(
        (resp) => {

          if (Array.isArray(resp)) {
            const names = [...resp];
            this.dates[date].names = names;
            this.dates[date].namesLength = names.length;
          }

          this.submitError = false;
          console.log(resp);
        },
        (error) => {
          this.submitError = true;
          console.log(error);
        }
      );
    }).catch((dismiss) => {
      this.modalRef = null;
      console.log(dismiss);
    });
  }

  selectPanelContent(menuItemSelectedId: number): void {
    this.panelContent = menuItemSelectedId;
  }

  ngOnInit(): void {
    this.getCalendarError = false;

    this.panelContent = this.panelMenuItems.length - 1;
    // this.markedId = this.panelMenuItems.length - 1;


    // const markedItem = this.panelMenuItems.find(item => item.marked);
    // if (markedItem) {
    //   this.panelContent = markedItem.id;
    //   this.markedId = markedItem.id;
    // }

    zip(this.getDates(), this.getSysDateTime()).pipe(
      map(([dates, sysDateTime]) => ({dates, sysDateTime}))
    ).subscribe(this.handleSuccess, this.handleError);
  }

  private getSysDateTime(): Observable<any> {
    return this.httpClient.get('/api/sysdate');
    // return this.httpClient.get('http://localhost:4004/retaz-patmos-be/public/api/sysdate');
  }

  private loadDates(): Observable<any> {
    return this.httpClient.get('/api/dates');
    // return this.httpClient.get('http://localhost:4004/retaz-patmos-be/public/api/dates');
  }

  private submitAnswers(submitData): Observable<any> {
    return this.httpClient.put('/api/dates', submitData);
    // return this.httpClient.put('http://localhost:4004/retaz-patmos-be/public/api/dates?XDEBUG_SESSION_START=PHPSTORM', submitData);
  }
}
