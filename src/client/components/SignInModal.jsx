import React, { Component } from 'react';
import {
  Dialog, FormControl, InputLabel, Input, Typography, InputAdornment, IconButton,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import PropTypes from 'prop-types';
import SignInModalContainer from 'client/containers/SignInModalContainer';
import { SignInModalMode } from 'common/constants';
import './SignInModal.scss';

class SignInModal extends Component {
  static propTypes = {
    isSignInModalVisible: PropTypes.bool.isRequired,
    hideSignInModal: PropTypes.func.isRequired,
    signInModalMode: PropTypes.string.isRequired,
    changeSignInMode: PropTypes.func.isRequired,
    onClose: PropTypes.func,
  }

  static defaultProps = {
    onClose: () => {},
  }

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      showPassword: false,
    };
  }

  handleOnClose = () => {
    const { onClose, hideSignInModal } = this.props;
    onClose();
    hideSignInModal();
  }

  handleFieldChange = (e, field) => {
    const { value } = e.target;
    const newState = {};
    newState[field] = value;
    this.setState(newState);
  }

  handleModeChange = () => {
    const { signInModalMode, changeSignInMode } = this.props;
    if (signInModalMode === SignInModalMode.SignIn) {
      changeSignInMode(SignInModalMode.SignUp);
    } else {
      changeSignInMode(SignInModalMode.SignIn);
    }
  }

  render() {
    const { isSignInModalVisible, signInModalMode } = this.props;
    const {
      firstName, lastName, email, password, showPassword,
    } = this.state;
    const isSignUp = signInModalMode === SignInModalMode.SignUp;
    return (
      <Dialog
        open={isSignInModalVisible}
        onClose={this.handleOnClose}
      >
        <div className="sign-in-modal-root">
          {
            isSignUp
            && (
            <div className="form-item name-input">
              <FormControl className="first-name-input">
                <InputLabel htmlFor="first-name" required>
                  First Name
                </InputLabel>
                <Input
                  id="first-name"
                  value={firstName}
                  onChange={e => this.handleFieldChange(e, 'firstName')}
                />
              </FormControl>
              <FormControl className="last-name-input">
                <InputLabel htmlFor="last-name" required>
                  Last Name
                </InputLabel>
                <Input
                  id="last-name"
                  value={lastName}
                  onChange={e => this.handleFieldChange(e, 'lastName')}
                />
              </FormControl>
            </div>
            )
          }
          <FormControl className="form-item">
            <InputLabel htmlFor="email" required>
              Email
            </InputLabel>
            <Input
              id="email"
              value={email}
              onChange={e => this.handleFieldChange(e, 'email')}
            />
          </FormControl>
          <FormControl className="form-item">
            <InputLabel htmlFor="password" required>
              Password
            </InputLabel>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => this.handleFieldChange(e, 'password')}
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={() => this.setState({ showPassword: !showPassword })}
                    onMouseDown={e => e.preventDefault()}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )}
            />
          </FormControl>
          <Typography className="form-item change-mode-container">
            {`${isSignUp ? 'Already have an account' : 'Don\'t have an account yet'}`}? Click
            <span onClick={this.handleModeChange} className="change-mode-text">here</span>
            to {`${isSignUp ? 'login' : 'register'}`}!
          </Typography>
        </div>
      </Dialog>
    );
  }
}

export default SignInModalContainer(SignInModal);