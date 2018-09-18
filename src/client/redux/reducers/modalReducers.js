import ActionTypes from 'client/redux/action-types/modalActionTypes';
import { SignInModalMode } from 'common/constants';

const initialState = {
  isSignInModalVisible: false,
  isPostingModalVisible: false,
  signInModalMode: SignInModalMode.SignIn,
  bookId: '',
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
    case ActionTypes.SHOW_POSTING_MODAL:
      return {
        ...state,
        isPostingModalVisible: true,
        bookId: payload.bookId,
      };
    case ActionTypes.HIDE_POSTING_MODAL:
      return {
        ...state,
        isPostingModalVisible: false,
        bookId: '',
      };
    default:
      return state;
  }
}