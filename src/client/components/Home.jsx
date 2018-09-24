import React from 'react';
import { Input, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import NewPostingModalContainer from 'client/containers/PostingModalContainer';
import BookList from 'client/components/BookList/BookList';

class Home extends React.Component {
  static propTypes = {
    createBook: PropTypes.func,
  }

  static defaultProps = {
    createBook: () => {},
  }

  render() {
    return (
      <div>
        <Input onChange={e => this.setState({ isbn: e.target.value })} />
        <Button onClick={() => this.props.createBook(this.state.isbn)}>Submit</Button>
        <BookList />
      </div>
    );
  }
}

export default NewPostingModalContainer(Home);
