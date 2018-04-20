import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '@anonbox-services/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public loading: boolean = false;
  public error: string = '';

  constructor(private authService: AuthService,
              private router: Router) { }

  public ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.email, Validators.required]),
      'password': new FormControl(null, Validators.required)
    });
  }

  public onSubmit(): Subscription {
    const { email, password } = this.loginForm.value;

    this.loading = true;
    return this.authService
      .login(email, password)
      .subscribe(
        ({ user }) => {
          this.router.navigate([`/profile/${user.username}`]);
        },
        (err) => {
          this.loading = false;
          this.error = err;
        }
      );
  }

}
