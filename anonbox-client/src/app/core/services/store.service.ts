export abstract class Store<T> {
  public abstract setStorage(
    key: string,
    value,
    stringify: boolean
  ): T

  public abstract getStorage(key: string, parse: boolean)

  public abstract clearStorage(key: string): T

  public abstract clearStorageAll(): T
}
