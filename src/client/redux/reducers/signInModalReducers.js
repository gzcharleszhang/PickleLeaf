import ActionTypes from 'client/redux/action-types/signInModalActionTypes';
import { SignInModalMode } from 'common/constants';

const initialState = {
  isVisible: false,
  mode: SignInModalMode.SignIn,
};

export default function (state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case ActionTypes.SHOW_SIGN_IN_MODAL:
      return {
        ...state,
        isVisible: true,
      };
    case ActionTypes.HIDE_SIGN_IN_MODAL:
      return {
        ...state,
        isVisible: false,
      };
    case ActionTypes.CHANGE_SIGN_IN_MODAL_MODE:
      return {
        ...state,
        mode: payload.mode,
      };
    default:
      return state;
  }
}