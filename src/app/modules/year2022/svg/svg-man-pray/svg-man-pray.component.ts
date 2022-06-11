import { Component, Input, OnInit } from '@angular/core';
import { Scheme, SCHEMES } from '../../../color-scheme/color-scheme.types';

@Component({
  selector: 'app-svg-man-pray',
  templateUrl: './svg-man-pray.component.html',
})
export class SvgManPrayComponent implements OnInit {
  @Input() scheme: Scheme = SCHEMES.LIGHT;

  ngOnInit() {}
}
