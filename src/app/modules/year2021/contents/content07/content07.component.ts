import { Component, OnInit } from '@angular/core';
import { SvgNatureComponent } from '../../svg/svg-nature/svg-nature.component';

@Component({
    selector: 'app-content07',
    templateUrl: './content07.component.html',
    styleUrls: ['./content07.component.scss'],
    standalone: true,
    imports: [SvgNatureComponent],
})
export class Content07Component implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
