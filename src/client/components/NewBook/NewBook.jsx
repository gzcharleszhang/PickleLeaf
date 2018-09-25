import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Input, Button, Typography,
} from '@material-ui/core';
import BookListContainer from 'client/containers/BookListContainer';
import { showMessage } from 'client/components/Message/Message';
import { isIsbn10, isIsbn13 } from 'common/isbnUtil';

import './NewBook.scss';

class NewBook extends React.Component {
  static propTypes = {
    createBook: PropTypes.func,
  }

  static defaultProps = {
    createBook: () => {},
  }

  constructor(props) {
    super(props);

    this.state = {
      isbn: '',
    };
  }

  handleCreateBook = () => {
    const { isbn } = this.state;
    const { createBook } = this.props;
    const parsed = Number.parseInt(isbn, 10);
    if (Number.isNaN(parsed) || !(isIsbn10(isbn) || isIsbn13(isbn))) {
      showMessage('Error', 'Not valid ISBN number');
    } else {
      createBook(isbn)
        .then(() => {
          showMessage('Success', 'Added book to database!');
          this.setState({ isbn: '' });
        });
    }
  }

  render() {
    return (
      <Paper className="add-book-paper">
        <Typography variant="body2">
          Can&#39;t find the book you want?<br />Enter the ISBN number here to add to our database!
        </Typography>
        <div className="add-book-container">
          <Input
            onChange={e => this.setState({ isbn: e.target.value })}
            placeholder="ISBN here..."
          />
          <Button onClick={this.handleCreateBook}>Add</Button>
        </div>
      </Paper>
    );
  }
}

export default BookListContainer(NewBook);