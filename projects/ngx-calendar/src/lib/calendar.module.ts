import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { NgxCalHeader } from './header';
import { NgxCalDay } from './day';
import { NgxCalDayTitle } from './day-title';

@NgModule({
  declarations: [CalendarComponent],
  imports: [CommonModule, NgxCalHeader, NgxCalDay, NgxCalDayTitle],
  exports: [CalendarComponent, NgxCalHeader, NgxCalDay, NgxCalDayTitle],
})
export class NgxCalendarModule {}
