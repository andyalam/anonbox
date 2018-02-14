/*
	Service for communicating with sessionStorage.

	It's main purpose is to store keys in an easy identifiable place
	and to avoid 'magic' strings being used across the app.
*/
export class SessionStoreService {

	TOKEN: string = 'login';
	USER: string = 'user';

	setStorage(key: string, value:string, stringify: boolean = true) {
		if (stringify) {
			sessionStorage[key] = JSON.stringify(value);
		} else {
			sessionStorage[key] = value;
		}

		return value;
	}

	getStorage(key: string, parse: boolean = true) {
		const data = sessionStorage[key];
		if (parse && data) {
			return JSON.parse(data);
		} else {
			return data;
		}
	}

	clearStorage(key: string) {
		sessionStorage.removeItem(key);
	}

	clearStorageAll() {
		sessionStorage.clear();
	}
}
