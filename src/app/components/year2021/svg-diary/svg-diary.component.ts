import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg-diary',
  templateUrl: './svg-diary.component.svg',
  standalone: true,
})
export class SvgDiaryComponent {
  @Input() color = '#7A478C';
}
