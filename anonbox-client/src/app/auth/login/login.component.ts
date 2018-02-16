import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
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

  initForm() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.email, Validators.required]),
      'password': new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;

    this.loading = true;
    this.authService
      .login(email, password)
      .subscribe(
        (res: any) => {
          const { token, user } = res;
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
