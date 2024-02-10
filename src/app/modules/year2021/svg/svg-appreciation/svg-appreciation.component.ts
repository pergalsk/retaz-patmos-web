import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-svg-appreciation',
  templateUrl: './svg-appreciation.component.svg',
  styleUrls: ['./svg-appreciation.component.scss'],
  standalone: true,
})
export class SvgAppreciationComponent implements OnInit {
  @Input() color = '#BA68C8';

  constructor() {}

  ngOnInit(): void {}
}
