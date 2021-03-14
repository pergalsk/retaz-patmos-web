import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-time',
  templateUrl: './svg-time.component.svg',
  styleUrls: ['./svg-time.component.scss'],
})
export class SvgTimeComponent implements OnInit {
  @Input() color = '#7A478C';
  @Input() variant = 'light';

  theme: any;

  themeDefs = {
    dark: {
      backgroundOpacity: 1,
      hoursCircle: this.color,
      hoursColor: this.color,
      hoursItemsOpacity: 1,
      hoursGlassOpacity: 0.2,
    },
    light: {
      backgroundOpacity: 0.05,
      hoursCircle: '#263238',
      hoursColor: '#bc76cd',
      hoursItemsOpacity: 1,
      hoursGlassOpacity: 0.3,
    },
  };

  constructor() {}

  ngOnInit(): void {
    this.theme = { ...this.themeDefs[this.variant] };
  }
}
