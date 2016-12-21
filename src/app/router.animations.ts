import {trigger, state, animate, style, transition} from '@angular/core';

export function routerTransition() {
  return slideInOut();
}

export function slideInOut() {
  return trigger('routerTransition', [
    state('void', style({ position: 'absolute', width: '100%' }) ),
    state('*', style({ position: 'absolute', width: '100%' }) ),
    transition(':enter', [
      style({transform: 'translateX(-30px)', opacity: 0}),
      animate('0.5s cubic-bezier(.55,0,.1,1)', style({transform: 'translateX(0px)', opacity: 1}))
    ]),
    transition(':leave', [
      style({transform: 'translateX(0px)'}),
      animate('0.5s cubic-bezier(.55,0,.1,1)', style({transform: 'translateX(30px)', opacity: 0}))
    ])
  ]);
}
