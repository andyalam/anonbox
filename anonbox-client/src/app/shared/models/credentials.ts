import { Model } from './model';

export class Credentials extends Model {
  public token: string;
  private user: {
    username: string;
    email: string;
  };

  constructor(data?: object) {
    super(data);
  }
}
