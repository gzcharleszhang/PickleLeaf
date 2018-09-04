import React from 'react';
import PropTypes from 'prop-types';
import {
  List, ListItem, Typography,
} from '@material-ui/core';
import BookListContainer from 'client/containers/BookListContainer';
import defaultBookImage from 'client/icon-book.jpg';
import './BookList.scss';

class BookList extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
  }

  renderArray = (arr) => {
    if (!arr || arr.length === 0) {
      return '';
    }
    let str = arr[0];
    for (let i = 1; i < arr.length; i += 1) {
      str += `, ${arr[i]}`;
    }
    return str;
  }

  // eslint-disable-next-line
  renderBookItem = (book) => {
    return (
      <ListItem id={book._id} className="book-list-item">
        {/* eslint-disable-next-line */}
        <img
          className="book-image"
          width="60"
          height="90"
          src={book.imageSmall || book.image || defaultBookImage}
        />
        <div className="book-item-details">
          <Typography
            className="book-title"
            variant="title"
          >
            Title: {book.title}
          </Typography>
          <Typography
            className="book-details-item"
            variant="body1"
          >
            Authors: {this.renderArray(book.author) || 'N/A'}
          </Typography>
          <Typography
            className="book-details-item"
            variant="body1"
          >
            Page Count: {book.pageCount || 'N/A'}
          </Typography>
          <Typography
            className="book-details-item"
            variant="body1"
          >
            Published By: {book.publisher || 'N/A'}
          </Typography>
          <Typography
            className="book-details-item"
            variant="body1"
          >
            Published Date: {book.publishedDate || 'N/A'}
          </Typography>
        </div>
      </ListItem>
    );
  }

  render() {
    const { books } = this.props;
    return (
      <div className="book-list-root">
        <List className="book-list">
          {
            books.map(book => this.renderBookItem(book))
          }
        </List>
      </div>
    );
  }
}

export default BookListContainer(BookList);