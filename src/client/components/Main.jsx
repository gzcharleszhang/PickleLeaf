import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Register from './Register';

export default class Main extends React.Component {
  render() {
    return (
      <div className="main-root">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    );
  }
}
