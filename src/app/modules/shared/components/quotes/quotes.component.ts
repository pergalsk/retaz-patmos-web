import { Component, Input, ViewEncapsulation } from '@angular/core';
import { NgbCarousel, NgbSlide } from '@ng-bootstrap/ng-bootstrap';

export type Quote = {
  text: string;
  caption: string;
};

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [NgbCarousel, NgbSlide],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./quotes.scss'],
  template: `
    <ngb-carousel
      class="carousel-fade"
      [interval]="interval"
      [keyboard]="false"
      [pauseOnFocus]="false"
      [pauseOnHover]="false"
      [showNavigationArrows]="arrows"
      [showNavigationIndicators]="indicators"
      [class.with-indicators]="indicators"
    >
      @for (quote of quotes; track $index) {
        <ng-template ngbSlide>
          <figure class="slider-quotes">
            <blockquote class="blockquote">"{{ quote.text }}"</blockquote>
            <figcaption class="blockquote-footer">{{ quote.caption }}</figcaption>
          </figure>
        </ng-template>
      }
    </ngb-carousel>
  `,
})
export class QuotesComponent {
  @Input({ required: true }) quotes: Quote[] = [];
  // quotes: Signal<Quote[]> = input.required();

  @Input() interval: number = 5000;

  @Input() arrows: boolean = false;

  @Input() indicators: boolean = false;
}
