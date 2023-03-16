import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CalendarModule } from '../calendar/calendar.module';

import { PageYear2023Component } from './pages/page-year2023/page-year2023.component';
import { SvgCalendarComponent } from './svg/svg-calendar/svg-calendar.component';
import { SvgPrayKneesComponent } from './svg/svg-pray-knees/svg-pray-knees.component';
import { MainContent2023Component } from './contents/main-content2023/main-content2023.component';

@NgModule({
  declarations: [
    PageYear2023Component,
    SvgCalendarComponent,
    SvgPrayKneesComponent,
    MainContent2023Component,
  ],
  imports: [CommonModule, SharedModule, CalendarModule],
  exports: [PageYear2023Component, MainContent2023Component],
})
export class Year2023Module {}
