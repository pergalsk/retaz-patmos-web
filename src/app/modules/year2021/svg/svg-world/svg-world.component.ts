import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-svg-world',
  templateUrl: './svg-world.component.svg',
  styleUrls: ['./svg-world.component.scss'],
})
export class SvgWorldComponent implements OnInit {
  @Input() color = '#BA68C8';

  constructor() {}

  ngOnInit(): void {}
}
