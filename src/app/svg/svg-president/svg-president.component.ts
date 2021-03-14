import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-president',
  templateUrl: './svg-president.component.svg',
  styleUrls: ['./svg-president.component.scss'],
})
export class SvgPresidentComponent implements OnInit {
  @Input() color = '#AC72BA';

  constructor() {}

  ngOnInit(): void {}
}
