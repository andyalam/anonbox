import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { API } from '../shared/config';

@Injectable()
export class ProfilesService {
  constructor(private http: HttpClient) {}

  getProfile(username): Observable<any> {
    const endpoint = API + `/profile/${username}`;

    return this.http.get(endpoint);
  }

  postMessage(username, message, boxType?): Observable<any> {
    const endpoint = API + `/profile/${username}`;
    const data = { message, boxType };

    return this.http.post(endpoint, data);
  }

  deleteBox(box): Observable<any> {
    const endpoint = API + `/box/${box.boxType}`;

    return this.http.delete(endpoint);
  }

  createBox(username, boxType, description?): Observable<any> {
    const endpoint = API + '/box';
    const data = { username, boxType, description };

    return this.http.post(endpoint, data);
  }

}
