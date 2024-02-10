import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-svg-connect',
    templateUrl: './svg-connect.component.svg',
    styleUrls: ['./svg-connect.component.scss'],
    standalone: true,
})
export class SvgConnectComponent implements OnInit {
  @Input() color = '#BA68C8';

  constructor() {}

  ngOnInit(): void {}
}
