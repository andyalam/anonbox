import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.css']
})
export class LoginComponent implements OnInit {
  loggingInSubscription: Subscription;
  loginForm: FormGroup;
  loading: boolean = false;
  error: string = '';

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
    this.loggingInSubscription && this.loggingInSubscription.unsubscribe();
  }

  initForm() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.email, Validators.required]),
      'password': new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;

    this.loading = true;
    this.loggingInSubscription = this.authService.login(email, password)
      .subscribe(
        (res) => {
          console.log(res.json());
          const { token } = res.json();
          this.authService.setToken(token);
          this.router.navigate(['/']);
        },
        (err) => this.error = err,
        () => this.loading = false
      );
  }

}
