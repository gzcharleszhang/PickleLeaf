import ActionTypes from 'client/redux/action-types/signInModalActionTypes';

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
};

export default SignInModalActions;
