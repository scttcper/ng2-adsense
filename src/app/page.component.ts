import { Component } from '@angular/core';
import { routerTransition } from './router.animations';

/**
 * Uses global values
 */
@Component({
  selector: 'app-root',
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''},
  template: `
  <p class="text-center">Current View: {{title}}</p>
  <ng2-adsense></ng2-adsense>
  <ng2-adsense></ng2-adsense>
  `,
})
export class PageComponent {
  title = 'Page 1';
}


@Component({
  selector: 'app-root',
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''},
  template: `
  <p class="text-center">Current View: {{title}}</p>
  <ng2-adsense [adClient]="'ca-pub-7640562161899788'" [adSlot]="2930227358"></ng2-adsense>
  `,
})
export class OtherPageComponent extends PageComponent {
  title = 'Page 2';
}
