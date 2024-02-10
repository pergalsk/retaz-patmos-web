import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { NgxCalendarModule } from 'projects/ngx-calendar/src/lib/calendar.module';
import { Year2021RoutingModule } from './year2021-routing.module';

import { PageYear2021Component } from './pages/page-year2021/page-year2021.component';
import { SelectiveContentComponent } from './components/selective-content/selective-content.component';
import { PanelMenuComponent } from './components/panel-menu/panel-menu.component';

import { Content01Component } from './contents/content01/content01.component';
import { Content02Component } from './contents/content02/content02.component';
import { Content03Component } from './contents/content03/content03.component';
import { Content04Component } from './contents/content04/content04.component';
import { Content05Component } from './contents/content05/content05.component';
import { Content06Component } from './contents/content06/content06.component';
import { Content07Component } from './contents/content07/content07.component';

import { SvgAppreciationComponent } from './svg/svg-appreciation/svg-appreciation.component';
import { SvgConnectComponent } from './svg/svg-connect/svg-connect.component';
import { SvgDiaryComponent } from './svg/svg-diary/svg-diary.component';
import { SvgNatureComponent } from './svg/svg-nature/svg-nature.component';
import { SvgPrayComponent } from './svg/svg-pray/svg-pray.component';
import { SvgPresidentComponent } from './svg/svg-president/svg-president.component';
import { SvgTimeComponent } from './svg/svg-time/svg-time.component';
import { SvgWorldComponent } from './svg/svg-world/svg-world.component';

@NgModule({
  imports: [
    CommonModule,
    Year2021RoutingModule,
    SharedModule,
    NgxCalendarModule,
    PageYear2021Component,
    Content01Component,
    Content02Component,
    Content03Component,
    Content04Component,
    Content05Component,
    Content06Component,
    Content07Component,
    SvgAppreciationComponent,
    SvgConnectComponent,
    SvgDiaryComponent,
    SvgNatureComponent,
    SvgPrayComponent,
    SvgPresidentComponent,
    SvgTimeComponent,
    SvgWorldComponent,
    SelectiveContentComponent,
    PanelMenuComponent,
  ],
})
export class Year2021Module {}
