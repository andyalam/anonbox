import { NgModule } from '@angular/core';

import { ProfileComponent } from './profile/profile.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ProfilesRoutingModule } from './profiles-routing.module';

@NgModule({
	declarations: [
		ProfileComponent,
		ProfileSettingsComponent
	],
	imports: [
		ProfilesRoutingModule
	]
})
export class ProfilesModule {}
