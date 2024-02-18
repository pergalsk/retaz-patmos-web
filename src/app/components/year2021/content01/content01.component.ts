import { Component } from '@angular/core';
import { SvgPrayComponent } from '../svg-pray/svg-pray.component';

@Component({
  selector: 'app-content01',
  templateUrl: './content01.component.html',
  standalone: true,
  imports: [SvgPrayComponent],
})
export class Content01Component {}
