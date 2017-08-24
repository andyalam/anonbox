import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { API } from '../shared/config';

export class ProfilesService {
	constructor(private http: Http) {}

	getProfile(profileID) {
		const endpoint = API + `/profile/${profileID}`;
		
		return this.http.get(endpoint);
	}
}
