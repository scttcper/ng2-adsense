import { Component, HostBinding } from '@angular/core';
import { routerTransition } from './router.animations';

/**
 * Uses global values
 */
@Component({
  selector: 'ng2-page-1',
  animations: [routerTransition()],
  template: `
  <p class="text-center">Current View: {{title}}</p>
  <ng2-adsense></ng2-adsense>
  <ng2-adsense></ng2-adsense>
  `,
})
export class PageComponent {
  @HostBinding('@routerTransition') transition = '';
  title = 'Page 1';
}


@Component({
  selector: 'ng2-page-2',
  animations: [routerTransition()],
  template: `
  <p class="text-center">Current View: {{title}}</p>
  <ng2-adsense [adClient]="'ca-pub-7640562161899788'" [adSlot]="2930227358"></ng2-adsense>
  `,
})
export class OtherPageComponent extends PageComponent {
  @HostBinding('@routerTransition') transition = '';
  title = 'Page 2';
}
