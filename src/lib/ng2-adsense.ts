import {
  Component,
  Input,
  AfterViewInit,
  OnInit,
  NgModule,
  ModuleWithProviders,
  OpaqueToken,
  Injectable,
} from '@angular/core';

export class AdsenseConfig {
  adClient?: string;
  adSlot?: string | number;
  adFormat?: string;
  constructor(config: AdsenseConfig = {}) {
    this.adClient = config.adClient || this.adClient;
    this.adSlot = config.adSlot || this.adSlot;
    this.adFormat = config.adFormat || this.adFormat;
  }
}

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
export class AdsenseComponent implements OnInit, AfterViewInit {
  @Input() adClient: string;
  @Input() adSlot: string | number;
  @Input() adFormat = 'auto';
  @Input() adRegion = 'page-' + Math.floor(Math.random() * 10000) + 1;
  constructor(private config: AdsenseConfig) {
    // console.log(config);
    // console.log(this.adClient)
  }
  ngOnInit() {
    if (!this.adClient && this.config.adClient) {
      this.adClient = this.config.adClient;
    }
    if (!this.adSlot && this.config.adSlot) {
      this.adSlot = this.config.adSlot;
    }
    if (!this.adFormat && this.config.adFormat) {
      this.adFormat = this.config.adFormat;
    }
  }

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

export const ADSENSE_CONFIG = new OpaqueToken('AdsenseConfig');

export function provideAdsenseConfig(config: AdsenseConfig) {
  return new AdsenseConfig(config);
}

@NgModule({
  exports: [AdsenseComponent],
  declarations: [AdsenseComponent],
})
export class AdsenseModule {
  static forRoot(config?: AdsenseConfig): ModuleWithProviders {
    return {
      ngModule: AdsenseModule,
      providers: [
        { provide: ADSENSE_CONFIG, useValue: config },
        { provide: AdsenseConfig, useFactory: provideAdsenseConfig, deps: [ADSENSE_CONFIG] },
      ]
    };
  }
}
