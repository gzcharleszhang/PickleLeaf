/* eslint-disable no-unused-expressions */
const chai = require('chai');
const chaiHttp = require('chai-http');


const server = require('../server.js');
require('dotenv').config();

const { expect } = chai;
chai.use(chaiHttp);

// testing for book fetch operation
const getBooks = () => {
  describe('Getting books on /books /GET', () => {
    // passes if we get all books
    it('should get all books', (done) => {
      chai.request(server)
        .get('/api/books')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.include.keys('books');
          expect(res.body.books).to.be.an('array');
          done();
        });
    });
  });
};

// testing for adding new book
const addBook = (context) => {
  describe('Adding new book on /books POST', () => {
    it('should add book with isbn 10', (done) => {
      chai.request(server)
        .post('/api/books/2960133552')
        .set('jwt', context.testToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.have.property('book');
          expect(res.body.book).to.be.an('object');
          expect(res.body.book).to.have.property('title', 'Reinventing Organizations');
          expect(res.body.book).to.have.property('isbn', '9782960133554');
          expect(res.body.book).to.have.property('isbn10', '2960133552');
          expect(res.body.book).to.have.any.keys('_id');
          done();
        });
    });

    it('should add book with isbn 13', (done) => {
      chai.request(server)
        .post('/api/books/9780984782857')
        .set('jwt', context.testToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.have.property('book');
          expect(res.body.book).to.be.an('object');
          expect(res.body.book).to.have.property('title', 'Cracking the Coding Interview');
          expect(res.body.book).to.have.property('isbn', '9780984782857');
          expect(res.body.book).to.have.any.keys('_id');
          done();
        });
    });

    it('should fail without jwt', (done) => {
      chai.request(server)
        .post('/api/books/9780984782857')
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('should fail because book already exists', (done) => {
      chai.request(server)
        .post('/api/books/9780984782857')
        .set('jwt', context.testToken)
        .end((err, res) => {
          expect(res).to.have.status(500);
          done();
        });
    });
  });
};

module.exports = {
  getBooks,
  addBook,
};
