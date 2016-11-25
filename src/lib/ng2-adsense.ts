import { Component, Input, AfterViewInit, NgModule } from '@angular/core';

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
  @Input() adRegion = 'page-' + Math.floor(Math.random() * 10000) + 1;

  ngAfterViewInit() {
    // attempts to push the ad twice. Usually if one doesn't work the other
    // will depeding on if the browser has the adsense code cached
    const res = this.push();
    if (res instanceof TypeError) {
      setTimeout(() => this.push(), 20);
    }
  }
  push() {
    try {
      const adsbygoogle = window['adsbygoogle'];
      adsbygoogle.push({});
      return true;
    } catch (e) {
      return e;
    }
  }
}

@NgModule({
  exports: [AdsenseComponent],
  declarations: [AdsenseComponent],
})
export class AdsenseModule { }
