/* eslint-disable no-unused-expressions */
const mongoose = require('mongoose');
const passport = require('passport');

const { getBooks, addBook } = require('./tests/book.test');
const { getPostings, addPosting } = require('./tests/book.test');
require('./passport')(passport);
// set the environment to test
process.env.NODE_ENV = 'test';

describe('API tests', () => {
  // connect to test database
  before((done) => {
    mongoose.connect('mongodb://localhost:27017/testDatabase', {
      promiseLibrary: require('bluebird'),
      useNewUrlParser: true,
    }).then(() => {
      console.log('successfully conneted to test database');
      done();
    })
      .catch(err => console.log(err));
  });

  getBooks();
  addBook();
  getPostings();
  addPosting();

  // close database connection after tests are done
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });
});
