import ActionTypes from 'client/redux/action-types/bookActionTypes';
import apiRequest from 'client/util/ApiRequest';

const SignInModalActions = {
  create: isbn => ({
    types: [
      ActionTypes.CREATE_REQ,
      ActionTypes.CREATE_SUCCESS,
      ActionTypes.CREATE_ERR,
    ],
    payload: { isbn },
    callAPI: () => apiRequest.post(`/books/create/${isbn}`),
  }),
};

export default SignInModalActions;
