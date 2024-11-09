import {getUsers, getUsersByID} from '../../src/services/user-service-typescript';
import User from "../../src/models/User";
import app from "../../app";
import UserGenerator from "../generators/UserGenerator";

const request = require('supertest');

jest.mock('../../src/services/user-service-typescript');

const mockGetUsers = getUsers as jest.MockedFunction<typeof getUsers>
const mockGetUsersByID = getUsersByID as jest.MockedFunction<typeof getUsersByID>

describe('users-typescript', () => {
  const users: User[] = User.deserialize(UserGenerator.getMultipleUsers(1));

  const axiosError  = new Error("ECONNREFUSED");

  describe('/users-typescript route should', () => {

    test('should handle single record', (done) => {
      mockGetUsers.mockResolvedValue(users);

      request(app)
        .get('/users-typescript/')
        .expect(200)
        .then((body: {[key: string]: string}) => {
          expect(body.text).toContain('The Sopranos');
          done();
        });

    });

    test('should handle no records', (done) => {
      mockGetUsers.mockResolvedValue([]);

      request(app)
        .get('/users-typescript/')
        .expect(200)
        .then((body: {[key: string]: string}) => {
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
        .then((body: {[key: string]: string}) => {
          expect(body.text).toContain('Firstname: ');
          done();
        });

    });

    //TODO: Fix this test
    test.skip('should handle no records', (done) => {
      mockGetUsersByID.mockResolvedValue(undefined);

      request(app)
        .get('/users-typescript/1')
        .expect(200)
        .then((body: {[key: string]: string} ) => {
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
