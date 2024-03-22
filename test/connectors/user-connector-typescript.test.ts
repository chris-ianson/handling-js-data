import mockAxios from 'jest-mock-axios';
import {getUsers, getUsersByID} from "../../connectors/user-connector-typescript";

describe('user-connector-typescript', function () {

  afterEach(() => {
    mockAxios.reset();
  });

  describe('getUsers', () => {
    test('should handle 200 response', async () => {
      const promise = getUsers();

      expect(mockAxios.get).toHaveBeenCalledWith(
        expect.stringMatching("http://localhost:4000/users"),
        expect.objectContaining(
          {
            "validateStatus": expect.anything()
          }
        ));

      mockAxios.mockResponse({data: 'data here'});

      const result = await promise;

      expect(result).toEqual("data here");
    });

    test('should handle 404  response', async () => {
      const promise = getUsers();

      expect(mockAxios.get).toHaveBeenCalledWith(
        expect.stringMatching("http://localhost:4000/users"),
        expect.objectContaining(
          {
            "validateStatus": expect.anything()
          }
        ));

      mockAxios.mockResponse({
        data: {},
        status: 404,
        statusText: 'NotFound',
        headers: {},
        config: {},
      });

      const result = await promise;

      expect(result).toEqual([]);
    });

    test('should handle 500 response', async () => {
      const promise = getUsers();
      mockAxios.mockError({
        data: {},
        status: 500,
        statusText: 'InternalServerError',
        headers: {},
        config: {},
      });

      try {
        await promise;
      } catch (error) {
        expect(error).toEqual({"config": {}, "data": {}, "headers": {}, "isAxiosError": true, "status": 500, "statusText": "InternalServerError"});
      }
    });
  })

  describe('getUsersByID', () => {
    test('should return result', async () => {
      const promise = getUsersByID("1");

      expect(mockAxios.get).toHaveBeenCalledWith(
        expect.stringMatching("http://localhost:4000/users/1"),
        expect.objectContaining(
          {
            "validateStatus": expect.anything()
          }
        ));

      mockAxios.mockResponse({data: 'data here'});

      const result = await promise;

      expect(result).toEqual("data here");
    });

    test('should handle 404  response', async () => {
      const promise = getUsersByID("1");

      expect(mockAxios.get).toHaveBeenCalledWith(
        expect.stringMatching("http://localhost:4000/users/1"),
        expect.objectContaining(
          {
            "validateStatus": expect.anything()
          }
        ));

      mockAxios.mockResponse({
        data: {},
        status: 404,
        statusText: 'NotFound',
        headers: {},
        config: {},
      });

      const result = await promise;

      expect(result).toEqual([]);
    });

    test('should handle 500 response', async () => {
      const promise = getUsersByID("1");
      mockAxios.mockError({
        data: {},
        status: 500,
        statusText: 'InternalServerError',
        headers: {},
        config: {},
      });

      try {
        await promise;
      } catch (error) {
        expect(error).toEqual({"config": {}, "data": {}, "headers": {}, "isAxiosError": true, "status": 500, "statusText": "InternalServerError"});
      }
    });
  });
});
