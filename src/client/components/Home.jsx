import React from 'react';
import { Input, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import NewPostingModalContainer from 'client/containers/NewPostingModalContainer';

class Home extends React.Component {
  static propTypes = {
    createBook: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div>
        <Input onChange={e => this.setState({ isbn: e.target.value })} />
        <Button onClick={() => this.props.createBook(this.state.isbn)}>Submit</Button>
      </div>
    );
  }
}

export default NewPostingModalContainer(Home);
