import { Component, Input, AfterViewInit, NgModule } from '@angular/core';

declare var adsbygoogle: any;

@Component({
  selector: 'ng2-adsense',
  template: `
  <div style="padding-bottom:8px;">
    <ins class="adsbygoogle"
      style="display:block;"
      [attr.data-ad-client]="adClient"
      [attr.data-ad-slot]="adSlot"
      [attr.data-ad-format]="adFormat"
      [attr.data-ad-region]="adRegion">
    </ins>
  </div>
  `,
})
export class AdsenseComponent implements AfterViewInit {
  @Input() adClient: string;
  @Input() adSlot: string | number;
  @Input() adFormat: string = 'auto';
  @Input() adRegion = 'page-' + Math.floor(Math.random() * 100000) + 1;
  ngAfterViewInit() {
    try {
      (adsbygoogle = window['adsbygoogle'] || []).push({});
    } catch (e) {}
  }
}

@NgModule({
  exports: [AdsenseComponent],
  declarations: [AdsenseComponent],
})
export class AdsenseModule { }
