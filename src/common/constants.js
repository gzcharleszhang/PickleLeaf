import { makeConstantsObject } from 'client/util/Util';

export const Types = {
  User: 'user',
};

export const SignInModalMode = {
  SignIn: 'signIn',
  SignUp: 'signUp',
};

export const MessageTypes = {
  Success: '',
  Error: '',
  Warning: '',
  Info: '',
};
makeConstantsObject(MessageTypes);
