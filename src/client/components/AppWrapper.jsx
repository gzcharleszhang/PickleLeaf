import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppContainer from 'client/containers/AppContainer';
import TopBar from 'client/components/TopBar/TopBar';
import Main from './Main';

class AppWrapper extends Component {
  static propTypes = {
    fetchBooks: PropTypes.func.isRequired,
    fetchUsers: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchBooks();
    this.props.fetchUsers();
  }

  render() {
    return (
      <div className="App">
        <TopBar {...this.props} />
        <Main {...this.props} />
      </div>
    );
  }
}

export default AppContainer(AppWrapper);
