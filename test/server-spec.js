import { expect } from 'chai';
import chai from 'chai';
import server from '../server';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

describe('Getting homepage', () => {
  it('respond to root page', (done) => {
    chai.request(server)
    .get('/')
    .end((err, res) =>{
      expect(res).to.have.status(200);
      expect(res.text).to.equal('Welcome to janfar application.');
      done();
    })
  });
});