import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Ng2AdsenseRoutingModule } from './app-routing.module';
import { PageComponent, OtherPageComponent } from './page.component';
import { AdsenseModule } from '../lib/ng2-adsense';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent, OtherPageComponent,
  ],
  imports: [
    BrowserModule,
    AdsenseModule,
    Ng2AdsenseRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
