import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import SignInModal from 'client/components/SignInModal/SignInModal';
import PostingModal from 'client/components/PostingModal/PostingModal';
import Message from 'client/components/Message/Message';
import AppContainer from 'client/containers/AppContainer';
import Home from 'client/components/Home';

class Main extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
  }

  render() {
    if (this.props.isLoading) {
      return (
        <CircularProgress className="app-spinner" size={30} />
      );
    }

    return (
      <div className="main-root">
        <Message />
        <SignInModal />
        <PostingModal />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default AppContainer(Main);
