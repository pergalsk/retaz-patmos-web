import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SafePipe } from './pipes/safe.pipe';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FooterComponent } from './components/footer/footer.component';
import { YoutubeEmbeddedComponent } from './components/youtube-embedded/youtube-embedded.component';
import { TwoSplitComponent } from './components/two-split/two-split.component';
import { ContentBoxComponent } from './components/content-box/content-box.component';

@NgModule({
  declarations: [
    CalendarComponent,
    ContentBoxComponent,
    FooterComponent,
    TwoSplitComponent,
    YoutubeEmbeddedComponent,
    SafePipe,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    CalendarComponent,
    ContentBoxComponent,
    FooterComponent,
    TwoSplitComponent,
    YoutubeEmbeddedComponent,
    SafePipe,
  ],
})
export class SharedModule {}
