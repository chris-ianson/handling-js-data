import 'reflect-metadata';
import {Expose, plainToInstance, Transform, Type} from 'class-transformer';
import dayjs, {Dayjs} from "dayjs";

type Family = 'DiMeo' | 'New York'

export default class User {

  @Expose()
  readonly firstName!: string;

  @Expose()
  readonly lastName!: string;

  @Expose()
  @Type(() => String)
  @Transform(({ value}) => dayjs(value, 'DD/MM/YYYY'))
  readonly dateOfBirth!: Dayjs;

  @Expose()
  readonly hits!: number;

  @Expose()
  readonly isDead!: boolean;

  @Expose()
  readonly family!: Family;

  @Expose()
  readonly location?: string;

  static deserialize(data: object[]): User[] {
    return plainToInstance(User, data, { excludeExtraneousValues: true });
  }

  areTheyDead(): string {
    return this.isDead ? 'Is dead: Yep!' : 'Is dead: Nope';
  }

  haveTheyWhackedAnybody(): string {
    return (this.hits === 0 ? 'Whacked anyone: No' : 'Whacked anyone: Yep!')
  }

  dateOfBirthFormatted = () : string => this.dateOfBirth.format('DD MMMM YYYY');

  getAge() {
    const currentYear = dayjs().get('year');
    const birthYear = this.dateOfBirth.get('year');
    return currentYear - birthYear;
  }
}
