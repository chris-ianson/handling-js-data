import * as userService from "../../services/user-service-typescript";
import {getUsers, getUsersByID} from "../../connectors/user-connector-typescript";
import mockAxios from 'jest-mock-axios';
import User from "../../models/User";
import UserGenerator from "../generators/UserGenerator";
import AxiosGenerator from "../generators/AxiosGenerator";
import BaseGenerators from "../generators/BaseGenerators";

jest.mock('../../connectors/user-connector-typescript');

const mockGetUsers = getUsers as jest.MockedFunction<typeof getUsers>
const mockGetUsersByID = getUsersByID as jest.MockedFunction<typeof getUsersByID>

describe('user-service-typescript', () => {

  afterEach(() => {
    mockAxios.reset();
  });

  const data: { [key: string]: any }[] = [UserGenerator.getUser()];

  const axiosError = AxiosGenerator.getError();

  describe('getUsers should', () => {

    test('return user data', async () => {
      mockGetUsers.mockResolvedValue(data);

      const response = await userService.getUsers();

      expect(response).toBeInstanceOf(Array);
      expect(response[0]).toBeInstanceOf(User);
      expect(response[0].firstName).toEqual(data[0].firstName);
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
        expect(error).toEqual(axiosError);
      }
    });
  });

  describe('getUsersByID should', () => {

    it('return user data', async () => {
      const id = BaseGenerators.getNumber();
      mockGetUsersByID.mockResolvedValue(data);

      const response: any = await userService.getUsersByID(id);

      expect(response).toBeInstanceOf(User);
      expect(response.firstName).toEqual(data[0].firstName);
    });

    it('handle undefined response', async () => {
      const id = BaseGenerators.getNumber()
      mockGetUsersByID.mockResolvedValue([]);

      const response = await userService.getUsersByID(id);

      expect(response).toEqual(undefined);
    });

    it('handle 500 response', async () => {
      const id = BaseGenerators.getNumber()
      mockGetUsersByID.mockRejectedValue(axiosError);

      try {
        await userService.getUsersByID(id);
      } catch (error) {
        expect(error).toEqual(axiosError);
      }
    });
  });
});
