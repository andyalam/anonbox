/*
  Service for communicating with sessionStorage.

  It's main purpose is to store keys in an easy identifiable place
  and to avoid 'magic' strings being used across the app.
*/
export class SessionStoreService {

  public TOKEN: string = 'login';
  public USER: string = 'user';

  public setStorage(key: string, value: string, stringify: boolean = true) {
    if (stringify) {
      sessionStorage[key] = JSON.stringify(value);
    } else {
      sessionStorage[key] = value;
    }

    return value;
  }

  public getStorage(key: string, parse: boolean = true) {
    const data = sessionStorage[key];
    if (parse && data) {
      return JSON.parse(data);
    } else {
      return data;
    }
  }

  public clearStorage(key: string) {
    sessionStorage.removeItem(key);
  }

  public clearStorageAll() {
    sessionStorage.clear();
  }
}
