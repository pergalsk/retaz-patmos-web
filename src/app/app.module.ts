import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { interceptorProviders } from './interceptors';
import { AppComponent } from './app.component';
import { ModalContentComponent } from './modal-content/modal-content.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { BadgeStripComponent } from './components/badge-strip/badge-strip.component';
import { DayContentPanelComponent } from './components/day-content-panel/day-content-panel.component';
import { YoutubeEmbeddedComponent } from './components/youtube-embedded/youtube-embedded.component';
import { SafePipe } from './pipes/safe.pipe';
import { ContentBoxComponent } from './components/content-box/content-box.component';
import { TwoSplitComponent } from './components/two-split/two-split.component';
import { SharedModule } from './modules/shared/shared.module';

import { SvgManPrayComponent } from './svg/svg-man-pray/svg-man-pray.component';
import { PageYear2022Component } from './pages/page-year2022/page-year2022.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalContentComponent,
    PageYear2022Component,
    SvgManPrayComponent,
    BadgeStripComponent,
    DayContentPanelComponent,
    YoutubeEmbeddedComponent,
    SafePipe,
    ContentBoxComponent,
    TwoSplitComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [interceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
