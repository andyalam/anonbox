import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isNavOpen: boolean;

  constructor(private authService: AuthService,
              private router: Router) {
    this.router.events.subscribe(() => {
      this.closeNav();
    });
  }

  ngOnInit() {
  }

  // Avoid allowing the template to access our service directly
  getUsername() {
    const { username } = this.authService.getUser();
    return username;
  }

  onLogout() {
    this.authService.logout();
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }

  openNav() {
    this.isNavOpen = true;
  }

  closeNav() {
    this.isNavOpen = false;
  }

}
