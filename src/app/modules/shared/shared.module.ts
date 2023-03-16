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
import { SvgCalendarManComponent } from './svg/svg-calendar-man/svg-calendar-man.component';
import { NoWhitespaceDirective } from './validators/no-whitespace/no-whitespace.directive';

@NgModule({
  declarations: [
    ContentBoxComponent,
    FooterComponent,
    TwoSplitComponent,
    YoutubeEmbeddedComponent,
    SafePipe,
    SmoothHeightComponent,
    ColorSchemeSwitcherComponent,
    SvgCalendarManComponent,
    NoWhitespaceDirective,
  ],
  imports: [CommonModule, RouterModule, NgbModule],
  exports: [
    ContentBoxComponent,
    FooterComponent,
    TwoSplitComponent,
    YoutubeEmbeddedComponent,
    SafePipe,
    SmoothHeightComponent,
    ColorSchemeSwitcherComponent,
    SvgCalendarManComponent,
    NoWhitespaceDirective,
  ],
})
export class SharedModule {}
