import ActionTypes from 'client/redux/action-types/bookActionTypes';

const initialState = {
  booksById: {},
};

export default function (state = initialState, action) {
  const { data } = action;
  switch (action.type) {
    case ActionTypes.CREATE_REQ:
      return state;
    case ActionTypes.CREATE_SUCCESS:
      return ({
        ...state,
        booksById: {
          ...state.booksById,
          [data._id]: data,
        },
      });
    case ActionTypes.REGISTER_ERROR:
      return ({
        ...state,
        error: action.err,
      });
    default:
      return state;
  }
}