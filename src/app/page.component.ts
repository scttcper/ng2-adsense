import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <p class="text-xs-center">Current View: {{title}}</p>
  <ng2-adsense [adClient]="'ca-pub-7640562161899788'" [adSlot]="7259870550"></ng2-adsense>
  `,
})
export class PageComponent {
  title = 'Page 1';
}


@Component({
  selector: 'app-root',
  template: `
  <p class="text-xs-center">Current View: {{title}}</p>
  <ng2-adsense [adClient]="'ca-pub-7640562161899788'" [adSlot]="7259870550"></ng2-adsense>
  `,
})
export class OtherPageComponent extends PageComponent {
  title = 'Page 2';
}
