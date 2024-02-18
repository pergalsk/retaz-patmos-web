import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg-connect',
  templateUrl: './svg-connect.component.svg',
  standalone: true,
})
export class SvgConnectComponent {
  @Input() color = '#BA68C8';
}
