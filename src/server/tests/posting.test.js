/* eslint-disable no-unused-expressions */
const chai = require('chai');
const chaiHttp = require('chai-http');


const server = require('../server.js');
require('dotenv').config();

const { expect } = chai;
chai.use(chaiHttp);

const { FAKE_TOKEN, FAKE_ID } = require('../util');

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

    it('should fail with invalid jwt token', (done) => {
      chai.request(server)
        .post('/api/postings')
        .set('jwt', FAKE_TOKEN)
        .send({ userId: 'abc', bookId: 'asdf', price: 10 })
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
  });
};

const updatePosting = (context) => {
  describe('Update posting on /postings PUT', () => {
    it('should update posting price', (done) => {
      chai.request(server)
        .put(`/api/postings/${context.testPosting._id}`)
        .set('jwt', context.testToken)
        .send({ price: '100' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.have.property('posting');
          expect(res.body.posting).to.be.an('object');
          expect(res.body.posting).to.have.property('price', 100);
          expect(res.body.posting).to.have.property('userId', context.testPosting.userId);
          expect(res.body.posting).to.have.property('bookId', context.testPosting.bookId);
          expect(res.body.posting).to.have.any.keys('_id');
          done();
        });
    });

    it('should update posting description', (done) => {
      chai.request(server)
        .put(`/api/postings/${context.testPosting._id}`)
        .set('jwt', context.testToken)
        .send({ description: 'test description' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.have.property('posting');
          expect(res.body.posting).to.be.an('object');
          expect(res.body.posting).to.have.property('price', 100);
          expect(res.body.posting).to.have.property('userId', context.testPosting.userId);
          expect(res.body.posting).to.have.property('bookId', context.testPosting.bookId);
          expect(res.body.posting).to.have.property('description', 'test description');
          expect(res.body.posting).to.have.any.keys('_id');
          done();
        });
    });

    it('should fail with invalid jwt token', (done) => {
      chai.request(server)
        .put(`/api/postings/${context.testPosting._id}`)
        .set('jwt', FAKE_TOKEN)
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('should fail with invalid price', (done) => {
      chai.request(server)
        .put(`/api/postings/${context.testPosting._id}`)
        .set('jwt', context.testToken)
        .send({ price: 'd12' })
        .end((err, res) => {
          expect(res).to.have.status(500);
          done();
        });
    });

    it('should fail with invalid posting id', (done) => {
      chai.request(server)
        .put(`/api/postings/${FAKE_ID}`)
        .set('jwt', context.testToken)
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(500);
          done();
        });
    });
  });
};

const deletePosting = (context) => {
  describe('Delete posting on /postings DELETE', () => {
    it('should delete posting given Id', (done) => {
      chai.request(server)
        .delete(`/api/postings/${context.testPosting._id}`)
        .set('jwt', context.testToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.have.property('posting');
          expect(res.body.posting).to.be.an('object');
          expect(res.body.posting).to.have.property('price', 100);
          expect(res.body.posting).to.have.property('userId', context.testPosting.userId);
          expect(res.body.posting).to.have.property('bookId', context.testPosting.bookId);
          expect(res.body.posting).to.have.any.keys('_id');
          done();
        });
    });

    it('should fail with invalid jwt token', (done) => {
      chai.request(server)
        .delete(`/api/postings/${context.testPosting._id}`)
        .set('jwt', FAKE_TOKEN)
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
  });
};

module.exports = {
  getPostings,
  addPosting,
  updatePosting,
  deletePosting,
};
