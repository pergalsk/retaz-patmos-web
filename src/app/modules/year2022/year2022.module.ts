import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { SafePipe } from '../shared/pipes/safe.pipe';
import { PageYear2022Component } from './pages/page-year2022/page-year2022.component';
import { DayContentPanelComponent } from './contents/day-content-panel/day-content-panel.component';
import { BadgeStripComponent } from './components/badge-strip/badge-strip.component';
import { SvgManPrayComponent } from './svg/svg-man-pray/svg-man-pray.component';
import { MainContent2022Component } from './contents/main-content2022/main-content2022.component';
import { UkraineContent2022Component } from './contents/ukraine-content2022/ukraine-content2022.component';

@NgModule({
  declarations: [
    SvgManPrayComponent,
    DayContentPanelComponent,
    PageYear2022Component,
    BadgeStripComponent,
    MainContent2022Component,
    UkraineContent2022Component,
  ],
  imports: [CommonModule, SharedModule],
  providers: [SafePipe],
  exports: [PageYear2022Component, MainContent2022Component, UkraineContent2022Component],
})
export class Year2022Module {}
