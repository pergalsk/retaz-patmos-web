import { Component, OnInit } from '@angular/core';
import { SvgPresidentComponent } from '../../svg/svg-president/svg-president.component';

@Component({
  selector: 'app-content05',
  templateUrl: './content05.component.html',
  styleUrls: ['./content05.component.scss'],
  standalone: true,
  imports: [SvgPresidentComponent],
})
export class Content05Component implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
