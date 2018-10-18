/* eslint-disable no-unused-expressions */
const chai = require('chai');
const chaiHttp = require('chai-http');


const server = require('../server.js');
require('dotenv').config();

const { expect } = chai;
chai.use(chaiHttp);

const getPostings = () => {
  // testing for postings fetch operation
  describe('Get all postings on /postings GET', () => {
    // passes if we get all postings
    it('should get all postings', (done) => {
      chai.request(server)
        .get('/api/postings')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.include({ success: true });
          expect(res.body).to.include.keys('postings');
          expect(res.body.postings).to.be.an('array');
          done();
        });
    });
  });
};

const addPosting = (context) => {
  // testing for adding new posting
  describe('Adding new posting on /postings POST', () => {
    it('should add new posting', (done) => {
      chai.request(server)
        .post('/api/postings')
        .set('jwt', context.testToken)
        .send({ userId: 'abc', bookId: 'cba', price: 12 })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.include({ success: true });
          expect(res.body).to.have.property('posting');
          expect(res.body.posting).to.be.an('object');
          expect(res.body.posting).to.have.property('price', 12);
          expect(res.body.posting).to.have.property('userId', 'abc');
          expect(res.body.posting).to.have.property('bookId', 'cba');
          expect(res.body.posting).to.have.any.keys('_id');
          done();
        });
    });

    it('should fail with invalid number', (done) => {
      chai.request(server)
        .post('/api/postings')
        .set('jwt', context.testToken)
        .send({ userId: 'abc', bookId: 'abc', price: 'a12' })
        .end((err, res) => {
          expect(res).to.have.status(500);
          done();
        });
    });

    it('should fail without userId', (done) => {
      chai.request(server)
        .post('/api/postings')
        .set('jwt', context.testToken)
        .send({ bookId: 'abc', price: 'a12' })
        .end((err, res) => {
          expect(res).to.have.status(500);
          done();
        });
    });

    it('should fail without bookId', (done) => {
      chai.request(server)
        .post('/api/postings')
        .set('jwt', context.testToken)
        .send({ userId: 'abc', price: 'a12' })
        .end((err, res) => {
          expect(res).to.have.status(500);
          done();
        });
    });

    it('should fail without price', (done) => {
      chai.request(server)
        .post('/api/postings')
        .set('jwt', context.testToken)
        .send({ userId: 'abc', bookId: 'asdf' })
        .end((err, res) => {
          expect(res).to.have.status(500);
          done();
        });
    });
  });
};

module.exports = {
  getPostings,
  addPosting,
};
