import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { MdoButtonModule } from '@ctrl/ngx-github-buttons';

import { AdsenseModule } from '../lib/public_api';

import { AppComponent } from './app.component';
import {
  OtherPageComponent,
  PageComponent,
  ReloadPageComponent,
} from './page.component';

const routes: Routes = [
  { path: '1', component: PageComponent },
  { path: '2', component: OtherPageComponent },
  { path: 'ads/:id', component: ReloadPageComponent },
  { path: '**', redirectTo: '1', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    OtherPageComponent,
    ReloadPageComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true }),
    AdsenseModule.forRoot({
      adClient: 'ca-pub-7640562161899788',
      adSlot: 2930227358,
    }),
    MdoButtonModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
