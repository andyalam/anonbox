import { Model } from './model';

export class Message extends Model {
  public text: string;
  public created: string|Date;

  public static cast(data: object): Message {
    return new Message(data);
  }

  public static casts(data: object[]): Message[] {
    return data.map(m => new Message(m));
  }

  constructor(data?: object) {
    super(data);
  }
}
