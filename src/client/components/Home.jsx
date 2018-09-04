import React from 'react';
import { Input, Button, Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import NewPostingModalContainer from 'client/containers/NewPostingModalContainer';
import BookList from 'client/components/BookList/BookList';

class Home extends React.Component {
  static propTypes = {
    createBook: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div>
        <Input onChange={e => this.setState({ isbn: e.target.value })} />
        <Button onClick={() => this.props.createBook(this.state.isbn)}>Submit</Button>
        <Paper className="book-list-paper">
          <BookList />
        </Paper>
      </div>
    );
  }
}

export default NewPostingModalContainer(Home);
