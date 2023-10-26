import {
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
  Input,
  Output,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { NgClass, NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
import { NgxCalDayTitle } from './day-title';
import { Day } from './calendar.types';

export interface DayTemplateContext {
  $implicit: Day;
  data: any;
}

@Component({
  selector: '[ngx-cal-day]',
  standalone: true,
  imports: [NgClass, NgForOf, NgIf, NgTemplateOutlet, NgxCalDayTitle],
  host: {
    '(click)': 'onDateClick(day)',
    '[class.invisible]': '!day.visible',
    '[class.highlighted]': 'day.highlighted',
    '[class.selected]': 'day.selected',
    '[class.disabled]': 'day.disabled',
    '[class.weekend]': 'day.weekend',
    '[class.filled]': 'day.names.length',
    '[class]': 'classes',
    '[id]': '"date-" + day.date',
  },
  template: `
    <ng-container
      [ngTemplateOutlet]="dayTpl || dayDefaultTpl"
      [ngTemplateOutletContext]="{ $implicit: day, data }"
    ></ng-container>

    <ng-template #dayDefaultTpl let-dayData let-customData="data">
      <ngx-cal-day-title [title]="dayData.title"></ngx-cal-day-title>
      <div class="day-content-XXX">
        <span>{{ customData }}</span>
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxCalDay implements OnInit {
  @Input()
  day: Day = null;

  @Input('dayTemplate')
  dayTpl: TemplateRef<DayTemplateContext>;

  @Input('dayTemplateData')
  data: any;

  @Output()
  cellAction: EventEmitter<Day> = new EventEmitter<Day>();

  classes: string = '';

  ngOnInit() {
    const { type, date, week, month, weekDay, monthDay, classList } = this.day;

    this.classes = [
      'week-cell',
      type,
      // dayName,
      // monthName,
      'date-' + date,
      'month-' + month,
      'month-day-' + monthDay,
      'week-' + week,
      'week-day-' + weekDay,
    ]
      .concat(classList)
      .join(' ');
  }

  onDateClick(selectedDate: Day): void {
    this.cellAction.emit(selectedDate);
  }
}
