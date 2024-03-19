import {getUsers, getUsersByID} from '../../services/user-service-typescript';
import User from "../../models/User";
import app from "../../app";
import {AxiosError} from "axios";

const request = require('supertest');

jest.mock('../../services/user-service-typescript');

const mockGetUsers = getUsers as jest.MockedFunction<typeof getUsers>
const mockGetUsersByID = getUsersByID as jest.MockedFunction<typeof getUsersByID>

describe('users-typescript', () => {

  const users: User[] = User.deserialize(
    [{
      firstName: "Jackie",
      isDead: true,
      hits: 20,
      lastName: "Aprile",
      location: 'New Jersey',
      dateOfBirth: '07/05/1954',
      family: "DiMeo",
    }]);

  // @ts-ignore
  const axiosError: AxiosError = new AxiosError("ECONNREFUSED", "500", {}, {},
    {
      data: {errors: []},
      status: 500,
      statusText: 'ECONNREFUSED',
      headers: {},
      config: {}
    });

  describe('/users-typescript route should', () => {

    test('should handle single record', (done) => {
      mockGetUsers.mockResolvedValue(users);

      request(app)
        .get('/users-typescript/')
        .expect(200)
        .then((body: any) => {
          expect(body.text).toContain('The Sopranos');
          done();
        });

    });

    test('should handle no records', (done) => {
      mockGetUsers.mockResolvedValue([]);

      request(app)
        .get('/users-typescript/')
        .expect(200)
        .then((body: any) => {
          expect(body.text).toContain('The Sopranos')
          done();
        })
    });

    test('should handle connector throwing an error', async () => {
      mockGetUsers.mockRejectedValue(axiosError);

      return request(app)
        .get('/users-typescript/')
        .expect(404);
    });
  });

  describe('/users-typescript/1 route should', () => {

    test('should handle single record', (done) => {
      mockGetUsersByID.mockResolvedValue(users[0]);

      request(app)
        .get('/users-typescript/1')
        .expect(200)
        .then((body: any) => {
          expect(body.text).toContain('Firstname: ');
          done();
        });

    });

    test('should handle no records', (done) => {
      mockGetUsersByID.mockResolvedValue(undefined);

      request(app)
        .get('/users-typescript/1')
        .expect(200)
        .then((body: any) => {
          expect(body.text).toContain('Could not find user.')
          done();
        })
    });

    test('should handle connector throwing an error', async () => {
      mockGetUsersByID.mockRejectedValue(axiosError);

      return request(app)
        .get('/users-typescript/1')
        .expect(404);
    });
  });
});
