import ActionTypes from 'client/redux/action-types/userActionTypes';

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
    default:
      return state;
  }
}