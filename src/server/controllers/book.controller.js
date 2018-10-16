const axios = require('axios');
const { BookModel } = require('../models/book');
const { ServerError } = require('../error');
const { isIsbn10, convertToIsbn13 } = require('../../common/isbnUtil');

module.exports = {
  fetch: (req, res, next) => {
    BookModel.find({})
      .then((books) => {
        res.json(books);
      })
      .catch(() => {
        next(new ServerError('Cannot find books'));
      });
  },

  create: (req, res, next) => {
    const { isbn } = req.params;
    if (!isbn) {
      next(new ServerError('Missing isbn'));
    }
    const BOOK_API_URL = 'https://www.googleapis.com/books/v1/volumes?q=';
    // find book by isbn
    axios.get(`${BOOK_API_URL}isbn:${isbn}`)
      .then((response) => {
        if (!response.data || response.data.totalItems < 1) {
          next(new ServerError('Cannot find book'));
        }
        const bookData = response.data.items[0].volumeInfo;
        const {
          // eslint-disable-next-line camelcase
          publisher, publishedDate, pageCount,
          title, authors, imageLinks,
        } = bookData;
        const { userId: _addedBy } = req.headers;
        // check if the isbn number is isbn10
        const hasIsbn10 = isIsbn10(isbn);
        // create and save book
        const book = new BookModel({
          isbn10: hasIsbn10 ? isbn : null,
          isbn: hasIsbn10 ? convertToIsbn13(isbn) : isbn,
          publisher,
          title,
          authors,
          publishedDate,
          image: imageLinks ? imageLinks.thumbnail : null,
          imageSmall: imageLinks ? imageLinks.smallThumbnail : null,
          pageCount,
          _addedBy,
        });
        book.save()
          .then((newBook) => {
            res.json(newBook);
          })
          .catch((err) => {
            console.log(err);
            next(new ServerError('Book already exists'));
          });
      })
      .catch((err) => {
        next(new ServerError(err.toString()));
      });
  },
};