import { Model } from './model';

export class User extends Model {
  public username: string;
  public email: string;

  constructor(data?: object) {
    super(data);
  }
}
