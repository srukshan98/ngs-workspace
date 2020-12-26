import { AnimationTriggerMetadata, trigger, state, style, transition, animate } from '@angular/animations';

export const slideInOutAnimation: AnimationTriggerMetadata = trigger('slideInOut', [
  state('out', style({
    transform: 'translate3d(0, 0, 0)'
  })),
  state('in', style({
    transform: 'translate3d(102%, 0, 0)'
  })),
  transition('out => in', animate('400ms ease-in-out')),
  transition('in => out', animate('400ms ease-in-out'))
]);
