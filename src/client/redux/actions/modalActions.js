import ActionTypes from 'client/redux/action-types/modalActionTypes';

const ModalActions = {
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
  showPostingModal: bookId => ({
    type: ActionTypes.SHOW_POSTING_MODAL,
    payload: { bookId },
  }),
  hidePostingModal: () => ({
    type: ActionTypes.HIDE_POSTING_MODAL,
    payload: {},
  }),
};

export default ModalActions;
