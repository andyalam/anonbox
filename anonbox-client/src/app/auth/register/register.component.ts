import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { matchOtherValidator } from '../../shared/match-other-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading: boolean = false;
  error: string = '';

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
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

  onSubmit() {
    const { email, username,  password } = this.registerForm.value;

    this.loading = true;
    this.authService
      .register(email, username, password)
      .subscribe(
        ({ user }) => {
          this.router.navigate([`/profile/${user.username}`]);
        },
        (err) => {
          const { errmsg } = err;
          this.error = errmsg ? errmsg : 'Authorization Failed';
          this.loading = false;
        }
      );
  }

}
