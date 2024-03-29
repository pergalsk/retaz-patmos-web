import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { YoutubeEmbeddedComponent } from '@components/youtube-embedded/youtube-embedded.component';
import { TwoSplitComponent } from '@components/two-split/two-split.component';
import { SmoothHeightComponent } from '@components/smooth-height/smooth-height.component';
import { ContentBoxComponent } from '@components/content-box/content-box.component';

@Component({
  selector: 'app-day-content-panel',
  templateUrl: './day-content-panel.component.html',
  standalone: true,
  imports: [
    ContentBoxComponent,
    SmoothHeightComponent,
    NgIf,
    TwoSplitComponent,
    YoutubeEmbeddedComponent,
  ],
})
export class DayContentPanelComponent {
  @Input() date: string;

  firstTitle: string = 'Biblický text na zamyslenie';
  secondTitle: string = 'Modlitebné podnety na dnešný deň';
}
