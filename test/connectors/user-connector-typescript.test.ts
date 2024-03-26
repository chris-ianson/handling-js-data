import mockAxios from 'jest-mock-axios';
import {getUsers, getUsersByID} from "../../connectors/user-connector-typescript";
import AxiosGenerator from "../generators/AxiosGenerator";
import BaseGenerators from "../generators/BaseGenerators";

describe('user-connector-typescript', function () {

  afterEach(() => {
    mockAxios.reset();
  });

  describe('getUsers', () => {
    test('should handle 200 response', async () => {
      const promise = getUsers();
      const dataObject = BaseGenerators.getDataObject();

      expect(mockAxios.get).toHaveBeenCalledWith(
        expect.stringMatching("http://localhost:4000/users"),
        expect.objectContaining(
          {
            "validateStatus": expect.anything()
          }
        ));

      mockAxios.mockResponse(dataObject);

      expect(await promise).toEqual(dataObject.data);
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

      mockAxios.mockResponse(AxiosGenerator.get404());

      expect(await promise).toEqual([]);
    });

    test('should handle 500 response', async () => {
      const promise = getUsers();
      mockAxios.mockError(AxiosGenerator.getError());

      promise.catch((e) => {
        expect(e).toEqual({"config": {}, "data": {}, "headers": {}, "isAxiosError": true, "status": 500, "statusText": "InternalServerError"});
      })
      // try {
      //   await promise;
      // } catch (error) {
      //
      //   expect(error).toEqual({"config": {}, "data": {}, "headers": {}, "isAxiosError": true, "status": 500, "statusText": "InternalServerError"});
      // }
    });
  })

  describe('getUsersByID', () => {
    test('should return result', async () => {
      const id = BaseGenerators.getNumber();
      const promise = getUsersByID(id);
      const dataObject = BaseGenerators.getDataObject();

      expect(mockAxios.get).toHaveBeenCalledWith(
        expect.stringMatching("http://localhost:4000/users/" + id),
        expect.objectContaining(
          {
            "validateStatus": expect.anything()
          }
        ));

      mockAxios.mockResponse(dataObject);

      expect(await promise).toEqual(dataObject.data);
    });

    test('should handle 404  response', async () => {
      const id = BaseGenerators.getNumber();
      const promise = getUsersByID(id);

      expect(mockAxios.get).toHaveBeenCalledWith(
        expect.stringMatching("http://localhost:4000/users/" + id),
        expect.objectContaining(
          {
            "validateStatus": expect.anything()
          }
        ));

      mockAxios.mockResponse(AxiosGenerator.get404());

      expect(await promise).toEqual([]);
    });

    test('should handle 500 response', async () => {
      const id = BaseGenerators.getNumber();
      const promise = getUsersByID(id);
      mockAxios.mockError(AxiosGenerator.getError());

      try {
        await promise;
      } catch (error) {
        expect(error).toEqual({"config": {}, "data": {}, "headers": {}, "isAxiosError": true, "status": 500, "statusText": "InternalServerError"});
      }
    });
  });
});
