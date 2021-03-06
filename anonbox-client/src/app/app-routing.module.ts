import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
  PreloadAllModules,
  ExtraOptions
} from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { ErrorPageComponent } from './core/error-page/error-page.component';

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'auth',
    loadChildren: 'app/auth/auth.module#AuthModule'
  },
  {
    path: 'profile',
    loadChildren: 'app/profiles/profiles.module#ProfilesModule'
  },
  {
    path: 'not-found',
    component: ErrorPageComponent,
    data: {message: 'Page not found!', errorCode: 404}
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

const options: ExtraOptions = {
  preloadingStrategy: PreloadAllModules
};

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, options)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
