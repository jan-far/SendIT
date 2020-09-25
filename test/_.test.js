import express from 'express';
import cors from 'cors';
import chai, { expect } from 'chai';
import debug from 'debug';
import chaiHttp from 'chai-http';
import { before, describe, it } from 'mocha';
import chalk from 'chalk';
import dotenv from 'dotenv';
import server from '../server';
import { User } from '../usingJSObject/models';
import db from '../usingJSObject/routes';

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const ROOT = '/api/v1/';
let parcelId = '';
const token = {};
let userId = '';

app.use(ROOT, db);

const log = debug('test');
chai.use(chaiHttp);

describe('ALL TEST', () => {
  describe('Getting homepage', () => {
    it('respond to root page', (done) => {
      chai.request(server)
        .get('/test')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.text).to.equal('Welcome to janfar application.');
          done();
        });
    });
  });
  describe('USER TEST', () => {
    before((done) => {
      User.deleteMany({});
      done();
    });
    it('should register new user', (done) => {
      const body = {
        firstname: 'John',
        lastname: 'Doe',
        password: 'thisisjohndoe',
        email: 'john_d@gmail.com',
        phone: '0814444444',
      };

      chai.request(app)
        .post(`${ROOT}auth/signup`)
        .send(body)
        .end((err, res) => {
          log(chalk.bgGray(chalk.blue(JSON.stringify(res.body, null, 2))));
          token.user1 = res.body.token;
          expect(res.status).to.be.equal(200);
          done(err);
        });
    });
    it('should signin user', (done) => {
      const body = {
        email: 'john_d@gmail.com',
        password: 'thisisjohndoe',
      };

      chai.request(app)
        .post(`${ROOT}auth/signin`)
        .send(body)
        .end((err, res) => {
          userId = res.body.id;
          log(chalk.bgWhiteBright(chalk.magentaBright(JSON.stringify(res.body, null, 1))));
          expect(res.status).to.be.equal(200);
          done(err);
        });
    });
    it('Get users', (done) => {
      chai.request(app)
        .get(`${ROOT}users`)
        .set('x-access-token', `${token.user1}`)
        .end((err, res) => {
          log(chalk.yellowBright(JSON.stringify(res.body, null, 1)));
          expect(res.status).to.be.equal(200);
          done(err);
        });
    });
  });
  describe('PARCEL TEST', () => {
    it('Create parcel', (done) => {
      const body = {
        email: 'john_d@gmail.com',
        weight: 43,
        destination: 'jos',
        phone: '0814665656',
      };

      chai.request(app)
        .post(`${ROOT}parcels`)
        .set('x-access-token', `${token.user1}`)
        .send(body)
        .end((err, res) => {
          parcelId = res.body.id;
          log(chalk.yellowBright(JSON.stringify(res.body, null, 1)));
          expect(res.status).to.be.equal(200);
          done(err);
        });
    });
    it('Get all parcels', (done) => {
      chai.request(app)
        .get(`${ROOT}parcels`)
        .set('x-access-token', `${token.user1}`)
        .end((err, res) => {
          log(chalk.yellowBright(JSON.stringify(res.body, null, 1)));
          expect(res.status).to.be.equal(200);
          done(err);
        });
    });
    it('Get a parcel', (done) => {
      chai.request(app)
        .get(`${ROOT}parcels/${parcelId}`)
        .set('x-access-token', `${token.user1}`)
        .end((err, res) => {
          userId = res.body.Owner;
          log(chalk.yellowBright(JSON.stringify(res.body, null, 1)));
          expect(res.status).to.be.equal(200);
          done(err);
        });
    });
    it('Cancel parcel delivery order', (done) => {
      chai.request(app)
        .put(`${ROOT}parcels/${parcelId}/cancel`)
        .set('x-access-token', `${token.user1}`)
        .end((err, res) => {
          log(chalk.yellowBright(JSON.stringify(res.body, null, 1)));
          expect(res.status).to.be.equal(204);
          done(err);
        });
    });
    it('Get parcel for specific user', (done) => {
      chai.request(app)
        .get(`${ROOT}users/${userId}/parcels`)
        .set('x-access-token', `${token.user1}`)
        .end((err, res) => {
          log(chalk.yellowBright(JSON.stringify(res.body, null, 1)));
          console.log(res.body);
          expect(res.status).to.be.equal(200);
          done(err);
        });
    });
  });
});
