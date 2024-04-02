import {expect} from "chai";
import sinon from 'sinon';
import * as userService from '../../src/services/user-service-typescript';
import User from "../../src/models/User";
import {AxiosError} from "axios";
import Connector from "../../src/connectors/user-connector-typescript";

describe('user-service-typescript', () => {

  let mockGetUsers: any;
  let mockGetUsersByID: any;

  // @ts-ignore
  const axiosError: AxiosError = new AxiosError("ECONNREFUSED","500",{},{},
    {
      data: { errors: [] },
      status:500,
      statusText:'ECONNREFUSED',
      headers:{},
      config:{}
    });

  // @ts-ignore
  const axiosError404: AxiosError = new AxiosError("ECONNREFUSED","404",{},{},
    {
      data: { errors: [] },
      status:404,
      statusText:'ECONNREFUSED',
      headers:{},
      config:{}
    });
  /**
   * TODO:
   * Add tests for routes
   * Add coverage
   * Push up to new branch
   * Convert tests to jest
   */
  const data: object =
    {
      data: [{
        firstName: "Jackie",
        isDead: true,
        hits: 20,
        lastName: "Aprile",
        location: 'New Jersey',
        dateOfBirth: '07/05/1954',
        family: "DiMeo",
      }]
    };

  beforeEach(() => {
    mockGetUsers = sinon.stub(Connector.prototype, 'getUsers').resolves(data);
    mockGetUsersByID = sinon.stub(Connector.prototype, 'getUsersByID').resolves(data);
  });
  afterEach(() => {
    mockGetUsers.restore();
    mockGetUsersByID.restore();
  })

  context('getUsers should', () => {

    it('return user data', async () => {
      const response = await userService.getUsers();

      expect(response).to.be.instanceOf(Array);
      expect(response[0].firstName).to.eq('Jackie');
    });

    it('handle 404 response', async () => {
      mockGetUsers.restore();
      mockGetUsers = sinon.stub(Connector.prototype, 'getUsers').rejects(axiosError404);

      const response = await userService.getUsers();

      expect(response).to.deep.eq([]);
    });

    it('handle invalid error response', async () => {
      // @ts-ignore
      const axiosErrorNoResponse: AxiosError = new AxiosError("ECONNREFUSED","500",{},{});
      mockGetUsers.restore();
      mockGetUsers = sinon.stub(Connector.prototype, 'getUsers').rejects(axiosErrorNoResponse);

      return userService
        .getUsers()
        .catch((result: any) => {
          expect(result).to.be.instanceOf(AxiosError);
          expect(result.code).to.eql("500");
        });
    });

    it('handle 500 response', async () => {
      mockGetUsers.restore();
      mockGetUsers = sinon.stub(Connector.prototype, 'getUsers').rejects(axiosError);

      return userService
        .getUsers()
        .catch((result: any) => {
          expect(result).to.be.instanceOf(AxiosError);
          expect(result.code).to.eql("500");
        });
    });
  });

  context('getUsersByID should', () => {

    it('return user data', async () => {
      const response: any = await userService.getUsersByID(1);

      expect(response).to.be.instanceOf(User);
      expect(response.firstName).to.eq('Jackie');
    });

    it('handle 404 response', async () => {
      mockGetUsersByID.restore();
      mockGetUsersByID = sinon.stub(Connector.prototype, 'getUsersByID').rejects(axiosError404);

      const response = await userService.getUsersByID(1);

      expect(response).to.deep.eq(undefined);
    });

    it('handle invalid error response', async () => {
      // @ts-ignore
      const axiosErrorNoResponse: AxiosError = new AxiosError("ECONNREFUSED","500",{},{});
      mockGetUsersByID.restore();
      mockGetUsersByID = sinon.stub(Connector.prototype, 'getUsersByID').rejects(axiosErrorNoResponse);

      return userService
        .getUsersByID(1)
        .catch((result: any) => {
          expect(result).to.be.instanceOf(AxiosError);
          expect(result.code).to.eql("500");
        });
    });

    it('handle 500 response', async () => {
      mockGetUsersByID.restore();
      mockGetUsersByID = sinon.stub(Connector.prototype, 'getUsersByID').rejects(axiosError);

      return userService
        .getUsersByID(1)
        .catch((result: any) => {
          expect(result).to.be.instanceOf(AxiosError);
          expect(result.code).to.eql("500");
        });
    });
  });
})
