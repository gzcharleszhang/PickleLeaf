import { combineReducers } from 'redux';
import userReducers from './users';

export default combineReducers({
  users: userReducers,
});