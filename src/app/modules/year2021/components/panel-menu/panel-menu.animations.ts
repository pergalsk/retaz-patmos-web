import { animate, group, query, stagger, style, transition, trigger } from '@angular/animations';

export const animations = [
  trigger('openCloseTrigger', [
    transition(':enter', [
      query('li', [style({ opacity: 0, transform: 'translateX(-40px)' })]),
      style({ height: 0, opacity: 0 }),
      group([
        animate('250ms cubic-bezier(0.35, 0, 0.25, 1)', style({ height: '*', opacity: 1 })),
        query('li', [
          stagger(130, [
            animate(
              '650ms cubic-bezier(0.35, 0, 0.25, 1)',
              style({ opacity: 1, transform: 'none' })
            ),
          ]),
        ]),
      ]),
    ]),
    transition(':leave', [
      animate('250ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 0, height: 0 })),
    ]),
  ]),
];
