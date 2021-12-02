export default class User {

  readonly firstName: string;

  readonly dateOfBirth: string;

  readonly age: number;

  readonly isDeveloper: boolean;

  readonly location?: string;

  constructor(firstName: string, dateOfBirth: string, age: number, isDeveloper: boolean, location?: string) {
    this.firstName = firstName;
    this.dateOfBirth = dateOfBirth;
    this.age = age;
    this.isDeveloper = isDeveloper;
    this.location = location;
  }
}
