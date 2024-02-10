import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-two-split',
    templateUrl: './two-split.component.html',
    styleUrls: ['./two-split.component.scss'],
    standalone: true,
    imports: [NgIf],
})
export class TwoSplitComponent {
  @Input() firstTitle: any;
  @Input() secondTitle: any;
  @Input() badgeText: any;
}
