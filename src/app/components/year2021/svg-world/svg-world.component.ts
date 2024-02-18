import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg-world',
  templateUrl: './svg-world.component.svg',
  standalone: true,
})
export class SvgWorldComponent {
  @Input() color = '#BA68C8';
}
