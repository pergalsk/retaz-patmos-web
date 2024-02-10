import { Component, OnInit } from '@angular/core';
import { SvgWorldComponent } from '../../svg/svg-world/svg-world.component';

@Component({
    selector: 'app-content03',
    templateUrl: './content03.component.html',
    styleUrls: ['./content03.component.scss'],
    standalone: true,
    imports: [SvgWorldComponent],
})
export class Content03Component implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
