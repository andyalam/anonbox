import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { SessionStoreService } from '../shared/sessionStore.service';

const API = 'http://localhost:3000/api';

@Injectable()
export class AuthService {
	constructor(private http: Http,
							private sessionStore: SessionStoreService) {}

	register(email: string, name: string, password: string) {
		const endpoint:string = API + '/register';
		const body = { email, name, password };

		return this.http.post(endpoint, body);
	}

	login(email:string, password: string) {
		const endpoint: string = API + '/login';
		const body = { email, password };

		return this.http.post(endpoint, body);
	}

	logout() {
		this.sessionStore.clearStorage(
			this.sessionStore.TOKEN
		);
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

	getHeader() {
		const token = this.sessionStore.getStorage(
			this.sessionStore.TOKEN
		);

		const header = {
			Authorization: 'Bearer ' + token
		};

		return header;
	}

	isAuthenticated() {
		const token = this.sessionStore.getStorage(
			this.sessionStore.TOKEN
		);
		return token != null;
	}

}