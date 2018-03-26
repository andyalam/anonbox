/*
  Service for communicating with localStorage.

  It's main purpose is to store keys in an easy identifiable place
  and to avoid 'magic' strings being used across the app.
*/
export class LocalStoreService {

  public REMEMBER_ME: string = 'rememberMe';

  public setStorage(key: string, value, stringify: boolean = true) {
    if (stringify) {
      localStorage[key] = JSON.stringify(value);
    } else {
      localStorage[key] = value;
    }

    return value;
  }

  public getStorage(key: string, parse: boolean = true) {
    const data = localStorage[key];
    if (data === 'undefined') {
      console.log(`undefined data found for key: ${key}`);
      return null;
    } else if (parse && data) {
      return JSON.parse(data);
    } else {
      return data;
    }
  }

  public clearStorage(key: string) {
    localStorage.removeItem(key);
  }

  public clearStorageAll() {
    localStorage.clear();
  }
}
