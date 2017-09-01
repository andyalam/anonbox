import { NgModule } from '@angular/core';

import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from '../auth/auth.service';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { SessionStoreService } from '../shared/sessionStore.service';
import { ErrorPageComponent } from './error-page/error-page.component';

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
		SessionStoreService
	]
})
export class CoreModule {}
