import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg-pray',
  templateUrl: './svg-pray.component.svg',
  standalone: true,
})
export class SvgPrayComponent {
  @Input() color = '#7A478C';
}
