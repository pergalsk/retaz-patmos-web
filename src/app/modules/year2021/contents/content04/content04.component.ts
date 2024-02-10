import { Component, OnInit } from '@angular/core';
import { SvgTimeComponent } from '../../svg/svg-time/svg-time.component';

@Component({
    selector: 'app-content04',
    templateUrl: './content04.component.html',
    styleUrls: ['./content04.component.scss'],
    standalone: true,
    imports: [SvgTimeComponent],
})
export class Content04Component implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
