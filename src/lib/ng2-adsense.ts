import {
  Component,
  Input,
  AfterViewInit,
  OnInit,
  NgModule,
  ModuleWithProviders,
  OpaqueToken,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Set optional global default values
 */
export class AdsenseConfig {
  /** adsense account ca-pub-XXXXXXXXXXXXXXXX */
  adClient?: string;
  /** ad slot/number */
  adSlot?: string | number;
  adFormat?: string;
  /** ins element display style */
  display?: string;
  /** ins element height in px */
  width?: number;
  /** ins element width in px */
  height?: number;

  constructor(config: AdsenseConfig = {}) {
    this.adClient = config.adClient || this.adClient;
    this.adSlot = config.adSlot || this.adSlot;
    this.adFormat = config.adFormat || this.adFormat;
    this.display = config.display || 'block';
    this.width = config.width;
    this.height = config.height;
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
  /** adsense account ca-pub-XXXXXXXXXXXXXXXX */
  @Input() adClient: string;
  /** ad slot/number */
  @Input() adSlot: string | number;
  @Input() adFormat = 'auto';
  /** can be manually set if you need all ads on a page to have same id page-xxx */
  @Input() adRegion = 'page-' + Math.floor(Math.random() * 10000) + 1;
  /** ins element display style */
  @Input() display: string;
  /** ins element height in px */
  @Input() width: number;
  /** ins element width in px */
  @Input() height: number;
  constructor(private config: AdsenseConfig) {}
  ngOnInit() {
    this.adClient = this.adClient || this.config.adClient;
    this.adSlot = this.adSlot || this.config.adSlot;
    this.adFormat = this.adFormat || this.config.adFormat;
    this.display = this.display || this.config.display;
    this.width = this.width || this.config.width;
    this.height = this.height || this.config.height;
  }

  /**
   * attempts to push the ad twice. Usually if one doesn't work the other
   * will depeding on if the browser has the adsense code cached and
   * if its the first page to be loaded
   */
  ngAfterViewInit() {
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
