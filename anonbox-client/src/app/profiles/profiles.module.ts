import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ProfileComponent } from './profile/profile.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ProfilesRoutingModule } from './profiles-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProfilesService } from './profiles.service';
import { MessageBoxComponent } from './message-box/message-box.component';

@NgModule({
	declarations: [
		ProfileComponent,
		ProfileSettingsComponent,
		MessageBoxComponent
	],
	imports: [
		ReactiveFormsModule,
		ProfilesRoutingModule,
		SharedModule
	],
	providers: [
		ProfilesService
	]
})
export class ProfilesModule {}
