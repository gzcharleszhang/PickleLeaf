import ActionTypes from 'client/redux/action-types/modalActionTypes';
import { SignInModalMode } from 'common/constants';

const initialState = {
  isSignInModalVisible: false,
  isNewPostingModalVisible: false,
  signInModalMode: SignInModalMode.SignIn,
};

export default function (state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case ActionTypes.SHOW_SIGN_IN_MODAL:
      return {
        ...state,
        isSignInModalVisible: true,
      };
    case ActionTypes.HIDE_SIGN_IN_MODAL:
      return {
        ...state,
        isSignInModalVisible: false,
      };
    case ActionTypes.CHANGE_SIGN_IN_MODAL_MODE:
      return {
        ...state,
        signInModalMode: payload.mode,
      };
    default:
      return state;
  }
}