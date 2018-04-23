import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { API } from '../shared/config';
import { Box, Profile, Message } from '@anonbox-models/index';

@Injectable()
export class ProfilesService {
  constructor(private http: HttpClient) {}

  public getProfile(username: string): Observable<Profile> {
    const endpoint = API + `/profile/${username}`;

    return this.http
      .get(endpoint)
      .map(Profile.cast);
  }

  public postMessage(
    username: string,
    message: string,
    boxType?: string
  ): Observable<void> {
    const endpoint = API + `/profile/${username}`;
    const data = { message, boxType };

    return this.http
      .post<void>(endpoint, data);
  }

  public deleteBox(box: Box): Observable<Box> {
    const endpoint = API + `/box/${box.boxType}`;

    return this.http
      .delete(endpoint)
      .map(Box.cast);
  }

  public createBox(
    username: string,
    boxType: string,
    description?: string
  ): Observable<Box> {
    const endpoint = API + '/box';
    const data = { username, boxType, description };

    return this.http
      .post(endpoint, data)
      .map(Box.cast);
  }

}
