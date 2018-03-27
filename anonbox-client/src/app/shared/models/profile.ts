import { Model } from './model';
import { Box } from './box';
import { User } from './user';


export class Profile extends Model {
  public user: User;
  public boxes: Box[];

  public static cast(data: object): Profile {
    return new Profile(data);
  }

  constructor(data?: object) {
    super(data);
  }
}
