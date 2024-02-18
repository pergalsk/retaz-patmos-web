import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg-appreciation',
  templateUrl: './svg-appreciation.component.svg',
  standalone: true,
})
export class SvgAppreciationComponent {
  @Input() color = '#BA68C8';
}
