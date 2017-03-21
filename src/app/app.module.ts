import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';

import {AdsenseModule} from '../lib/ng2-adsense';

import {AppComponent} from './app.component';
import {PageComponent, OtherPageComponent} from './page.component';

const routes: Routes = [
  { path: '1', component: PageComponent },
  { path: '2', component: OtherPageComponent },
  { path: '**', redirectTo: '1', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    PageComponent, OtherPageComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true }),
    AdsenseModule.forRoot({
      adClient: 'ca-pub-7640562161899788',
      adSlot: 2930227358,
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
