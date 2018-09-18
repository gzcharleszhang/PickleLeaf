import ActionTypes from 'client/redux/action-types/postingActionTypes';
import { makeIdMap } from 'client/util/Util';

const initialState = {
  postingById: {},
};

export default function (state = initialState, action) {
  const { data } = action;
  switch (action.type) {
    case ActionTypes.POSTING_CREATE_REQ:
      return state;
    case ActionTypes.POSTING_CREATE_OK:
      return ({
        ...state,
        postingsById: {
          ...state.postingsById,
          [data._id]: data,
        },
      });
    case ActionTypes.POSTING_CREATE_ERR:
      return ({
        ...state,
        error: action.err,
      });
    case ActionTypes.POSTING_FETCH_REQ:
      return state;
    case ActionTypes.POSTING_FETCH_OK:
      return ({
        ...state,
        postingsById: makeIdMap(data),
      });
    case ActionTypes.POSTING_FETCH_ERR:
      return ({
        ...state,
        error: action.err,
      });
    default:
      return state;
  }
}