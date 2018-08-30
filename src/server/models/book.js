const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema({
  isbn10: {
    type: String,
    unique: true,
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
  },
  publishers: Array,
  title: {
    type: String,
    required: true,
  },
  authors: Array,
  publish_date: String,
  imageSmall: String,
  imageMedium: String,
  imageLarge: String,
  numberPages: Number,
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
