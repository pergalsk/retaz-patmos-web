import { ElementRef, HostBinding, Component, Input, OnChanges } from '@angular/core';

import { animate, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-smooth-height',
    template: `<ng-content></ng-content>`,
    styles: [
        `
      :host {
        display: block;
        overflow: hidden;
      }
    `,
    ],
    animations: [
        trigger('grow', [
            transition('void <=> *', []),
            transition('* <=> *', [style({ height: '{{startHeight}}px' }), animate('0.5s ease')], {
                params: { startHeight: 0 },
            }),
        ]),
    ],
    standalone: true,
})
export class SmoothHeightComponent implements OnChanges {
  @Input() trigger: any;

  startHeight: number;

  constructor(private element: ElementRef) {}

  @HostBinding('@grow')
  get grow() {
    return {
      value: this.trigger,
      params: {
        startHeight: this.startHeight,
      },
    };
  }

  ngOnChanges() {
    this.setStartHeight();
  }

  setStartHeight() {
    this.startHeight = this.element.nativeElement.clientHeight;
  }
}
