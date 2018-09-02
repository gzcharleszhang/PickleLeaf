import ActionTypes from 'client/redux/action-types/bookActionTypes';
import apiRequest from 'client/util/ApiRequest';

const SignInModalActions = {
  create: isbn => ({
    types: [
      ActionTypes.BOOK_CREATE_REQ,
      ActionTypes.BOOK_CREATE_OK,
      ActionTypes.BOOK_CREATE_ERR,
    ],
    payload: { isbn },
    callAPI: () => apiRequest.post(`/books/create/${isbn}`),
  }),
  fetch: () => ({
    types: [
      ActionTypes.BOOK_FETCH_REQ,
      ActionTypes.BOOK_FETCH_OK,
      ActionTypes.BOOK_FETCH_ERR,
    ],
    payload: {},
    callAPI: () => apiRequest.get('/books/fetch'),
  }),
};

export default SignInModalActions;
