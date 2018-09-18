import { combineReducers } from 'redux';
import userReducers from 'client/redux/reducers/usersReducers';
import modalReducers from 'client/redux/reducers/modalReducers';
import bookReducers from 'client/redux/reducers/bookReducers';
import postingReducers from 'client/redux/reducers/postingReducers';

export default combineReducers({
  users: userReducers,
  books: bookReducers,
  modals: modalReducers,
  postings: postingReducers,
});