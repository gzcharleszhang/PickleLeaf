const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema({
  isbn10: String,
  isbn: {
    type: String,
    required: true,
    unique: true,
  },
  publisher: String,
  title: {
    type: String,
    required: true,
  },
  authors: Array,
  publishedDate: String,
  image: String,
  imageSmall: String,
  pageCount: Number,
  _createdOn: {
    type: Date,
    default: Date.now(),
  },
  _addedBy: String,
  _type: {
    type: String,
    default: 'Book',
  },
});

const BookModel = mongoose.model('Book', bookSchema);

module.exports = {
  BookModel,
};
