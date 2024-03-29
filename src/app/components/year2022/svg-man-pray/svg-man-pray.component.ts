import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Scheme, SCHEMES } from '@modules/color-scheme/color-scheme.types';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-svg-man-pray',
  templateUrl: './svg-man-pray.component.html',
  standalone: true,
  imports: [NgStyle],
})
export class SvgManPrayComponent implements OnChanges {
  @Input() scheme: Scheme = SCHEMES.LIGHT;

  color1: string;
  color2: string;

  ngOnChanges(change: SimpleChanges) {
    console.log('change:', change);
    if (change.scheme.currentValue === SCHEMES.DARK) {
      this.color1 = 'rgba(255,255,255,0.05)';
      this.color2 = 'rgba(200,200,200)';
    } else {
      this.color1 = 'rgba(0,0,0,0.05)';
      this.color2 = 'rgba(0,0,0,1)';
    }
  }
}
