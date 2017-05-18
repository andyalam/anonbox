import { Http } from '@angular/http';

const API = 'localhost:3000/api';

export class AuthService {
	token: string;

	constructor(private http: Http) {}

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
		this.token = null;
	}

	getToken() {
		return this.token;
	}

	getHeader() {
		const header = {
			Authorization: 'Bearer ' + this.token
		};

		return header;
	}

	isAuthenticated() {
		return this.token != null;
	}

}
