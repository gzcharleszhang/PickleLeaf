import React from 'react';
import {
  Typography, Input, InputAdornment, Icon,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import SignInModalContainer from 'client/containers/SignInModalContainer';
import { isAuthenticated, logout } from 'client/util/Auth';
import './TopBar.scss';

class TopBar extends React.Component {
  static propTypes = {
    showSignInModal: PropTypes.func.isRequired,
    handleSearchChange: PropTypes.func.isRequired,
  }

  render() {
    const { showSignInModal } = this.props;
    const loggedIn = isAuthenticated();
    return (
      <div className="top-bar-root">
        <h1 className="logo">
          PickleLeaf
        </h1>
        <Input
          color="secondary"
          className="search-bar"
          placeholder="Enter book title..."
          onChange={this.props.handleSearchChange}
          startAdornment={(
            <InputAdornment>
              <Icon color="secondary">search</Icon>
            </InputAdornment>
          )}
        />
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
      </div>
    );
  }
}

export default SignInModalContainer(TopBar);
