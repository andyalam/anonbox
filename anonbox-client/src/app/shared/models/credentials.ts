import { Model } from './model';
import { User } from './user';

export class Credentials extends Model {
  public token: string;
  public user: User;

  public static cast(data: object): Credentials {
    return new Credentials(data);
  }

  constructor(data?: object) {
    super(data);
  }
}
