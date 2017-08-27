import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProfilesService } from '../profiles.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile;
  isProfileOwner;

  isProfileLoading: boolean;
  error: string = '';

  selectedBox;

  constructor(private profilesService: ProfilesService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) { }

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
          const { user, boxes } = res.json();
          const { username } = user;
          this.profile = { ...this.profile, username, boxes  };
          console.log(this.profile);

          // check to see if current user is logged in user,
          // if so, set appropriate flag(s)
          const loggedInUser = this.authService.getUser();
          if (loggedInUser) {
            console.log('logged in user: ', loggedInUser);
            if (loggedInUser.username == username) {
              this.isProfileOwner = true;
              console.log('is owner');
            }
          }

        },
        err => {
          const { errmsg } = err.json();
          this.isProfileLoading = false;
          this.error = errmsg ? errmsg : 'Profile Load Failed';
        }
      );
  }

  onClickBox(box) {
    this.selectedBox = box;
    console.log('new box selected', this.selectedBox);
  }

}
