import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../auth.service';
import { matchOtherValidator } from '../../shared/match-other-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registeringSubscription: Subscription;
  registerForm: FormGroup;
  loading: boolean = false;
  error: string = '';

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.initForm()
  }

  ngOnDestroy() {
    this.registeringSubscription && this.registeringSubscription.unsubscribe();
  }

  initForm() {
    this.registerForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'email': new FormControl(null, [
        Validators.email,
        Validators.required
      ]),
      'password1': new FormControl(null, Validators.required),
      'password2': new FormControl(null, [
        Validators.required,
        matchOtherValidator('password1'),
      ])
    });
  }

  onSubmit() {
    const { email, username,  password1 } = this.registerForm.value;

    this.loading = true;
    this.registeringSubscription = this.authService.register(email, username, password1)
      .subscribe(
        (res) => {
          console.log(res.json());
          const { token } = res.json();
          this.authService.setToken(token);
          this.router.navigate(['/']);
        },
        (err) => {
          const { errmsg } = err.json();
          this.error = errmsg ? errmsg : 'Authorization Failed';
          this.loading = false;
        }
      );
  }

}
