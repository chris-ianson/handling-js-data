import { expect } from 'chai';

import User from "../../src/models/User";

describe('User model', () => {

  context('deserialize should', () => {
    it('return instance of User', () => {
      const data: any = {};

      expect(User.deserialize(data)).to.be.an.instanceof(User);
    });
  });
});
