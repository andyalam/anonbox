import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { API } from '../shared/config';

@Injectable()
export class ProfilesService {
	constructor(private http: Http) {}

	getProfile(username): Observable<Response> {
		const endpoint = API + `/profile/${username}`;

		return this.http.get(endpoint);
	}

	postMessage(username, message): Observable<Response> {
		const endpoint = API + `/profile/${username}`;
		const data = { message };

		return this.http.post(endpoint, data);
	}

	deleteBox(box): Observable<Response> {
		const endpoint = API + `/box/${box.boxType}`;

		return this.http.delete(endpoint);
	}

	createBox(username, boxType, description?): Observable<Response> {
		const endpoint = API + '/box';
		const data = { username, boxType, description };

		return this.http.post(endpoint, data);
	}

}
