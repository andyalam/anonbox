import { NgModule } from '@angular/core';

import { ProfileComponent } from './profile/profile.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ProfilesRoutingModule } from './profiles-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProfilesService } from './profiles.service';

@NgModule({
	declarations: [
		ProfileComponent,
		ProfileSettingsComponent
	],
	imports: [
		ProfilesRoutingModule,
		SharedModule
	],
	providers: [
		ProfilesService
	]
})
export class ProfilesModule {}
