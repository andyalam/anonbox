import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '@anonbox-services/index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public isAuthenticated: boolean;
  public username: string;

  private subscriptions: Subscription = new Subscription();

  constructor(private authService: AuthService) {
    this.subscriptions.add(this.initAuthSubscription());
  }

  public ngOnInit() {
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private initAuthSubscription(): Subscription {
    if (this.authService.isAuthenticated()) {
      this.isAuthenticated = this.authService.isAuthenticated();
      this.username = this.authService.getUser().username;
    }

    return this.authService.currentAuthStatus.subscribe(
      res => this.isAuthenticated = res,
      err => this.isAuthenticated = false
    );
  }

}
