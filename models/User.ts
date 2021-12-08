import { plainToInstance } from 'class-transformer';

type Family = 'DiMeo' | 'New York'

export default class User {

  readonly firstName!: string;

  readonly lastName!: string;

  readonly dateOfBirth!: string;

  readonly hits!: number;

  readonly isDead!: boolean;

  readonly family!: Family;

  readonly location?: string;

  static deserialize(data: object[]): User[] {
    return plainToInstance(User, data);
  }

  areTheyDead(): string {
    return this.isDead ? 'Is dead: Yep!' : 'Is dead: Nope';
  }

  haveTheyWhackedAnybody(): string {
    return (this.hits === 0 ? 'Whacked anyone: No' : 'Whacked anyone: Yep!')
  }
}
