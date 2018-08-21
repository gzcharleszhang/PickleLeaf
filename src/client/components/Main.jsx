import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignInModal from 'client/components/SignInModal/SignInModal';
import Message from 'client/components/Message/Message';
import Home from './Home';

export default class Main extends React.Component {
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
