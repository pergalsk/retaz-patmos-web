import { Component, Input, OnInit } from '@angular/core';
import { Theme } from 'src/app/services/color-scheme.service';

@Component({
  selector: 'app-svg-man-pray',
  templateUrl: './svg-man-pray.component.html',
})
export class SvgManPrayComponent implements OnInit {
  @Input() theme: Theme = 'light-theme';

  ngOnInit() {}
}
