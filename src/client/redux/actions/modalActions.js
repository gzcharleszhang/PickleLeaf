import ActionTypes from 'client/redux/action-types/modalActionTypes';

const SignInModalActions = {
  showModal: () => ({
    type:
      ActionTypes.SHOW_SIGN_IN_MODAL,
    payload: {},
  }),
  hideModal: () => ({
    type: ActionTypes.HIDE_SIGN_IN_MODAL,
    payload: {},
  }),
  changeModalMode: mode => ({
    type: ActionTypes.CHANGE_SIGN_IN_MODAL_MODE,
    payload: { mode },
  }),
  showNewPostingModal: userId => ({
    type: ActionTypes.SHOW_NEW_POSTING_MODAL,
    payload: { userId },
  }),
  hideNewPostingModal: () => ({
    type: ActionTypes.HIDE_NEW_POSTING_MODAL,
    payload: {},
  }),
};

export default SignInModalActions;
