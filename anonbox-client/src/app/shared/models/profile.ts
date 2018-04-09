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

    if (this.user !== null && this.user !== undefined) {
      this.user = User.cast(this.user);
    }

    if (Array.isArray(this.boxes)) {
      this.boxes = Box.casts(this.boxes);
    }
  }
}
