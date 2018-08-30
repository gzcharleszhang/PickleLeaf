import ActionTypes from 'client/redux/action-types/userActionTypes';
import apiRequest from 'client/util/ApiRequest';

const UserModalActions = {
  register: user => ({
    types: [
      ActionTypes.REGISTER_REQ,
      ActionTypes.REGISTER_SUCCESS,
      ActionTypes.REGISTER_ERR,
    ],
    payload: user,
    callAPI: () => apiRequest.post('/users/register', user),
  }),
};

export default UserModalActions;
