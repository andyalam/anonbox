import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProfileComponent } from './profile/profile.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ProfilesRoutingModule } from './profiles-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProfilesService } from './profiles.service';
import { MessageBoxComponent } from './message-box/message-box.component';
import { MessageViewBoxComponent } from './message-view-box/message-view-box.component';

@NgModule({
	declarations: [
		ProfileComponent,
		ProfileSettingsComponent,
		MessageBoxComponent,
		MessageViewBoxComponent
	],
	imports: [
		FormsModule,
		ReactiveFormsModule,
		ProfilesRoutingModule,
		SharedModule
	],
	providers: [
		ProfilesService
	]
})
export class ProfilesModule {}
