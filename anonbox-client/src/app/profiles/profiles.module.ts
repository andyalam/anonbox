import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ProfileComponent } from './profile/profile.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ProfilesRoutingModule } from './profiles-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProfilesService } from './profiles.service';
import { MessageBoxComponent } from './message-box/message-box.component';
import { MessageViewBoxComponent } from './message-view-box/message-view-box.component';
import { DialogEditPhotoComponent } from './dialog-edit-photo/dialog-edit-photo.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileSettingsComponent,
    MessageBoxComponent,
    MessageViewBoxComponent,
    DialogEditPhotoComponent
  ],
  imports: [
    FormsModule,
    ProfilesRoutingModule,
    SharedModule
  ],
  providers: [
    ProfilesService
  ]
})
export class ProfilesModule {}
