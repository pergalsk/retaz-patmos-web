import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SafePipe } from './pipes/safe.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { YoutubeEmbeddedComponent } from './components/youtube-embedded/youtube-embedded.component';
import { TwoSplitComponent } from './components/two-split/two-split.component';
import { ContentBoxComponent } from './components/content-box/content-box.component';
import { SmoothHeightComponent } from './smooth-height/smooth-height.component';
import { ColorSchemeSwitcherComponent } from './components/color-scheme-switcher/color-scheme-switcher.component';
import { SvgCalendarComponent } from './svg/svg-calendar/svg-calendar.component';
import { SvgCalendarManComponent } from './svg/svg-calendar-man/svg-calendar-man.component';
import { NoWhitespaceDirective } from './validators/no-whitespace/no-whitespace.directive';
import { CalendarSignupComponent } from './components/calendar-signup/calendar-signup.component';
import { NgxCalDayTitle } from 'projects/ngx-calendar/src/lib/day-title';
import { NgxCalendarModule } from 'projects/ngx-calendar/src/lib/calendar.module';

@NgModule({
    imports: [CommonModule, RouterModule, NgbModule, NgxCalDayTitle, NgxCalendarModule, ContentBoxComponent,
        FooterComponent,
        TwoSplitComponent,
        YoutubeEmbeddedComponent,
        SafePipe,
        SmoothHeightComponent,
        ColorSchemeSwitcherComponent,
        SvgCalendarComponent,
        SvgCalendarManComponent,
        NoWhitespaceDirective,
        CalendarSignupComponent],
    exports: [
        ContentBoxComponent,
        FooterComponent,
        TwoSplitComponent,
        YoutubeEmbeddedComponent,
        SafePipe,
        SmoothHeightComponent,
        ColorSchemeSwitcherComponent,
        SvgCalendarComponent,
        SvgCalendarManComponent,
        NoWhitespaceDirective,
        CalendarSignupComponent,
    ],
})
export class SharedModule {}
