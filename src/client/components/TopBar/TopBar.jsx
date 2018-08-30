import React from 'react';
import { AppBar, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import SignInModalContainer from 'client/containers/SignInModalContainer';
import { isAuthenticated, logout } from 'client/util/Auth';
import './TopBar.scss';

class TopBar extends React.Component {
  static propTypes = {
    showSignInModal: PropTypes.func.isRequired,
  }

  render() {
    const { showSignInModal } = this.props;
    const loggedIn = isAuthenticated();
    return (
      <AppBar className="top-bar-root">
        {
          loggedIn
            ? (
              <Typography
                className="login-button"
                variant="button"
                onClick={logout}
              >
                Sign Out
              </Typography>
            )
            : (
              <Typography
                className="login-button"
                variant="button"
                onClick={() => showSignInModal()}
              >
                Sign In
              </Typography>
            )
        }
      </AppBar>
    );
  }
}

export default SignInModalContainer(TopBar);
