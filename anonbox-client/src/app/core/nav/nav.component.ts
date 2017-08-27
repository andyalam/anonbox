import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private authService: AuthService) { }

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

}
