const axios = require('axios');
const { BookModel } = require('../models/book');
const { ServerError } = require('../error');
const { isIsbn10, convertToIsbn13 } = require('../../common/isbnUtil');

module.exports = {
  create: (req, res, next) => {
    const { isbn } = req.params;
    if (!isbn) {
      next(new ServerError('Missing isbn'));
    }
    const bookApiURL = 'https://openlibrary.org/api/books?format=json&jscmd=data';
    const isbnKey = `ISBN:${isbn}`;
    axios.get(`${bookApiURL}&bibkeys=${isbnKey}`)
      .then((response) => {
        if (!response || !response.data) {
          next(new ServerError('Cannot find book'));
        }
        const bookData = response.data[isbnKey];
        if (!bookData) {
          next(new ServerError('Cannot find book'));
        }
        const {
          // eslint-disable-next-line camelcase
          publishers, publish_date, number_of_pages,
          title, cover, authors,
        } = bookData;
        const { userId: _addedBy } = req.headers;
        const isbn10 = isIsbn10(isbn);
        const book = new BookModel({
          isbn10: isbn10 ? isbn : null,
          isbn: isbn10 ? convertToIsbn13(isbn) : isbn,
          publishers,
          title,
          authors,
          publish_date,
          imageSmall: cover.small,
          imageMedium: cover.medium,
          imageLarge: cover.large,
          numberPages: number_of_pages,
          _addedBy,
        });
        book.save()
          .then((newBook) => {
            res.json(newBook);
          })
          .catch(() => {
            next(new ServerError('Book already exists'));
          });
      })
      .catch((err) => {
        next(new ServerError(err.toString()));
      });
  },
};