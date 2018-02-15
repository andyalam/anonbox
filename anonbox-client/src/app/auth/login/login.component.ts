import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.scss']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
  loggingInSubscription: Subscription;
  loginForm: FormGroup;
  loading: boolean = false;
  error: string = '';

  @ViewChild('initialInput') initialInput: ElementRef;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  ngAfterViewInit() {
    this.initialInput.nativeElement.focus();
  }

  ngOnDestroy() {
    if (this.loggingInSubscription) {
      this.loggingInSubscription.unsubscribe();
    }
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
          const { token, user } = res.json();
          this.authService.setToken(token);
          this.authService.setUser(user);
          this.authService.setAuthStatus();
          this.router.navigate([`/profile/${user.username}`]);
        },
        (err) => {
          this.loading = false;
          this.error = err;
        }
      );
  }

}
