import { AnimationTriggerMetadata, trigger, state, style, transition, animate } from '@angular/animations';

const params: {[key: string]: any} = {
  duration: 0,
  inOutTiming: 'linear'
};

export const slideInOutAnimation: AnimationTriggerMetadata = trigger('slideInOut', [
  state('out', style({
    transform: 'translate3d(0, 0, 0)'
  })),
  state('in', style({
    transform: 'translate3d(102%, 0, 0)'
  })),
  state('in-rev', style({
    transform: 'translate3d(-102%, 0, 0)'
  })),
  transition('out => in', animate('{{duration}}ms {{inOutTiming}}'), { params }),
  transition('in => out', animate('{{duration}}ms {{inOutTiming}}'), { params }),
  transition('out => in-rev', animate('{{duration}}ms {{inOutTiming}}'), { params }),
  transition('in-rev => out', animate('{{duration}}ms {{inOutTiming}}'), { params }),
]);