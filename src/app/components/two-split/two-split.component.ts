import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-two-split',
  standalone: true,
  imports: [NgIf],
  template: `
    @if (firstTitle() || badgeText()) {
      <h2 class="display-5 mb-4">
        @if (firstTitle()) {
          <span class="title-with-badge">{{ firstTitle() }}</span>
        }
        @if (badgeText) {
          <span class="date-badge">{{ badgeText() }}</span>
        }
      </h2>
    }

    <ng-content select="[first-slot]" />
    @if (secondTitle()) {
      <h2 class="display-5 mb-4 mt-4">{{ secondTitle() }}</h2>
    }
    <ng-content select="[second-slot]" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TwoSplitComponent {
  firstTitle = input<string>();
  secondTitle = input<string>();
  badgeText = input<string>();
}
