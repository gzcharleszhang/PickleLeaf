import React from 'react';
import { AppBar } from '@material-ui/core';
import PropTypes from 'prop-types';
import SignInModalContainer from 'client/containers/SignInModalContainer';
import './TopBar.scss';

class TopBar extends React.Component {
  static propTypes = {
    showSignInModal: PropTypes.func.isRequired,
  }

  render() {
    const { showSignInModal } = this.props;
    return (
      <AppBar className="top-bar-root">
        <div onClick={() => showSignInModal()}>
          Hi
        </div>
      </AppBar>
    );
  }
}

export default SignInModalContainer(TopBar);
