import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-content-box',
  templateUrl: './content-box.component.html',
  styleUrls: ['./content-box.component.scss'],
  standalone: true,
})
export class ContentBoxComponent {
  @Input() biggerText: boolean;
  @Input() negative: boolean;
  @Input() classList: string;
}
