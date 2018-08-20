import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import SignInModal from './SignInModal';

export default class Main extends React.Component {
  render() {
    return (
      <div className="main-root">
        <SignInModal />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}
