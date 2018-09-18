import ActionTypes from 'client/redux/action-types/userActionTypes';
import { makeIdMap } from 'client/util/Util';

const initialState = {
  usersById: {},
};

export default function (state = initialState, action) {
  const { data } = action;
  switch (action.type) {
    case ActionTypes.REGISTER_REQ:
      return state;
    case ActionTypes.REGISTER_SUCCESS:
      return ({
        ...state,
        usersById: {
          ...state.usersById,
          [data._id]: data,
        },
      });
    case ActionTypes.REGISTER_ERROR:
      return ({
        ...state,
        error: action.err,
      });
    case ActionTypes.USER_FETCH_REQ:
      return state;
    case ActionTypes.USER_FETCH_OK:
      return ({
        ...state,
        usersById: makeIdMap(data),
      });
    case ActionTypes.USER_FETCH_ERR:
      return ({
        ...state,
        error: action.err,
      });
    default:
      return state;
  }
}