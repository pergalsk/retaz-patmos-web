import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { NgbCarousel, NgbSlide } from '@ng-bootstrap/ng-bootstrap';

export type Quote = {
  text: string;
  caption: string;
};

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [NgbCarousel, NgbSlide],
  styleUrls: ['./quotes.scss'],
  template: `
    <ngb-carousel
      class="carousel-fade"
      [interval]="interval()"
      [keyboard]="false"
      [pauseOnFocus]="false"
      [pauseOnHover]="false"
      [showNavigationArrows]="arrows()"
      [showNavigationIndicators]="indicators()"
      [class.with-indicators]="indicators()"
    >
      @for (quote of quotes(); track $index) {
        <ng-template ngbSlide>
          <figure class="slider-quotes">
            <blockquote class="blockquote">"{{ quote.text }}"</blockquote>
            <figcaption class="blockquote-footer">{{ quote.caption }}</figcaption>
          </figure>
        </ng-template>
      }
    </ngb-carousel>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class QuotesComponent {
  quotes = input.required<Quote[]>();
  interval = input<number>(5000);
  arrows = input<boolean>(false);
  indicators = input<boolean>(false);
}
