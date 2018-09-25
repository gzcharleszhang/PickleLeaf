import React from 'react';
import PropTypes from 'prop-types';
import {
  List, ListItem, Typography, Paper, Divider,
} from '@material-ui/core';
import BookListContainer from 'client/containers/BookListContainer';
import defaultBookImage from 'client/icon-book.jpg';
import './BookList.scss';

class BookList extends React.Component {
  static propTypes = {
    // eslint-disable-next-line
    books: PropTypes.array.isRequired,
    showPostingModal: PropTypes.func.isRequired,
    // eslint-disable-next-line
    booksPerPage: PropTypes.number,
  }

  static defaultProps = {
    booksPerPage: 10,
  }

  constructor(props) {
    super(props);

    this.state = {
      page: 0,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { page } = state;
    const { booksPerPage, books, searchString } = props;
    let numBooks = (page + 1) * booksPerPage;
    let canLoadMore = true;
    if (numBooks >= books.length) {
      numBooks = books.length;
      canLoadMore = false;
    }
    const booksToRender = books.slice(0, numBooks)
      .filter(b => b.title.toLowerCase().indexOf(searchString) >= 0);
    return {
      ...state,
      booksToRender,
      canLoadMore,
    };
  }

  handleLoadMore = () => {
    const { page } = this.state;
    this.setState({ page: page + 1 });
  }

  renderAuthors = (authors) => {
    if (!authors || authors.length === 0) {
      return 'N/A';
    }
    return `${authors[0]}${authors.length > 1 ? ' et al.' : ''}`;
  }

  // eslint-disable-next-line
  renderBookItem = (book) => {
    return (
      <div
        id={book._id}
      >
        <ListItem
          key={book._id}
          onClick={() => this.props.showPostingModal(book._id)}
          className="book-list-item"
        >
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
        <Divider className="divider" />
      </div>
    );
  }

  render() {
    const { booksToRender, canLoadMore } = this.state;
    if (booksToRender.length === 0) {
      return (
        <Paper className="book-list-paper">
          <Typography
            className="empty-text"
            variant="subheading"
          >
            Cannot find this book in the database :(
          </Typography>
        </Paper>
      );
    }
    return (
      <Paper className="book-list-paper">
        <List className="book-list">
          {
            booksToRender.map(book => this.renderBookItem(book))
          }
        </List>
        {
          canLoadMore
          && (
          <Typography
            onClick={this.handleLoadMore}
          >
            Load More
          </Typography>
          )
        }
      </Paper>
    );
  }
}

export default BookListContainer(BookList);