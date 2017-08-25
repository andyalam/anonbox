import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProfilesService } from '../profiles.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile;

  isProfileLoading: boolean;
  error: string = '';

  constructor(private profilesService: ProfilesService,
              private authService: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    const profileName = this.route.snapshot.params.id;
    this.isProfileLoading = true;

    this.profilesService.getProfile(profileName)
      .subscribe(
        res => {
          this.isProfileLoading = false;
          console.log(res.json());
          const { user } = res.json();
          const { username } = user;
          this.profile = { ...this.profile, username  };
          console.log(this.profile);
        },
        err => {
          const { errmsg } = err.json();
          this.isProfileLoading = false;
          this.error = errmsg ? errmsg : 'Profile Load Failed';
        }
      );
  }

}
