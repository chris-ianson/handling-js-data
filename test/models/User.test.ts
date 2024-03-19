import User from "../../models/User";

describe('User should', function () {
  test('deserialize instance of User', () => {
    const data: any = [];
    const user = User.deserialize(data);
    expect(user).toBeInstanceOf(Array);
  });
});
