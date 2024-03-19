import * as userService from "../../services/user-service-typescript";
import {getUsers, getUsersByID} from "../../connectors/user-connector-typescript";
import {AxiosError} from "axios";
import User from "../../models/User";

jest.mock('../../connectors/user-connector-typescript');

const mockGetUsers = getUsers as jest.MockedFunction<typeof getUsers>
const mockGetUsersByID = getUsersByID as jest.MockedFunction<typeof getUsersByID>

describe('user-service-typescript', () => {

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

  // @ts-ignore
  const axiosError404: AxiosError = new AxiosError("ECONNREFUSED","404",{},{},
    {
      data: { errors: [] },
      status:404,
      statusText:'ECONNREFUSED',
      headers:{},
      config:{}
    });

  // @ts-ignore
  const axiosError: AxiosError = new AxiosError("ECONNREFUSED","500",{},{},
    {
      data: { errors: [] },
      status:500,
      statusText:'ECONNREFUSED',
      headers:{},
      config:{}
    });

  describe('getUsers should', () => {

    test('return user data', async () => {
      mockGetUsers.mockResolvedValue(data);

      const response = await userService.getUsers();

      expect(response).toBeInstanceOf(Array);
      expect(response[0].firstName).toEqual('Jackie');
    });

    test('handle 404 response', async () => {
      mockGetUsers.mockRejectedValue(axiosError404)

      const response = await userService.getUsers();

      expect(response).toEqual([]);
    });

    it('handle invalid error response', async () => {
      // @ts-ignore
      const axiosErrorNoResponse: AxiosError = new AxiosError("ECONNREFUSED","500",{},{});
      mockGetUsers.mockRejectedValue(axiosErrorNoResponse)

      return userService
        .getUsers()
        .catch((result: any) => {
          expect(result).toBeInstanceOf(AxiosError);
          expect(result.code).toEqual("500");
        });
    });

    it('handle 500 response', async () => {
      mockGetUsers.mockRejectedValue(axiosError);

      return userService
        .getUsers()
        .catch((result: any) => {
          expect(result).toBeInstanceOf(AxiosError);
          expect(result.code).toEqual("500");
        });
    });

  });

  describe('getUsersByID should', () => {

    it('return user data', async () => {
      mockGetUsersByID.mockResolvedValue(data);

      const response: any = await userService.getUsersByID('1');

      expect(response).toBeInstanceOf(User);
      expect(response.firstName).toEqual('Jackie');
    });

    it('handle 404 response', async () => {
      mockGetUsersByID.mockRejectedValue(axiosError404);

      const response = await userService.getUsersByID('1');

      expect(response).toEqual(undefined);
    });

    it('handle invalid error response', async () => {
      // @ts-ignore
      const axiosErrorNoResponse: AxiosError = new AxiosError("ECONNREFUSED","500",{},{});
      mockGetUsersByID.mockRejectedValue(axiosErrorNoResponse);

      return userService
        .getUsersByID('1')
        .catch((result: any) => {
          expect(result).toBeInstanceOf(AxiosError);
          expect(result.code).toEqual("500");
        });
    });

    it('handle 500 response', async () => {
      mockGetUsersByID.mockRejectedValue(axiosError);

      return userService
        .getUsersByID('1')
        .catch((result: any) => {
          expect(result).toBeInstanceOf(AxiosError);
          expect(result.code).toEqual("500");
        });
    });
  });
});
