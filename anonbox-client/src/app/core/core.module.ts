import { NgModule } from '@angular/core';

import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { ErrorPageComponent } from './error-page/error-page.component';
import {
  AuthService,
  LocalStoreService,
  SessionStoreService
} from '@anonbox-services/index';

@NgModule({
  declarations: [
    NavComponent,
    HomeComponent,
    ErrorPageComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    NavComponent
  ],
  providers: [
    AuthService,
    LocalStoreService,
    SessionStoreService
  ]
})
export class CoreModule {}
