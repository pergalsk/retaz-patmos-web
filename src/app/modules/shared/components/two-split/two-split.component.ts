import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-two-split',
  templateUrl: './two-split.component.html',
  styleUrls: ['./two-split.component.scss'],
})
export class TwoSplitComponent {
  @Input() firstTitle: any;
  @Input() secondTitle: any;
  @Input() badgeText: any;
}
