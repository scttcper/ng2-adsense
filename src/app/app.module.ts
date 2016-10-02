import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AdsenseModule } from '../lib/ng2-adsense';

import { AppComponent } from './app.component';
import { PageComponent, OtherPageComponent } from './page.component';


export const AppRoutes: Routes = [
  { path: '1', component: PageComponent },
  { path: '2', component: OtherPageComponent },
  { path: '**', component: PageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    OtherPageComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes, {useHash: true}),
    AdsenseModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
