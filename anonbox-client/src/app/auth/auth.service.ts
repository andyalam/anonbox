import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { API } from '../shared/config';
import { SessionStoreService } from '@anonbox-services/sessionStore.service';
import { Credentials } from '@anonbox-models/credentials';

@Injectable()
export class AuthService {
  authStatus: BehaviorSubject<boolean>;

  credentialsCast = (data) => new Credentials(data);

  constructor(private http: HttpClient,
              private sessionStore: SessionStoreService) {
    const loggedIn: boolean = !!this.getToken();

    this.authStatus = new BehaviorSubject(loggedIn);
  }

  setAuthStatus(){
    const status = this.isAuthenticated();

    this.authStatus.next(status);
  }

  register(
    email: string,
    username: string,
    password: string
  ): Observable<Credentials> {
    const endpoint: string = API + '/register';
    const body = { email, username, password };

    return this.http
      .post(endpoint, body)
      .map(this.credentialsCast);
  }

  login(email: string, password: string): Observable<Credentials>  {
    const endpoint: string = API + '/login';
    const body = { email, password };
    this.setAuthStatus();

    return this.http
      .post(endpoint, body)
      .map(this.credentialsCast);
  }

  logout() {
    this.sessionStore.clearStorage(
      this.sessionStore.TOKEN
    );

    this.sessionStore.clearStorage(
      this.sessionStore.USER
    );
    this.setAuthStatus();
  }

  getToken() {
    return this.sessionStore.getStorage(
      this.sessionStore.TOKEN
    );
  }

  setToken(token) {
    this.sessionStore.setStorage(
      this.sessionStore.TOKEN,
      token
    );
  }

  getUser() {
    return this.sessionStore.getStorage(
      this.sessionStore.USER
    );
  }

  setUser(user) {
    this.sessionStore.setStorage(
      this.sessionStore.USER,
      user
    );
  }

  get header() {
    const token = this.sessionStore.getStorage(
      this.sessionStore.TOKEN
    );

    const header = {
      Authorization: 'Bearer ' + token
    };

    return header;
  }

  isAuthenticated(): boolean {
    const token = this.sessionStore.getStorage(
      this.sessionStore.TOKEN
    );
    return token != null;
  }

}
