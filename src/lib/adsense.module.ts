import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { AdsenseConfig, ADSENSE_TOKEN } from './adsense-config';
import { AdsenseComponent } from './adsense.component';

@NgModule({
  imports: [CommonModule],
  exports: [AdsenseComponent],
  declarations: [AdsenseComponent],
})
export class AdsenseModule {
  static forRoot(config: Partial<AdsenseConfig> = {}): ModuleWithProviders<AdsenseModule> {
    return {
      ngModule: AdsenseModule,
      providers: [{ provide: ADSENSE_TOKEN, useValue: config }],
    };
  }
}
