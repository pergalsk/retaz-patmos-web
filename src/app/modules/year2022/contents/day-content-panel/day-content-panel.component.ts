import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-day-content-panel',
  templateUrl: './day-content-panel.component.html',
  styleUrls: ['./day-content-panel.component.scss'],
})
export class DayContentPanelComponent {
  @Input() date: string;

  firstTitle: string = 'Biblický text na zamyslenie';
  secondTitle: string = 'Modlitebné podnety na dnešný deň';
}
