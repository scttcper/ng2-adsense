import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageComponent, OtherPageComponent } from './page.component';

const routes: Routes = [
  { path: '1', component: PageComponent },
  { path: '2', component: OtherPageComponent },
  // { path: '**', component: PageComponent },
  {
    path: '**',
    redirectTo: '1',
    pathMatch: 'full'
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class Ng2AdsenseRoutingModule { }
