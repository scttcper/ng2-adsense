import {
  Component,
  Input,
  AfterViewInit,
  OnInit,
  NgModule,
  ModuleWithProviders,
  OpaqueToken,
} from '@angular/core';

/* CommonModule required for ngStyle */
import {CommonModule} from "@angular/common";

export class AdsenseConfig {

  adClient?: string;
  adSlot?: string | number;
  adFormat?: string;
  display?: string;
  width?: number;
  height?: number;

  constructor(config: AdsenseConfig = {}) {
    this.adClient = config.adClient || this.adClient;
    this.adSlot = config.adSlot || this.adSlot;
    this.adFormat = config.adFormat || this.adFormat;
    this.display = config.display || 'block'
    this.width = config.width
    this.height = config.height

  }
}

@Component({
  selector: 'ng2-adsense',
  template: `
    <div style="padding-bottom:8px;">
      <ins class="adsbygoogle"
           [ngStyle]="{'display': display, 'width.px': width, 'height.px': height }"
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
  @Input() display:string;
  @Input() width:number;
  @Input() height:number;
  constructor(private config: AdsenseConfig) {
    // console.log(config);
    // console.log(this.adClient)
  }
  ngOnInit() {
      this.adClient = this.adClient || this.config.adClient;
      this.adSlot = this.adSlot || this.config.adSlot;
      this.adFormat = this.adFormat || this.config.adFormat;
      this.display = this.display || this.config.display;
      this.width = this.width || this.config.width;
      this.height = this.height || this.config.height;
  }

  ngAfterViewInit() {
    // attempts to push the ad twice. Usually if one doesn't work the other
    // will depeding on if the browser has the adsense code cached
    const res = this.push();
    if (res instanceof TypeError) {
      setTimeout(() => this.push(), 200);
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
  imports: [CommonModule],
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
