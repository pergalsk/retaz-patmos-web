import { animate, animation, style } from '@angular/animations';

const timings = '400ms cubic-bezier(0.35, 0, 0.25, 1)';
const position = '20px';

export const contentEnterAnim = animation([
  style({ opacity: 0, transform: `translateX(-${position})` }),
  animate(timings, style({ opacity: 1, transform: 'none' })),
]);

export const contentLeaveAnim = animation([
  animate(timings, style({ opacity: 0, transform: `translateX(${position})` })),
]);
