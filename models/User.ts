export default class User {

  readonly firstName: string;

  readonly lastName: string;

  readonly dateOfBirth: string;

  readonly hits: number;

  readonly isDead: boolean;

  readonly family: string;

  readonly location?: string;

  constructor(firstName: string, lastName: string, family: string, dateOfBirth: string, hits: number, isDeveloper: boolean, location?: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.family = family;
    this.dateOfBirth = dateOfBirth;
    this.hits = hits;
    this.isDead = isDeveloper;
    this.location = location;
  }
}
