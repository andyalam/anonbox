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

  public getProfile(username): Observable<any> {
    const endpoint = API + `/profile/${username}`;

    return this.http.get(endpoint);
  }

  public postMessage(username, message, boxType?): Observable<any> {
    const endpoint = API + `/profile/${username}`;
    const data = { message, boxType };

    return this.http.post(endpoint, data);
  }

  public deleteBox(box): Observable<any> {
    const endpoint = API + `/box/${box.boxType}`;

    return this.http.delete(endpoint);
  }

  public createBox(username, boxType, description?): Observable<any> {
    const endpoint = API + '/box';
    const data = { username, boxType, description };

    return this.http.post(endpoint, data);
  }

}
