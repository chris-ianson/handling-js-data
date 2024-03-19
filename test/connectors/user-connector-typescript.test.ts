import axios from 'axios';
import {getUsers, getUsersByID} from "../../connectors/user-connector-typescript";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
//TODO: Look at https://vhudyma-blog.eu/3-ways-to-mock-axios-in-jest/ (axios-mock-adapter)
describe('user-connector-typescript', function () {
  describe('getUsers', () => {
    test('should return result', async () => {
      mockedAxios.get.mockResolvedValueOnce(Promise.resolve({}));

      const result = await getUsers();

      expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:4000/users');
      expect(result).toEqual({});
    });
  })

  describe('getUsersByID', () => {
    test('should return result', async () => {
      mockedAxios.get.mockResolvedValueOnce(Promise.resolve({}));

      const result = await getUsersByID("1");

      expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:4000/users/1');
      expect(result).toEqual({});
    });
  });
});
