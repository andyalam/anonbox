import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { ProfilesService } from '../profiles.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public profile;
  public isProfileLoading: boolean;
  public error: string = '';

  public selectedBox;
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

    this.profilesService.getProfile(profileName)
      .subscribe(
        res => {
          this.isProfileLoading = false;
          console.log(res);
          const { user, boxes } = res;
          const { username } = user;

          // User not found
          if (!user) {
            this.onProfileNotFound();
            return;
          }

          this.profile = {
            ...this.profile,
            username,
            boxes,
            imageCSS: 'url(/assets/images/profile_placeholder.jpg)'
          };
          console.log(this.profile);

          this.watchProfileOwner();

          // select default box
          if (boxes && boxes.length) {
            this.selectedBox = boxes[0];
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
    console.log('new box selected', this.selectedBox);
  }

  private removeBox(targetBox) {
    this.profile.boxes = this.profile.boxes.filter(box => {
      return targetBox.boxType !== box.boxType;
    });
  }

  public onClickDeleteBox(box) {
    this.profilesService.deleteBox(box)
      .subscribe(
        res => {
          const { box } = res;
          this.removeBox(box);
        },
        err => console.log(err)
      );
  }

  private watchProfileOwner() {
    const setProfileOwner = (res) => {
      if (!this.profile || !this.authService.getUser()) {
        this.isProfileOwner = false;
        return;
      }

      const { username } = this.authService.getUser();
      const profileUsername = this.profile.username;

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

          const { box } = res;
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
