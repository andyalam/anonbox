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
import { matchOtherValidator } from '../../shared/match-other-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {
  registerForm: FormGroup;
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
    this.authService
      .register(email, username, password1)
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
