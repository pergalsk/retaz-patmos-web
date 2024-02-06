import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { NgxCalendarModule } from 'projects/ngx-calendar/src/lib/calendar.module';
import { PageYear2024Component } from './pages/page-year2024/page-year2024.component';

@NgModule({
  declarations: [PageYear2024Component],
  imports: [CommonModule, SharedModule, NgxCalendarModule],
  exports: [PageYear2024Component],
})
export class Year2024Module {}
