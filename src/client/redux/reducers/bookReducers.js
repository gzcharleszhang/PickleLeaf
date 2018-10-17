import ActionTypes from 'client/redux/action-types/bookActionTypes';
import { makeIdMap } from 'client/util/Util';

const initialState = {
  booksById: {},
  isLoading: false,
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
          [data.book._id]: data.book,
        },
      });
    case ActionTypes.BOOK_CREATE_ERR:
      return ({
        ...state,
        error: action.err,
      });
    case ActionTypes.BOOK_FETCH_REQ:
      return ({
        ...state,
        isLoading: true,
      });
    case ActionTypes.BOOK_FETCH_OK:
      return ({
        ...state,
        booksById: makeIdMap(data.books),
        isLoading: false,
      });
    case ActionTypes.BOOK_FETCH_ERR:
      return ({
        ...state,
        error: action.err,
        isLoading: false,
      });
    default:
      return state;
  }
}