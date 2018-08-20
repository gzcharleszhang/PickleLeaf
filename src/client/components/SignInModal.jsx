import React, { Component } from 'react';
import {
  Dialog, FormControl, InputLabel, Input, Typography,
  InputAdornment, IconButton, Button, CircularProgress,
  FormHelperText,
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
      confirmEmail: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      isLoading: false,
      firstNameErr: '',
      lastNameErr: '',
      emailErr: '',
      confirmEmailErr: '',
      passwordErr: '',
      confirmPasswordErr: '',
    };
  }

  handleButtonClick = () => {
    const { signInModalMode } = this.props;
    const isSignUp = signInModalMode === SignInModalMode.SignUp;
    let fieldsToCheck = ['email', 'password'];
    if (isSignUp) {
      fieldsToCheck = fieldsToCheck.concat(['firstName', 'lastName', 'confirmEmail', 'confirmPassword']);
    }
    const newState = {};
    fieldsToCheck.forEach((key) => {
      // eslint-disable-next-line react/destructuring-assignment
      const field = this.state[key];
      if (!field) {
        const errKey = `${key}Err`;
        newState[errKey] = 'This field is empty';
      }
    });
    this.setState(newState);
  }

  handleOnClose = () => {
    const { onClose, hideSignInModal } = this.props;
    onClose();
    hideSignInModal();
    // reset state
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      isLoading: false,
      firstNameErr: '',
      lastNameErr: '',
      emailErr: '',
      confirmEmailErr: '',
      passwordErr: '',
      confirmPasswordErr: '',
    });
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
      isLoading, firstNameErr, lastNameErr,
      emailErr, confirmEmailErr, confirmPasswordErr,
      confirmEmail, confirmPassword, passwordErr,
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
              <FormControl
                error={!!firstNameErr}
                className="first-name-input"
              >
                <InputLabel htmlFor="first-name" required>
                  First Name
                </InputLabel>
                <Input
                  id="first-name"
                  value={firstName}
                  onChange={e => this.handleFieldChange(e, 'firstName')}
                />
                <FormHelperText>{firstNameErr}</FormHelperText>
              </FormControl>
              <FormControl
                className="last-name-input"
                error={!!lastNameErr}
              >
                <InputLabel htmlFor="last-name" required>
                  Last Name
                </InputLabel>
                <Input
                  id="last-name"
                  value={lastName}
                  onChange={e => this.handleFieldChange(e, 'lastName')}
                />
                <FormHelperText>{lastNameErr}</FormHelperText>
              </FormControl>
            </div>
            )
          }
          <FormControl
            className="form-item"
            error={!!emailErr}
          >
            <InputLabel htmlFor="email" required>
              Email
            </InputLabel>
            <Input
              id="email"
              value={email}
              onChange={e => this.handleFieldChange(e, 'email')}
            />
            <FormHelperText>{emailErr}</FormHelperText>
          </FormControl>
          {
            isSignUp
            && (
              <FormControl
                className="form-item"
                error={!!confirmEmailErr}
              >
                <InputLabel htmlFor="confirmEmail" required>
                    Confirm Email
                </InputLabel>
                <Input
                  id="confirmEmail"
                  value={confirmEmail}
                  onChange={e => this.handleFieldChange(e, 'confirmEmail')}
                />
                <FormHelperText>{confirmEmailErr}</FormHelperText>
              </FormControl>
            )
          }
          <FormControl
            className="form-item"
            error={!!passwordErr}
          >
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
            <FormHelperText>{passwordErr}</FormHelperText>
          </FormControl>
          {
            isSignUp
            && (
              <FormControl
                className="form-item"
                error={!!confirmPasswordErr}
              >
                <InputLabel htmlFor="confirmPassword" required>
                    Confirm Password
                </InputLabel>
                <Input
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={e => this.handleFieldChange(e, 'confirmPassword')}
                />
                <FormHelperText>{confirmPasswordErr}</FormHelperText>
              </FormControl>
            )
          }
          <div className="button-wrapper form-item">
            <Button
              className="button"
              variant="contained"
              color="primary"
              onClick={this.handleButtonClick}
            >
              { isSignUp ? 'Sign Up' : 'Sign In' }
            </Button>
            { isLoading && <CircularProgress size={24} className="button-spinner" /> }
          </div>
          <Typography className="form-item change-mode-container">
            {`${isSignUp ? 'Already have an account' : 'Don\'t have an account yet'}`}? Click
            <span onClick={this.handleModeChange} className="change-mode-text">here</span>
            to sign {`${isSignUp ? 'in' : 'up'}`}!
          </Typography>
        </div>
      </Dialog>
    );
  }
}

export default SignInModalContainer(SignInModal);