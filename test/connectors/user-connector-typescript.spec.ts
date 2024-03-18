import {getUsers, getUsersByID} from "../../connectors/user-connector-typescript";
import {expect} from "chai";
import axios from "axios";
import sinon from "sinon";

describe('user-connector-typescript', function () {

  let axiosStub: any;

  beforeEach(() => {
    axiosStub = sinon.stub(axios, 'get').resolves(Promise.resolve({}));
  });
  afterEach(() => {
    axiosStub.restore();
  });

  context('getUsers should', () => {

    it('should return result', (done) => {
      getUsers().then((x) => {
        sinon.assert.calledWith(axiosStub, 'http://localhost:4000/users');
        expect(x).to.eql({});
        done();
      })
    });

  });

  context('getUsersByID should', () => {

    it('should return result', async () => {
      const response: any = await getUsersByID("1");

      sinon.assert.calledWith(axiosStub, 'http://localhost:4000/users/1');
      expect(response).to.eql({});
    });

  });

});
