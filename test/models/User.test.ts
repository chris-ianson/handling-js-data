import User from "../../models/User";
import UserGenerator from "../generators/UserGenerator";

describe('User should', function () {
  test('deserialize instance of User', () => {
    const userGenerated = UserGenerator.getUser();
    const data: any = [userGenerated];

    const user = User.deserialize(data);

    expect(user).toBeInstanceOf(Array);
    expect(user[0].firstName).toEqual(userGenerated.firstName);
    expect(user[0].lastName).toEqual(userGenerated.lastName);
    expect(user[0].location).toEqual(userGenerated.location);
    expect(user[0].family).toEqual(userGenerated.family);
    expect(user[0].isDead).toEqual(userGenerated.isDead);
  });

  test('return formatted date', () => {
    const userGenerated = UserGenerator.getUser();
    userGenerated.dateOfBirth = '05/15/2020';

    const user = User.deserialize([userGenerated]);

    expect(user[0].dateOfBirthFormatted()).toEqual('15 May 2020');
  });

  test('handle isDead == true', () => {
    const userGenerated = UserGenerator.getUser();
    userGenerated.isDead = true;

    const user = User.deserialize([userGenerated]);

    expect(user[0].areTheyDead()).toEqual('Is dead: Yep!');
  });

  test('handle isDead == false', () => {
    const userGenerated = UserGenerator.getUser();
    userGenerated.isDead = false;

    const user = User.deserialize([userGenerated]);

    expect(user[0].areTheyDead()).toEqual('Is dead: Nope');
  });

  test('handle hits === 1', () => {
    const userGenerated = UserGenerator.getUser();
    userGenerated.hits = 1;

    const user = User.deserialize([userGenerated]);

    expect(user[0].haveTheyWhackedAnybody()).toEqual('Whacked anyone: Yep!');
  });

  test('handle hits === 0', () => {
    const userGenerated = UserGenerator.getUser();
    userGenerated.hits = 0;

    const user = User.deserialize([userGenerated]);

    expect(user[0].haveTheyWhackedAnybody()).toEqual('Whacked anyone: No');
  });
});
