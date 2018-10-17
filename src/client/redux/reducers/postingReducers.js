import ActionTypes from 'client/redux/action-types/postingActionTypes';
import { makeIdMap } from 'client/util/Util';

const initialState = {
  postingById: {},
  isLoading: false,
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
          [data.posting._id]: data.posting,
        },
      });
    case ActionTypes.POSTING_CREATE_ERR:
      return ({
        ...state,
        error: action.err,
      });
    case ActionTypes.POSTING_FETCH_REQ:
      return ({
        ...state,
        isLoading: true,
      });
    case ActionTypes.POSTING_FETCH_OK:
      return ({
        ...state,
        postingsById: makeIdMap(data.postings),
        isLoading: false,
      });
    case ActionTypes.POSTING_FETCH_ERR:
      return ({
        ...state,
        error: action.err,
        isLoading: false,
      });
    default:
      return state;
  }
}