import { Model } from './model';
import { User } from './user';

export class Credentials extends Model {
  public token: string;
  public user: User;

  constructor(data?: object) {
    super(data);
  }
}
