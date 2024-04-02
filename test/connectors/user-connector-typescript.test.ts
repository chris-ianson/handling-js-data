import mockAxios from 'jest-mock-axios';
import Connector from "../../src/connectors/user-connector-typescript";
import AxiosGenerator from "../generators/AxiosGenerator";
import BaseGenerators from "../generators/BaseGenerators";
import fastCheck from "fast-check";

describe('user-connector-typescript', function () {

  let connectorInstance: any;

  beforeEach(() => {
    connectorInstance = new Connector()
  })
  afterEach(() => {
    mockAxios.reset();
  });

  describe('validateStatus', () => {
    test('should handle (>=200 && < 300)', () => {
      fastCheck.assert(
        fastCheck.property(fastCheck.integer({max: 299, min: 200}), (x: number)  => {
          expect(Connector.validateStatus.validateStatus(x)).toEqual(true)
        })
      )
    });
    test('should handle 404', () => {
        expect(Connector.validateStatus.validateStatus(404)).toEqual(true);
    });
  });

  describe('connectorInstance.getUsers', () => {
    test('should handle 200 response', async () => {
      const promise = connectorInstance.getUsers();
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
      const promise = connectorInstance.getUsers();

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
      const promise = connectorInstance.getUsers();
      mockAxios.mockError(AxiosGenerator.getError());

      promise.catch((e: any) => {
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

  describe('connectorInstance.getUsersByID', () => {
    test('should return result', async () => {
      const id = BaseGenerators.getNumber();
      const promise = connectorInstance.getUsersByID(id);
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
      const promise = connectorInstance.getUsersByID(id);

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
      const promise = connectorInstance.getUsersByID(id);
      mockAxios.mockError(AxiosGenerator.getError());

      try {
        await promise;
      } catch (error) {
        expect(error).toEqual({"config": {}, "data": {}, "headers": {}, "isAxiosError": true, "status": 500, "statusText": "InternalServerError"});
      }
    });
  });
});
