import { Component, Input } from '@angular/core';
import { YoutubeEmbeddedComponent } from '../../../shared/components/youtube-embedded/youtube-embedded.component';
import { TwoSplitComponent } from '../../../shared/components/two-split/two-split.component';
import { NgIf } from '@angular/common';
import { SmoothHeightComponent } from '../../../shared/smooth-height/smooth-height.component';
import { ContentBoxComponent } from '../../../shared/components/content-box/content-box.component';

@Component({
  selector: 'app-day-content-panel',
  templateUrl: './day-content-panel.component.html',
  styleUrls: ['./day-content-panel.component.scss'],
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
