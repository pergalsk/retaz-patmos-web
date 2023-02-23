import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SafePipe } from './pipes/safe.pipe';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FooterComponent } from './components/footer/footer.component';
import { YoutubeEmbeddedComponent } from './components/youtube-embedded/youtube-embedded.component';
import { TwoSplitComponent } from './components/two-split/two-split.component';
import { ContentBoxComponent } from './components/content-box/content-box.component';
import { SmoothHeightComponent } from './smooth-height/smooth-height.component';
import { ColorSchemeSwitcherComponent } from './components/color-scheme-switcher/color-scheme-switcher.component';
import { SvgCalendarManComponent } from './svg/svg-calendar-man/svg-calendar-man.component';

@NgModule({
  declarations: [
    CalendarComponent,
    ContentBoxComponent,
    FooterComponent,
    TwoSplitComponent,
    YoutubeEmbeddedComponent,
    SafePipe,
    SmoothHeightComponent,
    ColorSchemeSwitcherComponent,
    SvgCalendarManComponent,
  ],
  imports: [CommonModule, RouterModule, NgbModule],
  exports: [
    CalendarComponent,
    ContentBoxComponent,
    FooterComponent,
    TwoSplitComponent,
    YoutubeEmbeddedComponent,
    SafePipe,
    SmoothHeightComponent,
    ColorSchemeSwitcherComponent,
    SvgCalendarManComponent,
  ],
})
export class SharedModule {}
