import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { API } from '@anonbox-shared/config';
import { SessionStoreService } from '@anonbox-services/session-store.service';
import { Credentials, User } from '@anonbox-models/index';

@Injectable()
export class AuthService {
  private authStatus: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public currentAuthStatus: Observable<boolean> = this.authStatus.asObservable();

  private credentialsCast = (data) => new Credentials(data);

  constructor(private http: HttpClient,
              private sessionStore: SessionStoreService) {
    const loggedIn: boolean = !!this.getToken();

    this.authStatus.next(loggedIn);
  }

  public setAuthStatus() {
    const status = this.isAuthenticated();

    this.authStatus.next(status);
  }

  public register(
    email: string,
    username: string,
    password: string
  ): Observable<Credentials> {
    const endpoint: string = API + '/register';
    const body = { email, username, password };

    return this.http
      .post(endpoint, body)
      .map(this.credentialsCast)
      .map(this.handleStoringCredentials.bind(this));
  }

  public login(email: string, password: string): Observable<Credentials>  {
    const endpoint: string = API + '/login';
    const body = { email, password };

    return this.http
      .post(endpoint, body)
      .map(this.credentialsCast)
      .map(this.handleStoringCredentials.bind(this));
  }

  public logout() {
    this.sessionStore.clearStorage(
      this.sessionStore.TOKEN
    );

    this.sessionStore.clearStorage(
      this.sessionStore.USER
    );
    this.setAuthStatus();
  }

  private getToken() {
    return this.sessionStore.getStorage(
      this.sessionStore.TOKEN
    );
  }

  private setToken(token) {
    this.sessionStore.setStorage(
      this.sessionStore.TOKEN,
      token
    );
  }

  public getUser(): User {
    const userProperties: object = this.sessionStore.getStorage(
      this.sessionStore.USER
    );
    const user: User = new User({
      ...userProperties
    });

    return user;
  }

  private setUser(user) {
    this.sessionStore.setStorage(
      this.sessionStore.USER,
      user
    );
  }

  private get header(): { Authorization: string } {
    const token = this.sessionStore.getStorage(
      this.sessionStore.TOKEN
    );

    const header = {
      Authorization: 'Bearer ' + token
    };

    return header;
  }

  public isAuthenticated(): boolean {
    const token = this.sessionStore.getStorage(
      this.sessionStore.TOKEN
    );
    return token != null;
  }

  private handleStoringCredentials(res: Credentials): Credentials {
    const { token, user } = res;
    this.setToken(token);
    this.setUser(user);
    this.setAuthStatus();
    return res;
  }

}
