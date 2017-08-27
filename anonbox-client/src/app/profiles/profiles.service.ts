import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { API } from '../shared/config';

@Injectable()
export class ProfilesService {
	constructor(private http: Http) {}

	getProfile(username) {
		const endpoint = API + `/profile/${username}`;

		return this.http.get(endpoint);
	}

	postMessage(username, message) {
		const endpoint = API + `/profile/${username}`;
		const data = { message };

		return this.http.post(endpoint, data);
	}
}
