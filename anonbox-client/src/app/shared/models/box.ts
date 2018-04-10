import { Model } from './model';
import { Message } from './message';

export class Box extends Model {
  public username: string;
  public boxType: string;
  public description: string;
  public messages: Message[];

  public static cast(data: object): Box {
    return new Box(data);
  }

  public static casts(data: object[]): Box[] {
    return data.map(b => new Box(b));
  }

  constructor(data?: object) {
    super(data);

    if (Array.isArray(this.messages)) {
      this.messages = Message.casts(this.messages);
    }
  }
}
