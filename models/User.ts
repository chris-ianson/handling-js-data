
type Family = 'DiMeo' | 'New York'

export default class User {

  readonly firstName: string;

  readonly lastName: string;

  readonly dateOfBirth: string;

  readonly hits: number;

  readonly isDead: boolean;

  readonly family: Family;

  readonly location?: string;

  constructor(firstName: string, lastName: string, family: Family, dateOfBirth: string, hits: number, isDeveloper: boolean, location?: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.family = family;
    this.dateOfBirth = dateOfBirth;
    this.hits = hits;
    this.isDead = isDeveloper;
    this.location = location;
  }

  areTheyDead(): string {
    return this.isDead ? 'Is dead: Yep!' : 'Is dead: Nope';
  }

  haveTheyWhackedAnybody(): string {
    return (this.hits === 0 ? 'Whacked anyone: No' : 'Whacked anyone: Yep!')
  }
}
