import { Component, AfterViewInit } from '@angular/core';

declare var adsbygoogle: any;

@Component({
  selector: 'adsense-component',
  template: `
  <ins class="adsbygoogle"
    style="display:inline-block;width:330px;height:120px"
    data-ad-client="my_client_number"
    data-ad-slot="my_ad_slot_number">
  </ins>
  `,
})
export class AdsenseComponent implements AfterViewInit {

  ngAfterViewInit() {
    try {
      (adsbygoogle = window['adsbygoogle'] || []).push({});
    } catch (e) {}
  }
}
