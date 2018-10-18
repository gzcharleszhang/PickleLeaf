/* eslint-disable no-unused-expressions */
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const { getBooks, addBook } = require('./tests/book.test');
const { getPostings, addPosting, updatePosting } = require('./tests/posting.test');
const { UserModel } = require('./models/user');
const { PostingModel } = require('./models/posting');
require('./passport')(passport);

describe('API tests', () => {
  const context = {};
  // connect to test database
  before((done) => {
    mongoose.connect('mongodb://localhost:27017/testDatabase', {
      promiseLibrary: require('bluebird'),
      useNewUrlParser: true,
    })
      .then(() => {
        console.log('successfully conneted to test database');
        const user = new UserModel({
          firstName: 'john',
          lastName: 'doe',
          email: 'hi',
          password: 'there',
          name: 'john doe',
        });
        return user.save();
      })
      .then((user) => {
        context.testToken = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
        const posting = new PostingModel({
          userId: user._id,
          bookId: 'testId',
          price: 10,
        });
        return posting.save();
      })
      .then((posting) => {
        context.testPosting = posting;
        done();
      })
      .catch(err => console.log(err));
  });
  getBooks();
  addBook(context);
  getPostings();
  addPosting(context);
  updatePosting(context);

  // close database connection after tests are done
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });
});
