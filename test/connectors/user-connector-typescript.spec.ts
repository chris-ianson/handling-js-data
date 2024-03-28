import Connector from "../../connectors/user-connector-typescript";
import {expect} from "chai";
import axios from "axios";
import sinon from "sinon";

const connector = new Connector();

describe('user-connector-typescript', function () {

  let axiosStub: any;

  beforeEach(() => {
    axiosStub = sinon.stub(axios, 'get').resolves(Promise.resolve({ data: {}}));
  });
  afterEach(() => {
    axiosStub.restore();
  });

  context('getUsers should', () => {

    it('should return result', (done) => {
      connector.getUsers().then((x: any) => {
        sinon.assert.calledWith(axiosStub, 'http://localhost:4000/users');
        expect(x).to.eql({});
        done();
      })
    });

  });

  context('getUsersByID should', () => {

    it('should return result', async () => {
      const response: any = await connector.getUsersByID(1);

      sinon.assert.calledWith(axiosStub, 'http://localhost:4000/users/1');
      expect(response).to.eql({});
    });

  });

});
