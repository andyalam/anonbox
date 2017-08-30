import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

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

  selectedBox;
  isAddFormShown: boolean = false; // default needed for direct toggle
  isAddFormLoading: boolean;
  addFormError: string;

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

  removeBox(targetBox) {
    this.profile.boxes = this.profile.boxes.filter(box => {
      return targetBox.boxType != box.boxType;
    });
  }

  onClickDeleteBox(box) {
    this.profilesService.deleteBox(box)
      .subscribe(
        res => {
          const { box } = res.json();
          this.removeBox(box);
        },
        err => console.log(err)
      );
  }

  isProfileOwner(): boolean {
    if (!this.profile || !this.authService.getUser()) {
      return false;
    }

    const { username } = this.authService.getUser();
    const profileUsername = this.profile.username;

    if (!username || !profileUsername) {
      return false;
    }

    return username == profileUsername;
  }

  onClickAddNewBox() {
    this.isAddFormShown = !this.isAddFormShown;
  }

  onSubmitAddNewForm(form: NgForm) {
    console.log(form.value);
    const { username } = this.authService.getUser();
    const { boxType, description } = form.value;

    const parsedDescription = description.length > 0 ? description : null;

    this.isAddFormLoading = true;

    this.profilesService.createBox(username, boxType, parsedDescription)
      .subscribe(
        res => {
          this.isAddFormLoading = false;
          this.onClickAddNewBox(); // close add form box

          const { box } = res.json();
          this.profile.boxes.push(box);
        },
        err => {
          this.isAddFormLoading = false;
          this.addFormError = err;
          setTimeout(() => this.addFormError = null, 5000);
          console.log(err);
        }
      );
  }

}
