import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import SignInModal from 'client/components/SignInModal/SignInModal';
import Message from 'client/components/Message/Message';
import AppContainer from 'client/containers/AppContainer';
import Home from './Home';

class Main extends React.Component {
  static propTypes = {
    fetchBooks: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {
    return (
      <div className="main-root">
        <Message />
        <SignInModal />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default AppContainer(Main);
