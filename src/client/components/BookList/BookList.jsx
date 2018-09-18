import React from 'react';
import PropTypes from 'prop-types';
import {
  List, ListItem, Typography, Paper,
} from '@material-ui/core';
import BookListContainer from 'client/containers/BookListContainer';
import defaultBookImage from 'client/icon-book.jpg';
import './BookList.scss';

class BookList extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    showPostingModal: PropTypes.func.isRequired,
  }

  renderAuthors = (authors) => {
    if (!authors || authors.length === 0) {
      return 'N/A';
    }
    return `${authors[0]}${authors.length > 1 ? 'et al.' : ''}`;
  }

  // eslint-disable-next-line
  renderBookItem = (book) => {
    return (
      <Paper
        key={book._id}
        className="book-list-paper"
        onClick={() => this.props.showPostingModal(book._id)}
      >
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
              {book.title}
            </Typography>
            <Typography
              className="book-details-item"
              variant="body1"
            >
              Authors: {this.renderAuthors(book.authors)}
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
      </Paper>
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