import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { ErrorPageComponent } from './core/error-page/error-page.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'not-found',
    component: ErrorPageComponent,
    data: {message: 'Page not found!', errorCode: 404}
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
