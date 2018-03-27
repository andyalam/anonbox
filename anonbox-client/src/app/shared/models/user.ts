import { Model } from './model';

export class User extends Model {
  public username: string;
  public email: string;

  public static cast(data: object): User {
    return new User(data);
  }

  constructor(data?: object) {
    super(data);
  }
}
