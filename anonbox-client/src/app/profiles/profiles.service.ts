import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { API } from '../shared/config';
import { Profile } from '@anonbox-models/profile';
import { Box } from '@anonbox-models/box';
import { Message } from '@anonbox-models/message';

@Injectable()
export class ProfilesService {
  constructor(private http: HttpClient) {}

  public getProfile(username): Observable<Profile> {
    const endpoint = API + `/profile/${username}`;

    return this.http.get(endpoint)
      .map(Profile.cast);
  }

  public postMessage(username, message, boxType?): Observable<void> {
    const endpoint = API + `/profile/${username}`;
    const data = { message, boxType };

    return this.http.post<void>(endpoint, data);
  }

  public deleteBox(box): Observable<Box> {
    const endpoint = API + `/box/${box.boxType}`;

    return this.http.delete(endpoint)
      .map(Box.cast);
  }

  public createBox(username, boxType, description?): Observable<Box> {
    const endpoint = API + '/box';
    const data = { username, boxType, description };

    return this.http.post(endpoint, data)
      .map(Box.cast);
  }

}
