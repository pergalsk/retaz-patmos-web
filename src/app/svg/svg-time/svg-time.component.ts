import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-time',
  templateUrl: './svg-time.component.svg',
  styleUrls: ['./svg-time.component.scss'],
})
export class SvgTimeComponent implements OnInit {
  @Input() color = '#7A478C';

  constructor() {}

  ngOnInit(): void {}
}
