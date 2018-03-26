import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  public isNavOpen: boolean;

  constructor(private authService: AuthService,
              private router: Router) {
    this.router.events.subscribe(() => {
      this.closeNav();
    });
  }

  public ngOnInit() {
  }

  // Avoid allowing the template to access our service directly
  public getUsername() {
    const { username } = this.authService.getUser();
    return username;
  }

  public onLogout() {
    this.authService.logout();
  }

  public isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  public toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }

  public openNav() {
    this.isNavOpen = true;
  }

  public closeNav() {
    this.isNavOpen = false;
  }

}
