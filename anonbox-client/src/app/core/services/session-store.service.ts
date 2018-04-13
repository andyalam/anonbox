/*
  Service for communicating with sessionStorage.

  It's main purpose is to store keys in an easy identifiable place
  and to avoid 'magic' strings being used across the app.
*/
export class SessionStoreService {

  public TOKEN: string = 'login';
  public USER: string = 'user';

  public setStorage(
    key: string,
    value: string,
    stringify: boolean = true
  ): SessionStoreService {
    if (stringify) {
      sessionStorage[key] = JSON.stringify(value);
    } else {
      sessionStorage[key] = value;
    }

    return this;
  }

  public getStorage(key: string, parse: boolean = true) {
    const data = sessionStorage[key];
    if (parse && data) {
      return JSON.parse(data);
    } else {
      return data;
    }
  }

  public clearStorage(key: string): SessionStoreService {
    sessionStorage.removeItem(key);
    return this;
  }

  public clearStorageAll(): SessionStoreService {
    sessionStorage.clear();
    return this;
  }
}
