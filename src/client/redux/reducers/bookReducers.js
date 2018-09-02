import ActionTypes from 'client/redux/action-types/bookActionTypes';
import { makeIdMap } from 'client/util/Util';

const initialState = {
  booksById: {},
};

export default function (state = initialState, action) {
  const { data } = action;
  switch (action.type) {
    case ActionTypes.BOOK_CREATE_REQ:
      return state;
    case ActionTypes.BOOK_CREATE_OK:
      return ({
        ...state,
        booksById: {
          ...state.booksById,
          [data._id]: data,
        },
      });
    case ActionTypes.BOOK_CREATE_ERR:
      return ({
        ...state,
        error: action.err,
      });
    case ActionTypes.BOOK_FETCH_REQ:
      return state;
    case ActionTypes.BOOK_FETCH_OK:
      return ({
        ...state,
        booksById: makeIdMap(data),
      });
    case ActionTypes.BOOK_FETCH_ERR:
      return ({
        ...state,
        error: action.err,
      });
    default:
      return state;
  }
}