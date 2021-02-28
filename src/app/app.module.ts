import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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
import { SvgWorldComponent } from './svg/svg-world/svg-world.component';
import { SvgDiaryComponent } from './svg/svg-diary/svg-diary.component';
import { SvgPrayComponent } from './svg/svg-pray/svg-pray.component';
import { SvgConnectComponent } from './svg/svg-connect/svg-connect.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalContentComponent,
    PanelMenuComponent,
    CalendarComponent,
    SelectiveContentComponent,
    Content01Component,
    Content02Component,
    Content03Component,
    SvgWorldComponent,
    SvgDiaryComponent,
    SvgPrayComponent,
    SvgConnectComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    interceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
