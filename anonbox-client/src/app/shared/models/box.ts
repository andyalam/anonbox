import { Model } from './model';

export class Box extends Model {
  public static cast(data: object): Box {
    return new Box(data);
  }

  public static casts(data: object[]): Box[] {
    return data.map(b => new Box(b));
  }

  constructor(data?: object) {
    super(data);
  }
}
