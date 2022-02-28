import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { interceptorProviders } from './interceptors';

import { AppComponent } from './app.component';
import { ModalContentComponent } from './modal-content/modal-content.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PanelMenuComponent } from './panel-menu/panel-menu.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SelectiveContentComponent } from './selective-content/selective-content.component';

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
  declarations: [
    AppComponent,
    CalendarComponent,
    Content01Component,
    Content02Component,
    Content03Component,
    Content04Component,
    Content05Component,
    Content06Component,
    Content07Component,
    ModalContentComponent,
    PanelMenuComponent,
    SelectiveContentComponent,
    SvgAppreciationComponent,
    SvgConnectComponent,
    SvgDiaryComponent,
    SvgNatureComponent,
    SvgPrayComponent,
    SvgPresidentComponent,
    SvgTimeComponent,
    SvgWorldComponent,
  ],
  imports: [BrowserModule, HttpClientModule, NgbModule, FormsModule, BrowserAnimationsModule],
  providers: [interceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
