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
          console.log(res.json());
        },
        err => {
          console.log(err);
        }
      );
  }

}
