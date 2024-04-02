import sinon from 'sinon';
import * as userService  from '../../src/services/user-service-typescript';
import {afterEach} from "mocha";
import User from "../../src/models/User";
import app from "../../app";
import {expect} from "chai";
import {AxiosError} from "axios";

const request = require('supertest');

describe('users-typescript', () => {

  let getUsersStub: any;
  let getUsersByIDStub: any;

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
  const axiosError: AxiosError = new AxiosError("ECONNREFUSED","500",{},{},
    {
      data: { errors: [] },
      status:500,
      statusText:'ECONNREFUSED',
      headers:{},
      config:{}
    });

  beforeEach(() => {
    getUsersStub = sinon.stub(userService, 'getUsers').resolves(users);
    getUsersByIDStub = sinon.stub(userService, 'getUsersByID').resolves(users[0]);
  });
  afterEach(() => {
    getUsersStub.restore();
    getUsersByIDStub.restore();
  });


  context('/users-typescript route should', () => {

    it('should handle single record', (done) => {
      getUsersStub.restore();
      getUsersStub = sinon.stub(userService, 'getUsers').resolves(users);
      request(app)
        .get('/users-typescript/')
        .expect(200)
        .end((err:any, res: any) => {
          expect(res.text).to.include('The Sopranos')
          done();
        });
    });

    it('should handle no records', (done) => {
      getUsersStub.restore();
      getUsersStub = sinon.stub(userService, 'getUsers').resolves([]);
      request(app)
        .get('/users-typescript/')
        .expect(200)
        .end((err:any, res: any) => {
          expect(res.text).to.include('The Sopranos')
          done();
        })
    });

    it('should handle connector throwing an error', (done) => {
      getUsersStub.restore();
      getUsersStub = sinon.stub(userService, 'getUsers').rejects(axiosError);
      request(app)
        .get('/users-typescript/')
        .expect(404)
        .end(() => {
          done();
        });
    });
  });

  context('/users-typescript/1 route should', () => {

    it('should handle single record', (done) => {
      getUsersByIDStub.restore();
      getUsersByIDStub = sinon.stub(userService, 'getUsersByID').resolves(users[0]);
      request(app)
        .get('/users-typescript/1')
        .expect(200)
        .end((err:any, res: any) => {
          expect(res.text).to.include('Firstname: ')
          done();
        })
    });

    it('should handle no records', (done) => {
      getUsersByIDStub.restore();
      getUsersByIDStub = sinon.stub(userService, 'getUsersByID').resolves(undefined);
      request(app)
        .get('/users-typescript/1')
        .expect(200)
        .end((err:any, res: any) => {
          expect(res.text).to.include('Could not find user.')
          done();
        });
    });

    it('should handle connector throwing an error', (done) => {
      getUsersByIDStub.restore();
      getUsersByIDStub = sinon.stub(userService, 'getUsersByID').rejects(axiosError);
      request(app)
        .get('/users-typescript/1')
        .expect(404)
        .end(() => {
          done();
        });
    });
  });
});


