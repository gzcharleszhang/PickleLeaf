import { combineReducers } from 'redux';
import userReducers from 'client/redux/reducers/usersReducers';
import signInModalReducers from 'client/redux/reducers/signInModalReducers';

export default combineReducers({
  users: userReducers,
  signInModal: signInModalReducers,
});