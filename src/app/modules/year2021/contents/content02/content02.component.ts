import { Component, OnInit } from '@angular/core';
import { SvgConnectComponent } from '../../svg/svg-connect/svg-connect.component';

@Component({
    selector: 'app-content02',
    templateUrl: './content02.component.html',
    standalone: true,
    imports: [SvgConnectComponent],
})
export class Content02Component implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
