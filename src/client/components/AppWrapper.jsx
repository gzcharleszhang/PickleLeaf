import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppContainer from 'client/containers/AppContainer';
import Main from './Main';

class AppWrapper extends Component {
  static propTypes = {
    fetchBooks: PropTypes.func.isRequired,
    fetchUsers: PropTypes.func.isRequired,
    fetchPostings: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchBooks();
    this.props.fetchUsers();
    this.props.fetchPostings();
  }

  render() {
    return (
      <div className="App">
        <Main {...this.props} />
      </div>
    );
  }
}

export default AppContainer(AppWrapper);
