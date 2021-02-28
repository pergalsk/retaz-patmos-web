import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-svg-diary',
  templateUrl: './svg-diary.component.svg',
  styleUrls: ['./svg-diary.component.scss']
})
export class SvgDiaryComponent implements OnInit {
  @Input() color = '#7A478C';

  constructor() {}

  ngOnInit(): void {}

}
