import { Component, OnInit } from '@angular/core';
import { SvgAppreciationComponent } from '../../svg/svg-appreciation/svg-appreciation.component';

@Component({
  selector: 'app-content06',
  templateUrl: './content06.component.html',
  styleUrls: ['./content06.component.scss'],
  standalone: true,
  imports: [SvgAppreciationComponent],
})
export class Content06Component implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
