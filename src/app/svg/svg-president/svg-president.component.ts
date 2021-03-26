import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-president',
  templateUrl: './svg-president.component.svg',
  styleUrls: ['./svg-president.component.scss'],
})
export class SvgPresidentComponent implements OnInit {
  @Input() color = '#AC72BA';
  @Input() variant = 'dark';

  theme: any;

  themeDefs = {
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
