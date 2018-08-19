import React from 'react';
import { AppBar } from '@material-ui/core';
import './TopBar.scss';

export default class TopBar extends React.Component {
  render() {
    return (
      <AppBar className="top-bar-root">
        <div>
          Hi
        </div>
      </AppBar>
    );
  }
}
