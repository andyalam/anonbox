import { NgModule } from '@angular/core';

import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from '../auth/auth.service';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
	declarations: [
		NavComponent,
		HomeComponent
	],
	imports: [
		SharedModule,
		AppRoutingModule
	],
	exports: [
		NavComponent
	],
	providers: [
		AuthService
	]
})
export class CoreModule {}
