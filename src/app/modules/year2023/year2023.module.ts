import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { Year2023RoutingModule } from './year2023-routing.module';
import { NgxCalendarModule } from 'projects/ngx-calendar/src/lib/calendar.module';

import { PageYear2023Component } from './pages/page-year2023/page-year2023.component';
import { SvgPrayKneesComponent } from './svg/svg-pray-knees/svg-pray-knees.component';
import { MainContent2023Component } from './contents/main-content2023/main-content2023.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    Year2023RoutingModule,
    NgxCalendarModule,
    PageYear2023Component,
    SvgPrayKneesComponent,
    MainContent2023Component,
  ],
  exports: [PageYear2023Component, MainContent2023Component],
})
export class Year2023Module {}
