import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { ProfilesService } from '../profiles.service';
import { AuthService } from '@anonbox-services/index';
import { Box, Profile } from '@anonbox-models/index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public profile: Profile;
  public isProfileLoading: boolean;
  public error: string;

  public selectedBox: Box;
  public isAddFormShown: boolean = false; // default needed for direct toggle
  public isAddFormLoading: boolean;
  public addFormError: string;

  public isProfileOwner: boolean;
  private profileOwnerSubscription: Subscription;

  constructor(private profilesService: ProfilesService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) { }

  public ngOnInit() {
    this.loadProfile();
  }

  public ngOnDestroy() {
    if (this.profileOwnerSubscription) {
      this.profileOwnerSubscription.unsubscribe();
    }
  }

  private loadProfile() {
    const profileName = this.route.snapshot.params.id;
    this.isProfileLoading = true;

    this.profilesService
      .getProfile(profileName)
      .subscribe(
        (res: Profile) => {
          // Profile not found
          if (res === undefined || res === null) {
            this.onProfileNotFound();
            return;
          }
          this.isProfileLoading = false;
          this.profile = res;
          this.watchProfileOwner();

          // select default box
          if (
            this.profile.boxes !== undefined &&
            this.profile.boxes.length > 0
          ) {
            this.selectedBox = this.profile.boxes[0];
          }

        },
        err => {
          const { errmsg } = err;
          this.isProfileLoading = false;
          this.error = errmsg ? errmsg : 'Profile Load Failed';
        }
      );
  }

  private onProfileNotFound() {
    this.router.navigate(['/not-found']);
  }

  public onClickBox(box) {
    this.selectedBox = box;
  }

  private removeBox(targetBox) {
    this.profile.boxes = this.profile.boxes.filter(box => {
      return targetBox.boxType !== box.boxType;
    });
  }

  public onClickDeleteBox(selectedBox) {
    this.profilesService.deleteBox(selectedBox)
      .subscribe(
        this.removeBox.bind(this),
        console.error
      );
  }

  private watchProfileOwner() {
    const setProfileOwner = (res) => {
      if (!this.profile || !this.authService.getUser()) {
        this.isProfileOwner = false;
        return;
      }

      const { username } = this.authService.getUser();
      const profileUsername = this.profile.user.username;

      if (!username || !profileUsername) {
        this.isProfileOwner = false;
        return;
      }

      this.isProfileOwner = username === profileUsername;
      return;
    };

    this.profileOwnerSubscription = this.authService.currentAuthStatus.subscribe(
      setProfileOwner.bind(this),
      err => this.isProfileOwner = false
    );
  }

  public onClickAddNewBox() {
    this.isAddFormShown = !this.isAddFormShown;
  }

  public onSubmitAddNewForm(form: NgForm) {
    const { username } = this.authService.getUser();
    const { boxType, description } = form.value;

    const parsedDescription = description.length > 0 ? description : null;

    this.isAddFormLoading = true;

    this.profilesService
      .createBox(username, boxType, parsedDescription)
      .subscribe(
        (box: Box) => {
          this.isAddFormLoading = false;
          this.isAddFormShown = false;
          this.profile.boxes.push(box);
        },
        err => {
          this.isAddFormLoading = false;
          this.addFormError = err;
          setTimeout(() => this.addFormError = null, 5000);
          console.error(err);
        }
      );
  }

}
