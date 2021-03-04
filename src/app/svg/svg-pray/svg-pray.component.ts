import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-pray',
  templateUrl: './svg-pray.component.svg',
  styleUrls: ['./svg-pray.component.scss'],
})
export class SvgPrayComponent implements OnInit {
  @Input() color = '#7A478C';

  constructor() {}

  ngOnInit(): void {}
}
