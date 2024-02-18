import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-president',
  templateUrl: './svg-president.component.svg',
  standalone: true,
})
export class SvgPresidentComponent implements OnInit {
  @Input() color = '#AC72BA';
  @Input() variant = 'dark';

  theme: any;

  themeDefs: any = {
    dark: {
      backgroundOpacity: 1,
    },
    light: {
      backgroundOpacity: 0.05,
    },
  };

  constructor() {}

  ngOnInit(): void {
    this.theme = { ...this.themeDefs[this.variant] };
  }
}
