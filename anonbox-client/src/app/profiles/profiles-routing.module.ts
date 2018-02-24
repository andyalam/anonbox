import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';

const profilesRoutes: Routes = [
  { path: ':id', component: ProfileComponent },
  { path: 'settings', component: ProfileSettingsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(profilesRoutes)
  ],
  exports: [RouterModule]
})
export class ProfilesRoutingModule {}
