import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-content-box',
  host: {
    class: 'jumbotron d-block',
    '[class]': 'classList()',
    '[class.lead]': 'biggerText()',
    '[class.negative]': 'negative()',
  },
  template: `<ng-content />`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentBoxComponent {
  biggerText = input<boolean>();
  negative = input<boolean>();
  classList = input<string>();
}
