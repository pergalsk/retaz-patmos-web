import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Scheme, SCHEMES } from '../../../color-scheme/color-scheme.types';

@Component({
    selector: 'app-svg-man-pray-placeholder',
    templateUrl: './svg-man-pray-placeholder.component.html',
    standalone: true,
})
export class SvgManPrayPlaceholderComponent implements OnChanges {
  @Input() scheme: Scheme = SCHEMES.LIGHT;

  color1: string;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.scheme.currentValue === SCHEMES.DARK) {
      this.color1 = 'rgba(255,255,255,0.05)';
    } else {
      this.color1 = 'rgba(0,0,0,0.05)';
    }
  }
}
