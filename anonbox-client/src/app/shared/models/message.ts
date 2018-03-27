import { Model } from './model';

export class Message extends Model {
  public static cast(data: object): Message {
    return new Message(data);
  }

  constructor(data?: object) {
    super(data);
  }
}
