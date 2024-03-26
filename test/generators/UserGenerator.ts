import fastCheck from "fast-check";
import dayjs from "dayjs";

export default class UserGenerator {

  static user = fastCheck.record(
    {
      firstName: fastCheck.constantFrom('Jackie', 'Tony'),
      lastName: fastCheck.constantFrom('Aprile', 'Soprano'),
      location: fastCheck.constant('New Jersey'),
      family: fastCheck.constantFrom('DiMeo', 'Soprano'),
      isDead: fastCheck.boolean(),
      hits: fastCheck.integer({ min: 0, max: 20}),
      dateOfBirth: fastCheck.date(
        {
          min: new Date('1950-01-01T00:00:00.000Z'),
          max: new Date('1990-01-01T00:00:00.000Z'),
        }
      ).map((date: Date) => dayjs(date).format('DD/MM/YYYY'))
    }
  );

  static getUser = () => fastCheck.sample(UserGenerator.user, 1)[0];

  static getMultipleUsers = (count: number): object[] => fastCheck.sample(UserGenerator.user, count);

}
