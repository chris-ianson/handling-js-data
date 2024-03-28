import * as userService from "../../services/user-service-typescript";
import User from "../../models/User";
import UserGenerator from "../generators/UserGenerator";
import AxiosGenerator from "../generators/AxiosGenerator";
import BaseGenerators from "../generators/BaseGenerators";
import Connector from "../../connectors/user-connector-typescript";

describe('user-service-typescript', () => {

  const data: { [key: string]: any }[] = [UserGenerator.getUser()];

  const axiosError = AxiosGenerator.getError();

  beforeEach(() => {
    jest.spyOn(Connector.prototype, 'getUsers').mockResolvedValue(data);
    jest.spyOn(Connector.prototype, 'getUsersByID').mockResolvedValue(data);
  })
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getUsers should', () => {
    test('return user data', async () => {
      const response = await userService.getUsers();

      expect(response).toBeInstanceOf(Array);
      expect(response[0]).toBeInstanceOf(User);
      expect(response[0].firstName).toEqual(data[0].firstName);
    });

    test('handle [] response', async () => {
      jest.spyOn(Connector.prototype, 'getUsers').mockResolvedValue([]);

      const response = await userService.getUsers();

      expect(response).toEqual([]);
    });

    it('handle 500 response', async () => {
      jest.spyOn(Connector.prototype, 'getUsers').mockRejectedValue(axiosError);

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

      const response: any = await userService.getUsersByID(id);

      expect(response).toBeInstanceOf(User);
      expect(response.firstName).toEqual(data[0].firstName);
    });

    it('handle empty array', async () => {
      const id = BaseGenerators.getNumber()
      jest.spyOn(Connector.prototype, 'getUsersByID').mockResolvedValue([]);

      const response = await userService.getUsersByID(id);

      expect(response).toEqual(undefined);
    });

    it('handle 500 response', async () => {
      const id = BaseGenerators.getNumber()
      jest.spyOn(Connector.prototype, 'getUsersByID').mockRejectedValue(axiosError);

      try {
        await userService.getUsersByID(id);
      } catch (error) {
        expect(error).toEqual(axiosError);
      }
    });
  });
});
