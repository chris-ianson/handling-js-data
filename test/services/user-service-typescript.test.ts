import * as userService from "../../services/user-service-typescript";
import {getUsers, getUsersByID} from "../../connectors/user-connector-typescript";
import mockAxios from 'jest-mock-axios';
import User from "../../models/User";

jest.mock('../../connectors/user-connector-typescript');

const mockGetUsers = getUsers as jest.MockedFunction<typeof getUsers>
const mockGetUsersByID = getUsersByID as jest.MockedFunction<typeof getUsersByID>

describe('user-service-typescript', () => {

  afterEach(() => {
    mockAxios.reset();
  });

  const data: object =
    [{
      firstName: "Jackie",
      isDead: true,
      hits: 20,
      lastName: "Aprile",
      location: 'New Jersey',
      dateOfBirth: '07/05/1954',
      family: "DiMeo",
    }];

  const axiosError = {
    data: {},
    status: 500,
    statusText: 'InternalServerError',
    headers: {},
    config: {},
    "isAxiosError": true,
  };

  describe('getUsers should', () => {

    test('return user data', async () => {
      mockGetUsers.mockResolvedValue(data);

      const response = await userService.getUsers();

      expect(response).toBeInstanceOf(Array);
      expect(response[0].firstName).toEqual('Jackie');
    });

    test('handle [] response', async () => {
      mockGetUsers.mockResolvedValue([]);

      const response = await userService.getUsers();

      expect(response).toEqual([]);
    });

    it('handle 500 response', async () => {
      mockGetUsers.mockRejectedValue(axiosError);

      try {
        await userService.getUsers();
      } catch (error) {
        expect(error).toEqual({
          "config": {},
          "data": {},
          "headers": {},
          "isAxiosError": true,
          "status": 500,
          "statusText": "InternalServerError"
        });
      }
    });
  });

  describe('getUsersByID should', () => {

    it('return user data', async () => {
      mockGetUsersByID.mockResolvedValue(data);

      const response: any = await userService.getUsersByID('1');

      expect(response).toBeInstanceOf(User);
      expect(response.firstName).toEqual('Jackie');
    });

    it('handle undefined response', async () => {
      mockGetUsersByID.mockResolvedValue([]);

      const response = await userService.getUsersByID('1');

      expect(response).toEqual(undefined);
    });

    it('handle 500 response', async () => {
      mockGetUsersByID.mockRejectedValue(axiosError);

      try {
        await userService.getUsersByID("1");
      } catch (error) {
        expect(error).toEqual({
          "config": {},
          "data": {},
          "headers": {},
          "isAxiosError": true,
          "status": 500,
          "statusText": "InternalServerError"
        });
      }
    });
  });
});
