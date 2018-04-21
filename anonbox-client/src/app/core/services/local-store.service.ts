/*
  Service for communicating with localStorage.

  It's main purpose is to store keys in an easy identifiable place
  and to avoid 'magic' strings being used across the app.
*/
export class LocalStoreService {

  public REMEMBER_ME: string = 'rememberMe';

  public setStorage(
    key: string,
    value,
    stringify: boolean = true
  ): LocalStoreService {
    if (stringify) {
      localStorage[key] = JSON.stringify(value);
    } else {
      localStorage[key] = value;
    }

    return this;
  }

  public getStorage(key: string, parse: boolean = true) {
    const data = localStorage[key];
    if (data === 'undefined') {
      console.error(`undefined data found for key: ${key}`);
      return null;
    } else if (parse && data) {
      return JSON.parse(data);
    } else {
      return data;
    }
  }

  public clearStorage(key: string): LocalStoreService {
    localStorage.removeItem(key);
    return this;
  }

  public clearStorageAll(): LocalStoreService {
    localStorage.clear();
    return this;
  }
}
