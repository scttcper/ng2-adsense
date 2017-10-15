import {
  Component,
  Input,
  AfterViewInit,
  OnInit,
  NgModule,
  ModuleWithProviders,
  Inject,
  InjectionToken,
} from '@angular/core';
import { CommonModule } from '@angular/common';


/**
 * Set optional global default values
 */
export interface AdsenseConfig {
  /** adsense account ca-pub-XXXXXXXXXXXXXXXX */
  adClient?: string;
  /** ad slot/number */
  adSlot?: string | number;
  /** data-ad-format default: auto */
  adFormat?: string;
  /** ins element display style */
  display?: string;
  /** ins element height in px */
  width?: number;
  /** ins element width in px */
  height?: number;
  /** used for in-feed ads */
  layout?: string;
  /** used for in-feed ads */
  layoutKey?: string;
}

export const ADSENSE_CONFIG = new InjectionToken<AdsenseConfig>('AdsenseConfig');

@Component({
  selector: 'ng2-adsense,ng-adsense',
  template: `
  <ins class="adsbygoogle"
    [ngStyle]="{'display': display, 'width.px': width, 'height.px': height }"
    [attr.data-ad-client]="adClient"
    [attr.data-ad-slot]="adSlot"
    [attr.data-ad-format]="adFormat"
    [attr.data-ad-region]="adRegion"
    [attr.data-layout]="layout"
    [attr.data-layout-key]="layoutKey">
  </ins>
  `,
})
export class AdsenseComponent implements OnInit, AfterViewInit {
  /** adsense account ca-pub-XXXXXXXXXXXXXXXX */
  @Input() adClient: string;
  /** ad slot/number */
  @Input() adSlot: string | number;
  @Input() adFormat: string;
  /** can be manually set if you need all ads on a page to have same id page-xxx */
  @Input() adRegion = 'page-' + Math.floor(Math.random() * 10000) + 1;
  /** ins element display style */
  @Input() display: string;
  /** ins element height in px */
  @Input() width: number;
  /** ins element width in px */
  @Input() height: number;
  /** used for in-feed ads */
  @Input() layout: string;
  /** used for in-feed ads */
  @Input() layoutKey: string;

  constructor(
    @Inject(ADSENSE_CONFIG) private config: AdsenseConfig,
  ) { }

  ngOnInit() {
    const config = this.config;
    function use<T>(source: T, defaultValue: any): T {
      return config && source !== undefined ? source : defaultValue;
    }
    this.adClient = use(this.adClient, config.adClient);
    this.adSlot = use(this.adSlot, config.adSlot);
    this.adFormat = use(this.adFormat, config.adFormat || 'auto');
    this.display = use(this.display, config.display || 'block');
    this.width = use(this.width, config.width);
    this.height = use(this.height, config.height);
    this.layout = use(this.layout, config.layout);
    this.layoutKey = use(this.layoutKey, config.layoutKey);
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

@NgModule({
  imports: [CommonModule],
  exports: [AdsenseComponent],
  declarations: [AdsenseComponent],
})
export class AdsenseModule {
  static forRoot(config: AdsenseConfig = {}): ModuleWithProviders {
    return {
      ngModule: AdsenseModule,
      providers: [{ provide: ADSENSE_CONFIG, useValue: config }],
    };
  }
}
