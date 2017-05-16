import { NgModule } from '@angular/core';

import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';

@NgModule({
	declarations: [
		NavComponent,
		HomeComponent
	],
	imports: [],
	exports: [
		NavComponent
	],
	providers: []
})
export class CoreModule {}
