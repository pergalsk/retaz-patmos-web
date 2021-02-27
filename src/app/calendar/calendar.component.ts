import {Component, Input, OnInit} from '@angular/core';
import {parse, getDay, compareAsc, differenceInDays} from 'date-fns';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @Input() data: any;
  @Input() options: any;
  // @Input() sysDate: string;
  // @Input() sysTime: string;

  dates: any = null;
  sysDate = '';
  sysTime = '';

  dayNames = ['Pondelok', 'Utorok', 'Streda', 'Štvrtok', 'Piatok', 'Sobota', 'Nedeľa'];

  private dateFormat = 'yyyy-MM-dd';

  constructor() { }

  ngOnInit(): void {

    this.sysDate = this.options?.sysDate;
    this.sysTime = this.options?.sysTime;

    if (Array.isArray(this.data)) {
      this.dates = {};

      this.data.sort(this.sortByDates);

      const referenceDate = new Date();

      const sysDate = parse(this.sysDate, this.dateFormat, referenceDate);
      // const firstDate = parse(this.data[0].date, this.dateFormat, referenceDate);
      // const lastDate = parse(this.data[this.data.length - 1].date, this.dateFormat, referenceDate);
      const firstDate = parse('2021-02-01', this.dateFormat, referenceDate);
      const lastDate = parse('2021-02-10', this.dateFormat, referenceDate);

      const daysCount = differenceInDays(lastDate, firstDate);

      this.data.forEach((item) => {
        const { date, names } = item;

        if (date) {
          const namesLength = Array.isArray(names) ? names.length : 0;

          const jsDate = parse(date, this.dateFormat, referenceDate);

          const weekDay = getDay(jsDate) || 7; // 0 - sunday
          const month = parseInt(date.substring(5, 7) || 0, 10); // parse month number

          const comparisonResult = compareAsc(jsDate, sysDate);
          const today = comparisonResult === 0;
          const past = comparisonResult < 0;
          const future = comparisonResult > 0;
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

    /*const weekDayName = ['Nedeľa', 'Pondelok',      'Utorok',      'Streda',      'Štvrtok',       'Piatok',      'Sobota'];
   const monthName = [
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

   const numDays = 47;
   const startDateRaw = '2021-02-17';
   const startDate = new Date(startDateRaw);

   // const endDateRaw = '2021-04-02';

   for (let i = 0; i < numDays - 1; i++) {

     const date = new Date(startDate.valueOf());
     date.setDate(date.getDate() + i);
     const dateDayIndex = date.getDay(); // which day of week
     const dateMonthIndex = date.getMonth(); // which day of week
     const dateISO = date.toISOString().slice(0, 10); // only date



     this.calendarStructure.push({
       dateMonthIndex,
       dateMonthFormatted: monthName[dateMonthIndex],
       dateISO,
       dateDayIndex,
       dateDayFormatted: weekDayName[dateDayIndex],
       names: this.dates[dateISO] || [],
     });

     // {
     //   dateISO,
     //   dateDayIndex,
     //   names: this.dates[dateISO] || [],
     // }
   }*/

  }

  onDateClick = (date) => {
    alert(date.date);
  }

  keepOriginalOrder = (a) => a.key;

  private sortByDates = (a, b) => {
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

}
