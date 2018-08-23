import React, { Component } from 'react';
import {
  Dialog, FormControl, InputLabel, Input, Typography,
  InputAdornment, IconButton, Button, CircularProgress,
  FormHelperText,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import PropTypes from 'prop-types';
import SignInModalContainer from 'client/containers/SignInModalContainer';
import { SignInModalMode, MessageTypes } from 'common/constants';
import { registerUser } from 'client/util/Auth';
import { showMessage } from 'client/components/Message/Message';
import apiRequest from 'client/util/ApiRequest';
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
      showConfirmPassword: false,
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
    const { signInModalMode, hideSignInModal } = this.props;
    const isSignUp = signInModalMode === SignInModalMode.SignUp;
    let fieldsToCheck = ['email', 'password'];
    if (isSignUp) {
      fieldsToCheck = fieldsToCheck.concat(['firstName', 'lastName', 'confirmEmail', 'confirmPassword']);
    }
    const newState = {};
    let valid = true;
    fieldsToCheck.forEach((key) => {
      // eslint-disable-next-line react/destructuring-assignment
      const errKey = `${key}Err`;
      const field = this.state[key];
      if (!field) {
        newState[errKey] = 'This field is empty';
        valid = false;
      }
      if (this.state[errKey]) {
        valid = false;
      }
    });
    if (!valid) {
      this.setState(newState);
      showMessage(MessageTypes.Error, 'Make sure all the fields are valid');
    } else if (isSignUp) {
      this.setState({ isLoading: true });
      const {
        firstName, lastName, email, password,
      } = this.state;
      const user = {
        firstName,
        lastName,
        email,
        password,
      };
      registerUser(user).then((res) => {
        this.setState({ isLoading: false });
        const { success } = res.data;
        if (success) {
          showMessage(MessageTypes.Success, 'You have successfully signed up');
          hideSignInModal();
          this.resetFields();
        } else {
          showMessage(MessageTypes.Error, 'User already exists');
        }
      }).catch(e => console.log(e.response.data.message));
    }
  }

  handleOnClose = () => {
    const { onClose, hideSignInModal } = this.props;
    onClose();
    hideSignInModal();
    // reset state
    this.resetFields();
  }

  handleFieldChange = (e, field) => {
    const { value } = e.target;
    const newState = {};
    newState[field] = value;
    this.setState(newState);
    this.validateField(field, value);
  }

  handleModeChange = () => {
    const { signInModalMode, changeSignInMode } = this.props;
    if (signInModalMode === SignInModalMode.SignIn) {
      changeSignInMode(SignInModalMode.SignUp);
    } else {
      changeSignInMode(SignInModalMode.SignIn);
    }
  }

  validateField = (field, value) => {
    const errField = `${field}Err`;
    const newState = {};
    const { signInModalMode } = this.props;
    const isSignUp = signInModalMode === SignInModalMode.SignUp;
    if (!value) {
      newState[errField] = 'This field is empty';
      this.setState(newState);
    } else if (field === 'confirmPassword') {
      const { password } = this.state;
      if (password !== value) {
        newState[errField] = 'Password does not match';
        this.setState(newState);
      }
    } else if (field === 'confirmEmail') {
      const { email } = this.state;
      if (email !== value) {
        newState[errField] = 'Email does not match';
        this.setState(newState);
      }
    } else if (field === 'email' && isSignUp) {
      const regex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
      if (!regex.test(value)) {
        newState[errField] = 'Not a valid email address';
        this.setState(newState);
      } else {
        apiRequest.post(`/users/check-duplicate-email/${value}`)
          .then((res) => {
            const { success } = res.data;
            if (!success) {
              newState[errField] = 'Email already exists';
              this.setState(newState);
            }
          });
      }
    }
    if (!newState[errField]) {
      newState[errField] = '';
      this.setState(newState);
    }
  }

  resetFields = () => {
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
      isLoading: false,
      firstNameErr: '',
      lastNameErr: '',
      emailErr: '',
      confirmEmailErr: '',
      passwordErr: '',
      confirmPasswordErr: '',
    });
  }

  render() {
    const { isSignInModalVisible, signInModalMode } = this.props;
    const {
      firstName, lastName, email, password, showPassword,
      isLoading, firstNameErr, lastNameErr, showConfirmPassword,
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
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={e => this.handleFieldChange(e, 'confirmPassword')}
                  endAdornment={(
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle confirm password visibility"
                        onClick={() => this.setState({ showConfirmPassword: !showConfirmPassword })}
                        onMouseDown={e => e.preventDefault()}
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )}
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
              disabled={isLoading}
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