import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  isAuthenticated: boolean;
  username: string;

  authSubscription: Subscription;

  constructor(private authService: AuthService) {
    this.initAuthSubscription();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // unsubscribe if we've created this subscription previously
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  initAuthSubscription() {
    if (this.authService.isAuthenticated()) {
      this.isAuthenticated = this.authService.isAuthenticated();
      this.username = this.authService.getUser().username;
    }

    this.authSubscription = this.authService.authStatus.subscribe(
      res => this.isAuthenticated = res,
      err => this.isAuthenticated = false
    );
  }

}
