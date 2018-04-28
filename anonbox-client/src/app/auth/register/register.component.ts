import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '@anonbox-services/index';
import { Credentials } from '@anonbox-models/index';
import { matchOtherValidator } from '../../shared/match-other-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public loading: boolean = false;
  public error: HttpErrorResponse|string = '';

  constructor(private authService: AuthService,
              private router: Router) { }

  public ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.registerForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'email': new FormControl(null, [
        Validators.email,
        Validators.required
      ]),
      'password': new FormControl(null, Validators.required),
      'passwordRepeat': new FormControl(null, [
        Validators.required,
        matchOtherValidator('password'),
      ])
    });
  }

  public onSubmit(): Subscription {
    const { email, username,  password } = this.registerForm.value;

    this.loading = true;
    return this.authService
      .register(email, username, password)
      .subscribe(
        ({ user }: Credentials) => {
          this.router.navigate([`/profile/${user.username}`]);
        },
        (err: HttpErrorResponse|string) => {
          this.error = err;
          this.loading = false;
        }
      );
  }

}
