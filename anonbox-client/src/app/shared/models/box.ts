import { Model } from './model';

export class Box extends Model {
  public static cast(data: object): Box {
    return new Box(data);
  }

  constructor(data?: object) {
    super(data);
  }
}
