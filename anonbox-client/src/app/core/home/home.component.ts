import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public isAuthenticated: boolean;
  public username: string;

  private authSubscription: Subscription;

  constructor(private authService: AuthService) {
    this.initAuthSubscription();
  }

  public ngOnInit() {
  }

  public ngOnDestroy() {
    // unsubscribe if we've created this subscription previously
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  private initAuthSubscription() {
    if (this.authService.isAuthenticated()) {
      this.isAuthenticated = this.authService.isAuthenticated();
      this.username = this.authService.getUser().username;
    }

    this.authSubscription = this.authService.currentAuthStatus.subscribe(
      res => this.isAuthenticated = res,
      err => this.isAuthenticated = false
    );
  }

}
