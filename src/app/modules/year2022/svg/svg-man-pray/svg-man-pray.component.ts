import { Component, Input, OnInit } from '@angular/core';
import { Scheme } from 'src/app/modules/color-scheme/color-scheme.service';

@Component({
  selector: 'app-svg-man-pray',
  templateUrl: './svg-man-pray.component.html',
})
export class SvgManPrayComponent implements OnInit {
  @Input() scheme: Scheme = 'light-theme';

  ngOnInit() {}
}
